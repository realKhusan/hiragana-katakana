"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"



const katakanaBasic = [
  { char: "ア", romaji: "a" },
  { char: "イ", romaji: "i" },
  { char: "ウ", romaji: "u" },
  { char: "エ", romaji: "e" },
  { char: "オ", romaji: "o" },
  { char: "カ", romaji: "ka" },
  { char: "キ", romaji: "ki" },
  { char: "ク", romaji: "ku" },
  { char: "ケ", romaji: "ke" },
  { char: "コ", romaji: "ko" },
  { char: "サ", romaji: "sa" },
  { char: "シ", romaji: "shi" },
  { char: "ス", romaji: "su" },
  { char: "セ", romaji: "se" },
  { char: "ソ", romaji: "so" },
  { char: "タ", romaji: "ta" },
  { char: "チ", romaji: "chi" },
  { char: "ツ", romaji: "tsu" },
  { char: "テ", romaji: "te" },
  { char: "ト", romaji: "to" },
  { char: "ナ", romaji: "na" },
  { char: "ニ", romaji: "ni" },
  { char: "ヌ", romaji: "nu" },
  { char: "ネ", romaji: "ne" },
  { char: "ノ", romaji: "no" },
  { char: "ハ", romaji: "ha" },
  { char: "ヒ", romaji: "hi" },
  { char: "フ", romaji: "fu" },
  { char: "ヘ", romaji: "he" },
  { char: "ホ", romaji: "ho" },
  { char: "マ", romaji: "ma" },
  { char: "ミ", romaji: "mi" },
  { char: "ム", romaji: "mu" },
  { char: "メ", romaji: "me" },
  { char: "モ", romaji: "mo" },
  { char: "ヤ", romaji: "ya" },
  { char: "", romaji: "" },
  { char: "ユ", romaji: "yu" },
  { char: "", romaji: "" },
  { char: "ヨ", romaji: "yo" },
  { char: "ラ", romaji: "ra" },
  { char: "リ", romaji: "ri" },
  { char: "ル", romaji: "ru" },
  { char: "レ", romaji: "re" },
  { char: "ロ", romaji: "ro" },
  { char: "ワ", romaji: "wa" },
  { char: "", romaji: "" },
  { char: "", romaji: "" },
  { char: "", romaji: "" },
  { char: "ヲ", romaji: "wo" },
  { char: "ン", romaji: "n" },
]

const katakanaDakuten = [
  { char: "ガ", romaji: "ga" },
  { char: "ギ", romaji: "gi" },
  { char: "グ", romaji: "gu" },
  { char: "ゲ", romaji: "ge" },
  { char: "ゴ", romaji: "go" },
  { char: "ザ", romaji: "za" },
  { char: "ジ", romaji: "ji" },
  { char: "ズ", romaji: "zu" },
  { char: "ゼ", romaji: "ze" },
  { char: "ゾ", romaji: "zo" },
  { char: "ダ", romaji: "da" },
  { char: "ヂ", romaji: "ji" },
  { char: "ヅ", romaji: "zu" },
  { char: "デ", romaji: "de" },
  { char: "ド", romaji: "do" },
  { char: "バ", romaji: "ba" },
  { char: "ビ", romaji: "bi" },
  { char: "ブ", romaji: "bu" },
  { char: "ベ", romaji: "be" },
  { char: "ボ", romaji: "bo" },
  { char: "パ", romaji: "pa" },
  { char: "ピ", romaji: "pi" },
  { char: "プ", romaji: "pu" },
  { char: "ペ", romaji: "pe" },
  { char: "ポ", romaji: "po" },
]

const katakanaCombinations = [
  { char: "キャ", romaji: "kya" },
  { char: "キュ", romaji: "kyu" },
  { char: "キョ", romaji: "kyo" },
  { char: "シャ", romaji: "sha" },
  { char: "シュ", romaji: "shu" },
  { char: "ショ", romaji: "sho" },
  { char: "チャ", romaji: "cha" },
  { char: "チュ", romaji: "chu" },
  { char: "チョ", romaji: "cho" },
  { char: "ニャ", romaji: "nya" },
  { char: "ニュ", romaji: "nyu" },
  { char: "ニョ", romaji: "nyo" },
  { char: "ヒャ", romaji: "hya" },
  { char: "ヒュ", romaji: "hyu" },
  { char: "ヒョ", romaji: "hyo" },
  { char: "ミャ", romaji: "mya" },
  { char: "ミュ", romaji: "myu" },
  { char: "ミョ", romaji: "myo" },
  { char: "リャ", romaji: "rya" },
  { char: "リュ", romaji: "ryu" },
  { char: "リョ", romaji: "ryo" },
  { char: "ギャ", romaji: "gya" },
  { char: "ギュ", romaji: "gyu" },
  { char: "ギョ", romaji: "gyo" },
  { char: "ジャ", romaji: "ja" },
  { char: "ジュ", romaji: "ju" },
  { char: "ジョ", romaji: "jo" },
  { char: "ビャ", romaji: "bya" },
  { char: "ビュ", romaji: "byu" },
  { char: "ビョ", romaji: "byo" },
  { char: "ピャ", romaji: "pya" },
  { char: "ピュ", romaji: "pyu" },
  { char: "ピョ", romaji: "pyo" },
]

export default function KatakanaPage() {
  const [selectedChar, setSelectedChar] = useState<{ char: string; romaji: string } | null>(null)

  const playAudio = (romaji: string) => {
    // Yapon harflarining to'g'ri talaffuzi uchun maxsus mapping
    const japaneseMapping: { [key: string]: string } = {
      a: "ア",
      i: "イ",
      u: "ウ",
      e: "エ",
      o: "オ",
      ka: "カ",
      ki: "キ",
      ku: "ク",
      ke: "ケ",
      ko: "コ",
      sa: "サ",
      shi: "シ",
      su: "ス",
      se: "セ",
      so: "ソ",
      ta: "タ",
      chi: "チ",
      tsu: "ツ",
      te: "テ",
      to: "ト",
      na: "ナ",
      ni: "ニ",
      nu: "ヌ",
      ne: "ネ",
      no: "ノ",
      ha: "ハ",
      hi: "ヒ",
      fu: "フ",
      he: "ヘ",
      ho: "ホ",
      ma: "マ",
      mi: "ミ",
      mu: "ム",
      me: "メ",
      mo: "モ",
      ya: "ヤ",
      yu: "ユ",
      yo: "ヨ",
      ra: "ラ",
      ri: "リ",
      ru: "ル",
      re: "レ",
      ro: "ロ",
      wa: "ワ",
      wo: "ヲ",
      n: "ン",
      // Dakuten
      ga: "ガ",
      gi: "ギ",
      gu: "グ",
      ge: "ゲ",
      go: "ゴ",
      za: "ザ",
      ji: "ジ",
      zu: "ズ",
      ze: "ゼ",
      zo: "ゾ",
      da: "ダ",
      de: "デ",
      do: "ド",
      ba: "バ",
      bi: "ビ",
      bu: "ブ",
      be: "ベ",
      bo: "ボ",
      pa: "パ",
      pi: "ピ",
      pu: "プ",
      pe: "ペ",
      po: "ポ",
      // Kombinatsiyalar
      kya: "キャ",
      kyu: "キュ",
      kyo: "キョ",
      sha: "シャ",
      shu: "シュ",
      sho: "ショ",
      cha: "チャ",
      chu: "チュ",
      cho: "チョ",
      nya: "ニャ",
      nyu: "ニュ",
      nyo: "ニョ",
      hya: "ヒャ",
      hyu: "ヒュ",
      hyo: "ヒョ",
      mya: "ミャ",
      myu: "ミュ",
      myo: "ミョ",
      rya: "リャ",
      ryu: "リュ",
      ryo: "リョ",
      gya: "ギャ",
      gyu: "ギュ",
      gyo: "ギョ",
      ja: "ジャ",
      ju: "ジュ",
      jo: "ジョ",
      bya: "ビャ",
      byu: "ビュ",
      byo: "ビョ",
      pya: "ピャ",
      pyu: "ピュ",
      pyo: "ピョ",
    }

    if ("speechSynthesis" in window) {
      // Yapon harfini ishlatish
      const japaneseText = japaneseMapping[romaji] || romaji
      const utterance = new SpeechSynthesisUtterance(japaneseText)

      // Yapon tilini majburiy ravishda o'rnatish
      utterance.lang = "ja-JP"
      utterance.rate = 0.7 // Yanada sekinroq
      utterance.pitch = 1.1 // Biroz balandroq
      utterance.volume = 0.8

      // Yapon ovozini topishga harakat qilish
      const voices = speechSynthesis.getVoices()
      const japaneseVoice = voices.find(
        (voice) => voice.lang.includes("ja") || voice.name.includes("Japanese") || voice.name.includes("Japan"),
      )

      if (japaneseVoice) {
        utterance.voice = japaneseVoice
      }

      speechSynthesis.speak(utterance)
    }
  }

  const CharacterGrid = ({ characters, title }: { characters: any[]; title: string }) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {characters.map((item, index) => (
          <Card
            key={index}
            className={`cursor-pointer hover:bg-green-50 transition-all duration-200 hover:scale-105 ${item.char === "" ? "invisible" : ""
              } ${selectedChar?.char === item.char ? "bg-green-100 border-green-500" : ""}`}
            onClick={() => {
              if (item.char) {
                setSelectedChar(item)
                playAudio(item.romaji)
              }
            }}
          >
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-800 mb-1">{item.char}</div>
              <div className="text-sm text-gray-600">{item.romaji}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifa
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Katakana Alifbosi</h1>
          <p className="text-gray-600">Chet el so'zlari uchun ishlatiladigan yozuv tizimi</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Asosiy harflar</TabsTrigger>
                <TabsTrigger value="dakuten">Dakuten harflar</TabsTrigger>
                <TabsTrigger value="combinations">Kombinatsiyalar</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="mt-6">
                <CharacterGrid characters={katakanaBasic} title="Asosiy Katakana harflari (46 ta)" />
              </TabsContent>

              <TabsContent value="dakuten" className="mt-6">
                <CharacterGrid characters={katakanaDakuten} title="Dakuten va Handakuten harflar (25 ta)" />
              </TabsContent>

              <TabsContent value="combinations" className="mt-6">
                <CharacterGrid characters={katakanaCombinations} title="Kombinatsiya harflar (33 ta)" />
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Tanlangan harf</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedChar ? (
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-600 mb-4">{selectedChar.char}</div>
                    <div className="text-xl font-semibold text-gray-800 mb-2">{selectedChar.romaji}</div>
                    <div className="text-sm text-gray-600 mb-4">Bu harf "{selectedChar.romaji}" deb o'qiladi</div>
                    <Button
                      onClick={() => playAudio(selectedChar.romaji)}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      🔊 Ovozni eshitish
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">Harfni tanlang</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
