import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Calendar, Globe, BookOpen, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifa
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Hiragana va Katakana haqida</h1>
          <p className="text-gray-600 text-lg">Yapon yozuv tizimining ajoyib tarixi va xususiyatlari</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Hiragana haqida */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                <span className="text-3xl">ひ</span>
                Hiragana (ひらがな)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Tarix</h3>
                    <p className="text-gray-600 text-sm">
                      9-10 asrlarda yaratilgan, xitoy hierogliflarining soddalashtirilgan shakli
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Kim ishlatgan</h3>
                    <p className="text-gray-600 text-sm">
                      Dastlab ayollar tomonidan ishlatilgan, "ayollar yozuvi" deb atalgan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Zamonaviy foydalanish</h3>
                    <p className="text-gray-600 text-sm">
                      Yapon so'zlari, grammatik qo'shimchalar va bolalar kitoblari uchun
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Qiziqarli faktlar:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• "Hiragana" so'zi "oddiy" yoki "oson" degan ma'noni anglatadi</li>
                    <li>• Eng ko'p ishlatiladigan harf "の" (no)</li>
                    <li>• Dunyodagi eng chiroyli yozuv tizimlaridan biri hisoblanadi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Katakana haqida */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-3">
                <span className="text-3xl">カ</span>
                Katakana (カタカナ)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Tarix</h3>
                    <p className="text-gray-600 text-sm">
                      9-asrda buddist rohiblar tomonidan yaratilgan, xitoy hierogliflarining qismlari
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Asosiy maqsad</h3>
                    <p className="text-gray-600 text-sm">
                      Chet el so'zlari, nom-shariflar va onomatopoetik so'zlar uchun
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Zamonaviy ishlatilishi</h3>
                    <p className="text-gray-600 text-sm">
                      Ingliz tilidan olingan so'zlar, kompyuter atamalar, brendlar
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Qiziqarli faktlar:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• "Katakana" so'zi "qism" yoki "bo'lak" degan ma'noni anglatadi</li>
                    <li>• Telegraf va telegrammalar uchun ishlatilgan</li>
                    <li>• Zamonaviy yapon tilida 20% atrofida ishlatiladi</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Umumiy ma'lumotlar */}
        <Card className="shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Umumiy ma'lumotlar</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">O'xshashliklar</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Har ikkalasi ham 46 ta asosiy harfga ega
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Bir xil tovushlarni ifodalaydi
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Dakuten va handakuten belgilariga ega
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Kombinatsiya harflar mavjud
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Farqlar</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Hiragana - yumaloq, katakana - burchakli
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Hiragana - yapon so'zlari, katakana - chet el so'zlari
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Hiragana - grammatika, katakana - ta'kidlash
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Hiragana - ko'proq, katakana - kamroq ishlatiladi
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Misollar */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-2xl">Amaliy misollar</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-600">Hiragana misollari</h3>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">こんにちは</div>
                    <div className="text-sm text-gray-600">konnichiwa - salom</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">ありがとう</div>
                    <div className="text-sm text-gray-600">arigatou - rahmat</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">さくら</div>
                    <div className="text-sm text-gray-600">sakura - olcha guli</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-600">Katakana misollari</h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">コンピュータ</div>
                    <div className="text-sm text-gray-600">konpyuuta - kompyuter</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">アメリカ</div>
                    <div className="text-sm text-gray-600">amerika - Amerika</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-xl font-bold">コーヒー</div>
                    <div className="text-sm text-gray-600">koohii - qahva</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
