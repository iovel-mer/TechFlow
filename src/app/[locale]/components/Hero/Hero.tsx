'use client';
import type React from 'react';
import { useState, useEffect } from 'react';
import { getHeroMarketData, type MarketData } from '@/app/api/market/actions';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { TrendingUp, Globe, BarChart3, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const Hero: React.FC = () => {
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const t = useTranslations('Hero');

  // Track window width for responsiveness
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initial fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/market');
        const result = await res.json();

        if (result?.success && result?.data) {
          setMarketData((result.data as any).slice(0, 2));
          setError(null);
        } else {
          setError(result?.error || 'Failed to load data');
        }
      } catch (err) {
        console.error('Hero data fetch error:', err);
        setError('Failed to load market data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Update data once on mount via getHeroMarketData
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getHeroMarketData();
        if (result.success) {
          setMarketData(result.data as any);
          setError(null);
        } else {
          setError(result.error || 'Failed to load data');
        }
      } catch (err) {
        setError('Failed to load market data');
        console.error('Hero data fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Poll data every 5 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const result = await getHeroMarketData();
        if (result.success) {
          setMarketData(result.data as any);
        }
      } catch (err) {
        console.warn('Failed to update hero data:', err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const handleImageError = (symbol: string) => {
    setImageErrors(prev => new Set(prev).add(symbol));
  };

  const getCryptoLogo = (symbol: string) => {
    const logoMap: { [key: string]: string } = {
      BTC: '/assets/images/btc.png',
      ETH: '/assets/images/eth.png',
    };

    return (
      logoMap[symbol.toUpperCase()] ||
      `/placeholder.svg?height=36&width=36&query=${symbol}+cryptocurrency+logo`
    );
  };

  const CryptoLogo = ({ coin, size = 36 }: { coin: any; size?: number }) => {
    const hasError = imageErrors.has(coin.symbol);
    const logoSrc = coin.logo || getCryptoLogo(coin.symbol);

    if (hasError || !logoSrc) {
      return (
        <div
          className="flex items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-white font-bold text-xs select-none"
          style={{ width: size, height: size }}
        >
          {coin.symbol?.slice(0, 2) || '??'}
        </div>
      );
    }

    return (
      <Image
        src={logoSrc || '/placeholder.svg'}
        width={size}
        height={size}
        alt={`${coin.name || coin.symbol} logo`}
        className="rounded-full"
        onError={() => handleImageError(coin.symbol)}
        unoptimized
      />
    );
  };

  const mockCryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 67420.5, change: 2.34 },
    { symbol: 'ETH', name: 'Ethereum', price: 3245.8, change: -1.23 },
    { symbol: 'BNB', name: 'BNB', price: 635.2, change: 0.87 },
    { symbol: 'SOL', name: 'Solana', price: 178.45, change: 4.56 },
    { symbol: 'ADA', name: 'Cardano', price: 1.23, change: -2.1 },
    { symbol: 'AVAX', name: 'Avalanche', price: 42.18, change: 1.89 },
    { symbol: 'DOT', name: 'Polkadot', price: 8.45, change: -0.67 },
    { symbol: 'MATIC', name: 'Polygon', price: 0.89, change: 3.21 },
  ];

  // Determine how many items to show on small screen
  const maxItemsToShow = windowWidth < 640 ? 6 : 8;
  const logoSize = windowWidth < 640 ? 32 : 36;

  return (
    <section className="bg-black text-white relative overflow-hidden py-40 px-6 sm:px-12 md:px-20 lg:px-32 xl:px-40">
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Side */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 bg-gray-900/50 border border-cyan-500/30 rounded-lg backdrop-blur-sm">
              <div className="flex space-x-1">
                <div className="w-1 h-3 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-3 sm:h-4 bg-cyan-400 rounded-full animate-pulse animation-delay-200"></div>
                <div className="w-1 h-3 sm:h-4 bg-blue-400 rounded-full animate-pulse animation-delay-400"></div>
              </div>
              <span className="text-cyan-300 text-xs sm:text-sm font-mono uppercase tracking-wider">
                {t('status')}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight sm:leading-none tracking-tight">
                <span className="text-white block">{t('nextGen')}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-400 to-blue-400 block">
                  {t('trading')}
                </span>
                <span className="text-gray-300 block">{t('platform')}</span>
              </h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-gray-400">
                <span>{'> '}0.1ms {t('latency')}</span>
                <span>{'> '}99.9% {t('uptime')}</span>
                <span>{'> '}1M+ TPS</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl font-light">
              {t('description')}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-800">
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl font-black text-cyan-400 font-mono">
                  $847B
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {t('dailyVolume')}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl font-black text-green-400 font-mono">
                  2.1M
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {t('activeUsers')}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-lg sm:text-xl lg:text-2xl font-black text-blue-400 font-mono">
                  99.9%
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mt-1">
                  {t('successRate')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Crypto Market Data */}
          <div className="lg:col-span-5 space-y-6 mt-10 lg:mt-0">
            {/* Live Market Card */}
            <div className="bg-gray-900/30 border border-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {t('liveMarket')}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-400 font-mono">{t('live')}</span>
                </div>
              </div>

              {loading ? (
                <div className="space-y-3 sm:space-y-4">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-3 animate-pulse"
                    >
                      <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-700 rounded w-20 mb-1"></div>
                        <div className="h-3 bg-gray-700 rounded w-16"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-gray-700 rounded w-16 mb-1"></div>
                        <div className="h-3 bg-gray-700 rounded w-12"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-red-400 text-sm">{error}</div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3 max-h-[380px] overflow-y-auto">
                  {(marketData.length > 0 ? marketData : mockCryptoData)
                    .slice(0, maxItemsToShow)
                    .map((coin: any, index) => (
                      <div
                        key={coin.symbol || coin.id || index}
                        className="flex items-center justify-between p-2 sm:p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer"
                      >
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <CryptoLogo coin={coin} size={logoSize} />
                          <div>
                            <div className="font-semibold text-white text-sm">
                              {coin.symbol || 'N/A'}
                            </div>
                            <div className="text-xs text-gray-400 hidden sm:block">
                              {coin.name || 'Unknown'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-white text-xs sm:text-sm">
                            {coin.price ? formatPrice(coin.price) : 'N/A'}
                          </div>
                          <div
                            className={`text-xs font-mono ${
                              (coin.change || 0) >= 0
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {coin.change ? formatChange(coin.change) : '0.00%'}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>

            {/* Market Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {t('volume24h')}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono">
                  $2.4T
                </div>
              </div>
              <div className="bg-gray-900/30 border border-gray-800 rounded-lg sm:rounded-xl p-3 sm:p-4 backdrop-blur-sm">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-4 h-4 text-blue-400" />
                  <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {t('marketCap')}
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-mono">
                  $3.2T
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
