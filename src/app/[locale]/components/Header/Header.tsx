"use client";

import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { LogIn, UserPlus, Zap, Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLocale, useTranslations } from "next-intl";

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations("Header");
  
  const locale = useLocale();

  return (
    <header className="bg-black sticky top-0 z-50 border-b border-gray-400 ">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
            <Link href={'/'}>
          <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-105">
                <Zap size={24} className="text-white" />
              </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                TechFlow
              </h1>
              <p className="text-xs text-slate-400 font-medium">
                {t("subtitle")}
              </p>
            </div>
          </div>
            </Link>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/login">
              <button className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500 transition-all duration-200 shadow-lg hover:shadow-xl border border-slate-600 hover:border-slate-500">
                <LogIn size={16} />
                {t("signIn")}
              </button>
            </Link>
            <Link href="/register">
              <button className="flex cursor-pointer items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25">
                <UserPlus size={16} />
                {t("getStarted")}
              </button>
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="text-white focus:outline-none"
              aria-label={isMenuOpen ? t("closeMenu") : t("openMenu")}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Only Auth Buttons */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 space-y-4 pb-4 border-t border-emerald-700 pt-4">
            <div className="flex flex-col space-y-3">
              <Link href={'/login'}>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-slate-700 to-slate-600 text-white hover:from-slate-600 hover:to-slate-500 transition-all duration-200 shadow-lg border border-slate-600">
                  <LogIn size={16} />
                  {t("mobileSignIn")}
                </button>
              </Link>
              <Link href={'/register'}>
                <button className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 transition-all duration-200 shadow-lg">
                  <UserPlus size={16} />
                 {t("mobileGetStarted")}
                </button>
              </Link>
              <div className="flex justify-center pt-2">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
