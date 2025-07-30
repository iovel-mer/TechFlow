"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { getMarketData, type MarketData } from "@/app/api/market/actions"
import { TrendingUp, TrendingDown, Activity, RefreshCw } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image" // Import Image component

export const Market: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set()) // State to track image errors
  const t = useTranslations("Market")

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true)
      // Using the server action directly for initial fetch and polling
      const result = await getMarketData()
      if (result.success) {
        setMarketData(result.data as any)
        setError(null)
      } else {
        setError(result.error || t("errorGeneric"))
      }
    } catch (err) {
      setError(t("errorFetch"))
      console.error("Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }

  // Fetch initial data
  useEffect(() => {
    fetchData()
  }, [t])

  // Update data every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData() // Call the fetchData function for polling
    }, 15000)
    return () => clearInterval(interval)
  }, [])

  const formatPrice = (price: number) => {
    const fractionDigits = price >= 1000 ? 2 : price >= 1 ? 4 : 6
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(price)
  }

  const formatChange = (change: number) => {
    const sign = change >= 0 ? "+" : ""
    return `${sign}${change.toFixed(2)}%`
  }

  const handleImageError = (symbol: string) => {
    setImageErrors((prev) => new Set(prev).add(symbol))
  }

  // CryptoLogo component for consistent image rendering and fallbacks
  const CryptoLogo = ({ coin, size = 48 }: { coin: MarketData; size?: number }) => {
    const hasError = imageErrors.has(coin.symbol)
    const logoSrc = `/assets/images/${coin.symbol.toLowerCase()}.png`


    if (hasError || !logoSrc) {
      // Fallback to a colored circle with symbol
      return (
        <div
          className={`flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-base`}
          style={{ width: size, height: size }}
        >
          {coin.symbol?.slice(0, 2) || "??"}
        </div>
      )
    }

    return (
      <Image
        src={logoSrc || "/placeholder.svg"}
        width={size}
        height={size}
        alt={`${coin.name || coin.symbol} logo`}
        className="rounded-full object-contain"
        onError={() => handleImageError(coin.symbol)}
        unoptimized // Use unoptimized if fetching from external URLs
      />
    )
  }

  return (
    <section className="py-16 md:py-24 bg-black text-white min-h-screen relative overflow-hidden">
      {/* Subtle background pattern for depth */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="text-center mb-12 md:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-cyan-300 bg-gray-900/50 border border-cyan-500/30 mb-4 backdrop-blur-sm shadow-lg">
            <Activity className="w-3 h-3 text-cyan-400" />
            {t("badge")}
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4">{t("title")}</h3>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">{t("description")}</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-500 rounded-full animate-spin border-t-transparent"></div>
              <RefreshCw className="w-6 h-6 text-cyan-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
            </div>
            <p className="mt-6 text-gray-400 text-lg font-medium">{t("loading")}</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-gray-900/50 border border-red-500 rounded-xl p-8 max-w-md mx-auto shadow-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <p className="text-red-400 text-lg font-semibold">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {marketData.map((coin) => (
              <div
                key={coin.symbol}
                className="group bg-gray-900/50 p-6 rounded-xl shadow-lg border border-gray-800 transition-all duration-300 hover:shadow-2xl hover:border-cyan-600 transform hover:-translate-y-1 animate-fade-in-up"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center space-x-4">
                    <CryptoLogo coin={coin} size={48} /> {/* Use CryptoLogo component */}
                    <div>
                      <h4 className="font-semibold text-xl text-white">{coin.name}</h4>
                      <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">{coin.symbol}</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      coin.change >= 0 ? "bg-emerald-900/50 text-emerald-400" : "bg-red-900/50 text-red-400"
                    }`}
                  >
                    {coin.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {formatChange(coin.change)}
                  </div>
                </div>
                <div className="mb-5">
                  <p className="text-3xl font-bold text-white mb-1">{formatPrice(coin.price)}</p>
                  <p className="text-gray-400 text-sm">{t("currentPrice")}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400 font-medium">volume</span>
                    {/* <span className="font-bold text-white">{coin.volume}</span> */}
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        coin.change >= 0
                          ? "bg-gradient-to-r from-emerald-400 to-emerald-500"
                          : "bg-gradient-to-r from-red-400 to-red-500"
                      }`}
                      style={{
                        width: `${Math.min(100, Math.abs(coin.change) * 2)}%`, // Adjusted progress bar scale
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
