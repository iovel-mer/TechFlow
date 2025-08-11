"use client"
import type React from "react"
import { useTranslations } from "next-intl"
import { TrendingUp, Shield, Zap, Users, Globe, ArrowRight, DollarSign } from "lucide-react"
import Link from "next/link"

export const Trading: React.FC = () => {
  const t = useTranslations("Trading")
  return (
    <section className="py-20 md:py-24 lg:py-32 bg-black text-white relative overflow-hidden">
      {/* Subtle background pattern for depth */}
      <div
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 md:mb-20 lg:mb-24 animate-fade-in-up">
          <div className="inline-flex items-center bg-gray-900/50 border border-cyan-500/30 rounded-full px-6 py-2 mb-6 backdrop-blur-sm shadow-lg">
            <Shield className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-sm font-semibold text-cyan-300 uppercase tracking-wider">{t("badge")}</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-tight">
            {t("title")}
            <br />
            <span className="text-white bg-clip-text bg-gradient-to-r from-feature-orange-500 via-feature-red-500 to-feature-pink-500">
              {t("highlight")}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
          <Feature
            icon={<TrendingUp className="w-8 h-8 text-white" />}
            title={t("features.analytics.title")}
            description={t("features.analytics.desc")}
            borderColorClass="border-feature-orange-300"
            gradientClass="from-feature-orange-400 to-feature-red-500"
            hoverTextColorClass="text-feature-orange-600"
          />
          <Feature
            icon={<Shield className="w-8 h-8 text-white" />}
            title={t("features.security.title")}
            description={t("features.security.desc")}
            borderColorClass="border-feature-blue-300"
            gradientClass="from-feature-blue-400 to-feature-indigo-500"
            hoverTextColorClass="text-feature-blue-600"
          />
          <Feature
            icon={<Zap className="w-8 h-8 text-white" />}
            title={t("features.fast.title")}
            description={t("features.fast.desc")}
            borderColorClass="border-feature-green-300"
            gradientClass="from-feature-green-400 to-feature-emerald-500"
            hoverTextColorClass="text-feature-green-600"
          />
          <Feature
            icon={<DollarSign className="w-8 h-8 text-white" />}
            title={t("features.fees.title")}
            description={t("features.fees.desc")}
            borderColorClass="border-feature-yellow-300"
            gradientClass="from-feature-yellow-400 to-feature-orange-500"
            hoverTextColorClass="text-feature-orange-600"
          />
          <Feature
            icon={<Users className="w-8 h-8 text-white" />}
            title={t("features.support.title")}
            description={t("features.support.desc")}
            borderColorClass="border-feature-purple-300"
            gradientClass="from-feature-purple-400 to-feature-pink-500"
            hoverTextColorClass="text-feature-purple-600"
          />
          <Feature
            icon={<Globe className="w-8 h-8 text-white" />}
            title={t("features.global.title")}
            description={t("features.global.desc")}
            borderColorClass="border-feature-indigo-300"
            gradientClass="from-feature-indigo-400 to-feature-blue-500"
            hoverTextColorClass="text-feature-indigo-600"
          />
        </div>

        {/* CTA */}
        <div className="text-center animate-scale-in delay-300">
          <Link href="/login" passHref>
            <button className="group relative px-10 py-4 md:px-12 md:py-5 bg-white text-black font-extrabold text-lg rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl uppercase tracking-wider overflow-hidden">
              <span className="relative z-10 flex items-center justify-center">
                {t("cta")}
                <ArrowRight className="inline ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

type FeatureProps = {
  icon: React.ReactNode
  title: string
  description: string
  borderColorClass: string // Use predefined Tailwind classes
  gradientClass: string // Use predefined Tailwind classes
  hoverTextColorClass: string // Use predefined Tailwind classes
}

const Feature: React.FC<FeatureProps> = ({
  icon,
  title,
  description,
  borderColorClass,
  gradientClass,
  hoverTextColorClass,
}) => (
  <div
    className={`group relative rounded-2xl bg-gray-900/50 border-2 border-gray-800 hover:${borderColorClass} transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1 animate-fade-in-up`}
  >
    <div
      className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${gradientClass} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
    ></div>
    <div className="p-6 md:p-8">
      <div
        className={`w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br ${gradientClass} flex items-center justify-center rounded-xl mb-5 transform group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className={`text-xl md:text-2xl font-black mb-3 ${hoverTextColorClass} transition-colors`}>{title}</h3>
      <p className="text-gray-300 leading-relaxed font-normal text-base md:text-lg">{description}</p>
    </div>
  </div>
)
