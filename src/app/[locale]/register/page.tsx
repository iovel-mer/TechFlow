"use client"

import { parseISO, format } from "date-fns"
import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Check, ChevronDown, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { postRegistration } from "@/app/api/auth/postRegistration"
import { getCountries } from "@/app/api/countries/getCountries"
import { getLanguages } from "@/app/api/languages/getLanguages"
import type { Country } from "@/app/api/types/countries"
import type { Language } from "@/app/api/types/languages"
import { useLocale, useTranslations } from "next-intl"

export default function RegisterPage() {
  const router = useRouter()
  const t = useTranslations('register');
  const locale  = useLocale();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    telephone: "",
    country: "",
    language: "",
    dateOfBirth: "", // Stored as 'YYYY-MM-DD' string
    source: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [languages, setLanguages] = useState<Language[]>([])
  const [countrySearch, setCountrySearch] = useState("")
  const [languageSearch, setLanguageSearch] = useState("")
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false) // State for date picker popover

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFormData((prev) => ({
        ...prev,
        source: window.location.origin,
      }))
    }
    const fetchData = async () => {
      try {
        const [countriesResponse, languagesData] = await Promise.all([getCountries(), getLanguages()])
        if (countriesResponse.success && countriesResponse.data) {
          const allCountries = countriesResponse.data
          setCountries(allCountries)
          // 🟢 Detect country from IP and set default
          try {
            const res = await fetch("https://ipapi.co/json/")
            const locationData = await res.json()
            const detectedCountryCode = locationData?.country_code
            if (detectedCountryCode) {
              const matched = allCountries.find((c) => c.code === detectedCountryCode)
              if (matched) {
                setFormData((prev) => ({
                  ...prev,
                  country: matched.code,
                }))
              }
            }
          } catch (geoError) {
            console.warn("Could not detect location via IP:", geoError)
          }
        }
        setLanguages(languagesData)
      } catch (error) {
        console.error("Error fetching countries or languages:", error)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? "" : value,
    }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: date ? format(date, "yyyy-MM-dd") : "", 
    }))
    setShowDatePicker(false) 
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

 if (formData.dateOfBirth) {
    const birthDate = parseISO(formData.dateOfBirth)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age-- // not had birthday yet this year
    }

    if (age < 18) {
      setError("You must be at least 18 years old to register.")
      setIsLoading(false)
      return
    }
  } else {
    setError("Please select your date of birth.")
    setIsLoading(false)
    return
  }



    
    const response = await postRegistration(formData)
    if (response?.errors) {
      setError(response.message ?? "An unknown error occurred")
      setIsLoading(false)
      return
    }
    router.push("/login?registered=true")
    setIsLoading(false)
  }
const isFormValid = () => {
  return (
    formData.firstName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.country.trim() !== ""
  )
}
  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase()),
  )
  const filteredLanguages = languages.filter(
    (language) =>
      language.name.toLowerCase().includes(languageSearch.toLowerCase()) ||
      language.code.toLowerCase().includes(languageSearch.toLowerCase()),
  )

  const handleCountrySelect = (countryCode: string) => {
    setFormData((prev) => ({ ...prev, country: countryCode }))
    setCountrySearch("")
    setShowCountryDropdown(false)
  }

  const handleLanguageSelect = (languageCode: string) => {
    setFormData((prev) => ({ ...prev, language: languageCode }))
    setLanguageSearch("")
    setShowLanguageDropdown(false)
  }

  const selectedCountry = countries.find((c) => c.code === formData.country)
  const selectedLanguage = languages.find((l) => l.code === formData.language)

  // Parse dateOfBirth string to Date object for Calendar component
  const dateOfBirthDate = formData.dateOfBirth ? parseISO(formData.dateOfBirth) : undefined

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-zinc-900 to-gray-950 flex flex-col lg:flex-row">
      {/* Left-side Registration Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 overflow-y-auto">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800 text-gray-200 shadow-lg">
          <CardHeader className="pb-4">
            <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> {t("back")}
            </Link>
            <CardTitle className="text-3xl font-bold text-white text-center">  {t("createAccount")}</CardTitle>
            <p className="text-gray-400 text-center">{t("subtitle")}</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="p-3 mb-4 bg-red-900/50 border border-red-500/50 rounded-lg">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                     {t("firstName")}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder={t("pfirstName")}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    {t("lastName")}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder={t("plastName")}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    required
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  {t("email")}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder= {t("pemail")}
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">
                  {t("username")}
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder= {t("pusername")}
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">
                 {t("password")}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder={t("ppassword")}
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber" className="text-gray-300">
                   {t("phoneNumber")}
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  placeholder= {t("pphoneNumber")}
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-purple-500"
                />
              </div>
              {/* Country Selector */}
              <div className="space-y-2">
                <Label htmlFor="country" className="text-gray-300">
                    {t("country")}
                </Label>
                <Popover open={showCountryDropdown} onOpenChange={setShowCountryDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={showCountryDropdown}
                      className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white focus:ring-purple-500"
                      disabled={isLoading}
                    >
                      {selectedCountry ? selectedCountry.name : "Select your country"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-gray-800 border-gray-700 text-white">
                    <Command className="bg-gray-700 text-white">
                      <CommandInput
                        placeholder={t("searchCountries")}
                        value={countrySearch}
                        onValueChange={setCountrySearch}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-purple-500"
                      />
                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>{t("selectCountry")}</CommandEmpty>
                        <CommandGroup>
                          {filteredCountries.map((country) => (
                            <CommandItem
                              key={country.code}
                              value={country.name}
                              onSelect={() => handleCountrySelect(country.code)}
                              className="cursor-pointer hover:bg-gray-700 bg-gray-700 text-white data-[selected=true]:bg-purple-600 data-[selected=true]:text-white"
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  formData.country === country.code ? "opacity-100" : "opacity-0",
                                )}
                              />
                              {country.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* Language Selector */}
              <div className="space-y-2">
                <Label htmlFor="language" className="text-gray-300">
                 {t("language")}
                </Label>
                <Popover open={showLanguageDropdown} onOpenChange={setShowLanguageDropdown}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={showLanguageDropdown}
                      className="w-full justify-between bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white focus:ring-purple-500"
                      disabled={isLoading}
                    >
                      <span className={selectedLanguage ? "text-white" : "text-gray-500"}>
                        {selectedLanguage ? selectedLanguage.name : t("selectLanguage")}
                      </span>
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] p-0 bg-gray-800 border-gray-700 text-white">
                    <Command className="bg-gray-800 text-white">
                      <CommandInput
                        placeholder="Search languages..."
                        value={languageSearch}
                        onValueChange={setLanguageSearch}
                        className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-500 focus:ring-purple-500"
                      />
                      <CommandList className="max-h-60 overflow-y-auto">
                        <CommandEmpty>No language found.</CommandEmpty>
                        <CommandGroup>
                          {filteredLanguages
                            .sort((a, b) => {
                              const priorityOrder = ["en", "de"] // English, then German
                              const indexA = priorityOrder.indexOf(a.code)
                              const indexB = priorityOrder.indexOf(b.code)
                              if (indexA !== -1 || indexB !== -1) {
                                return (
                                  (indexA === -1 ? Number.POSITIVE_INFINITY : indexA) -
                                  (indexB === -1 ? Number.POSITIVE_INFINITY : indexB)
                                )
                              }
                              return a.name.localeCompare(b.name)
                            })
                            .map((language) => (
                              <CommandItem
                                key={language.code}
                                value={language.name}
                                onSelect={() => handleLanguageSelect(language.code)}
                                className="cursor-pointer text-white hover:bg-gray-700 data-[selected=true]:bg-purple-600 data-[selected=true]:text-white"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    formData.language === language.code ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {language.name}
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-300">
                 {t("dateOfBirth")}
                </Label>
                <Popover open={showDatePicker} onOpenChange={setShowDatePicker}>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal bg-gray-800 border-gray-700 text-white hover:bg-gray-700 hover:text-white focus:ring-purple-500",
                        !formData.dateOfBirth && "text-gray-500",
                      )}
                      disabled={isLoading}
                    >
                      <CalendarDays className="mr-2 size-4" />
                      {formData.dateOfBirth ? format(dateOfBirthDate!, "PPP") : <span>{t("pickDate")}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700 text-white">
                    <Calendar
                      mode="single"
                      selected={dateOfBirthDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      captionLayout="dropdown"
                      fromYear={1900}
                      toYear={new Date().getFullYear()}
                       className="[&_td]:text-gray-200 [&_th]:text-gray-400 [&_button]:text-gray-200 [&_button]:hover:bg-gray-700 [&_button]:focus:bg-gray-700 [&_div.rdp-day_selected]:bg-purple-600 [&_div.rdp-day_selected]:text-white [&_div.rdp-day_today]:text-purple-400 [&_select]:bg-gray-800 [&_select]:text-white [&_select]:border-gray-600 [&_select]:rounded-md [&_select]:focus:ring-purple-500"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-green-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t("loading")}
                  </div>
                ) : (
                  t("submit")
                )}
              </Button>
            </form>
            <p className="text-center text-gray-400 mt-4">
              {t("alreadyHaveAccount")}{" "}
              <Link href="/login" className="text-green-700 hover:text-purple-300 font-medium">
                {t("signIn")}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
      {/* Right-side Benefits Panel */}
      <div className="flex-1 bg-gradient-to-br from-zinc-900 to-gray-950 p-8 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {/* Subtle background pattern/texture */}
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] bg-repeat opacity-5"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        </div>
        <div className="max-w-lg space-y-8 z-10 text-center lg:text-left">
          <h2 className="text-4xl font-extrabold text-white mb-8 leading-tight">{t("benefitsTitle")}</h2>
          <div className="max-w-lg space-y-8 z-10 text-center lg:text-left">
  <h2 className="text-4xl font-extrabold text-white mb-8 leading-tight">{t("benefitsTitle")}</h2>
  <div className="space-y-6">
    {t.raw("benefits").map((benefit: string, idx: number) => (
      <div key={idx} className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-6 h-6 bg-green-700 rounded-full flex items-center justify-center mt-0.5 shadow-md">
          <Check className="w-4 h-4 text-white" />
        </div>
        <p className="text-gray-300 leading-relaxed text-lg">{benefit}</p>
      </div>
    ))}
  </div>
</div>

          <div className="grid grid-cols-1 items-center sm:grid-cols-3 gap-6 pt-8 border-t border-gray-700 mt-8">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t("volume")}</p>
              <p className="text-3xl font-bold text-green-700">$2.8B+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t("traders")}</p>
              <p className="text-3xl font-bold text-green-700">500K+</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-1">{t("countries")}</p>
              <p className="text-3xl font-bold text-green-700">180+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
