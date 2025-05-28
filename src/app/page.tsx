import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Info } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm text-blue-600 font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Yapon tili alifbosini o'rganing
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Hiragana & Katakana
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Yapon tilining asosiy yozuv tizimlarini o'rganing va interaktiv testlar orqali bilimingizni mustahkamlang
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                ひ
              </div>
              <CardTitle className="text-xl">Hiragana</CardTitle>
              <CardDescription className="h-12 flex items-center justify-center">
                Yapon tilining asosiy alifbosi - 46 ta asosiy harf va kombinatsiyalar
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/hiragana">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Hiragana o'rganish</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold group-hover:scale-110 transition-transform duration-300">
                カ
              </div>
              <CardTitle className="text-xl">Katakana</CardTitle>
              <CardDescription className="h-12 flex items-center justify-center">
                Chet el so'zlari uchun ishlatiladigan alifbo - 46 ta asosiy harf
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/katakana">
                <Button className="w-full bg-green-600 hover:bg-green-700">Katakana o'rganish</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-pink-100">
            <CardHeader className="text-center pb-4">
              <Brain className="w-16 h-16 mx-auto mb-4 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
              <CardTitle className="text-xl">Test</CardTitle>
              <CardDescription className="h-12 flex items-center justify-center">
                O'rgangan harflaringizni test qiling va bilimingizni mustahkamlang
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/test">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Test boshlash</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <div className="text-center mb-12">
          <Link href="/about">
            <Button variant="outline" size="lg" className="group">
              <Info className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Hiragana va Katakana haqida ma'lumot
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Nima o'rganasiz?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/20">
              <div className="text-3xl mb-3">あ</div>
              <h3 className="font-semibold text-lg mb-2">Asosiy harflar</h3>
              <p className="text-gray-600 text-sm">46 ta asosiy harf va ularning talaffuzi</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/20">
              <div className="text-3xl mb-3">きゃ</div>
              <h3 className="font-semibold text-lg mb-2">Kombinatsiyalar</h3>
              <p className="text-gray-600 text-sm">Murakkab tovushlar va ularning yozilishi</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/20">
              <div className="text-3xl mb-3">が</div>
              <h3 className="font-semibold text-lg mb-2">Dakuten harflar</h3>
              <p className="text-gray-600 text-sm">Ovozli va ovozsiz harflar</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-white/20">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-lg mb-2">Interaktiv test</h3>
              <p className="text-gray-600 text-sm">Bilimingizni sinab ko'ring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
