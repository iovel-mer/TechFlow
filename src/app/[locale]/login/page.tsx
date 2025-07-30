"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import type { LoginCredentials } from "@/app/api/types/auth"
import { postLogin } from "@/app/api/auth/postLogin"
import { useCredentials } from "@/hooks/use-credentials"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useLocale, useTranslations } from "next-intl"

export default function LoginPage() {
  const { storeCredentials } = useCredentials()
  const router = useRouter()
  const locale = useLocale()
   const t = useTranslations('login')
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    twoFactorCode: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showTwoFactor, setShowTwoFactor] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")

  try {
    const credentials: LoginCredentials = {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password,
      ...(showTwoFactor && { twoFactorCode: formData.twoFactorCode }),
      ...(formData.rememberMe && { rememberMe: formData.rememberMe }),
    }

    const response = await postLogin(credentials)
    console.log(response);

    if (!response || !response.success) {
      
  setError(response?.message || t('form.loginFailed') || "Login failed")
  setIsLoading(false)
  return
}

    // Store credentials for Web Trader access
    storeCredentials(credentials)
    window.location.href = `/${locale}/dashboard`
  } catch (err) {
    setError("An unexpected error occurred. Please try again.")
    setIsLoading(false)
    console.error("Login error:", err)
  }
}


  return (
     <div className="min-h-screen bg-gray-950 text-gray-50 flex items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col lg:flex-row w-full max-w-6xl rounded-xl overflow-hidden shadow-2xl bg-gray-900">
        <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
          <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-gray-200 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('back')}
          </Link>

          <Card className="w-full bg-gray-800 border-gray-700 text-gray-50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl font-bold">{t('title')}</CardTitle>
              <CardDescription className="text-gray-400">{t('subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="p-3 mb-4 bg-red-900/30 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="emailOrUsername" className="text-gray-300">
                    {t('form.emailOrUsername')}
                  </Label>
                  <Input
                    id="emailOrUsername"
                    name="emailOrUsername"
                    type="text"
                    placeholder={t('form.emailOrUsernamePlaceholder')}
                    value={formData.emailOrUsername}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500/20 disabled:bg-gray-700 disabled:opacity-70"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    {t('form.password')}
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder={t('form.passwordPlaceholder')}
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500/20 disabled:bg-gray-700 disabled:opacity-70"
                    required
                  />
                </div>

                {showTwoFactor && (
                  <div className="space-y-2">
                    <Label htmlFor="twoFactorCode" className="text-gray-300">
                      {t('form.twoFactor')}
                    </Label>
                    <Input
                      id="twoFactorCode"
                      name="twoFactorCode"
                      type="text"
                      placeholder={t('form.twoFactorPlaceholder')}
                      value={formData.twoFactorCode}
                      onChange={handleInputChange}
                      disabled={isLoading}
                      className="bg-gray-700 border-gray-600 text-gray-50 placeholder:text-gray-400 focus:border-green-500 focus:ring-green-500/20 disabled:bg-gray-700 disabled:opacity-70"
                    />
                  </div>
                )}

               

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 shadow-lg hover:shadow-green-500/25 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      {t('form.loading')}
                    </div>
                  ) : (
                    t('form.submit')
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center flex flex-col">
              <p className="text-gray-400">
                {t('noAccount')}{' '}
                <Link href="/register" className="text-green-500 hover:text-green-400 font-medium">
                  {t('form.signUp')}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1 p-8 lg:p-12 bg-gray-800/50 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-white mb-8">{t('benefits.title')}</h2>
          <div className="space-y-6">
            {[0, 1, 2, 3].map((index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <p className="text-gray-300 leading-relaxed">{t(`benefits.list.${index}`)}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-gray-700">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t('benefits.volume')}</p>
              <p className="text-2xl font-bold text-green-400">$2.8B+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t('benefits.traders')}</p>
              <p className="text-2xl font-bold text-green-400">500K+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t('benefits.countries')}</p>
              <p className="text-2xl font-bold text-green-400">180+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
