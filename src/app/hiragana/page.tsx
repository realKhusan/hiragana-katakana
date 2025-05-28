"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const hiraganaBasic = [
  { char: "あ", romaji: "a" },
  { char: "い", romaji: "i" },
  { char: "う", romaji: "u" },
  { char: "え", romaji: "e" },
  { char: "お", romaji: "o" },
  { char: "か", romaji: "ka" },
  { char: "き", romaji: "ki" },
  { char: "く", romaji: "ku" },
  { char: "け", romaji: "ke" },
  { char: "こ", romaji: "ko" },
  { char: "さ", romaji: "sa" },
  { char: "し", romaji: "shi" },
  { char: "す", romaji: "su" },
  { char: "せ", romaji: "se" },
  { char: "そ", romaji: "so" },
  { char: "た", romaji: "ta" },
  { char: "ち", romaji: "chi" },
  { char: "つ", romaji: "tsu" },
  { char: "て", romaji: "te" },
  { char: "と", romaji: "to" },
  { char: "な", romaji: "na" },
  { char: "に", romaji: "ni" },
  { char: "ぬ", romaji: "nu" },
  { char: "ね", romaji: "ne" },
  { char: "の", romaji: "no" },
  { char: "は", romaji: "ha" },
  { char: "ひ", romaji: "hi" },
  { char: "ふ", romaji: "fu" },
  { char: "へ", romaji: "he" },
  { char: "ほ", romaji: "ho" },
  { char: "ま", romaji: "ma" },
  { char: "み", romaji: "mi" },
  { char: "む", romaji: "mu" },
  { char: "め", romaji: "me" },
  { char: "も", romaji: "mo" },
  { char: "や", romaji: "ya" },
  { char: "", romaji: "" },
  { char: "ゆ", romaji: "yu" },
  { char: "", romaji: "" },
  { char: "よ", romaji: "yo" },
  { char: "ら", romaji: "ra" },
  { char: "り", romaji: "ri" },
  { char: "る", romaji: "ru" },
  { char: "れ", romaji: "re" },
  { char: "ろ", romaji: "ro" },
  { char: "わ", romaji: "wa" },
  { char: "", romaji: "" },
  { char: "", romaji: "" },
  { char: "", romaji: "" },
  { char: "を", romaji: "wo" },
  { char: "ん", romaji: "n" },
]

const hiraganaDakuten = [
  { char: "が", romaji: "ga" },
  { char: "ぎ", romaji: "gi" },
  { char: "ぐ", romaji: "gu" },
  { char: "げ", romaji: "ge" },
  { char: "ご", romaji: "go" },
  { char: "ざ", romaji: "za" },
  { char: "じ", romaji: "ji" },
  { char: "ず", romaji: "zu" },
  { char: "ぜ", romaji: "ze" },
  { char: "ぞ", romaji: "zo" },
  { char: "だ", romaji: "da" },
  { char: "ぢ", romaji: "ji" },
  { char: "づ", romaji: "zu" },
  { char: "で", romaji: "de" },
  { char: "ど", romaji: "do" },
  { char: "ば", romaji: "ba" },
  { char: "び", romaji: "bi" },
  { char: "ぶ", romaji: "bu" },
  { char: "べ", romaji: "be" },
  { char: "ぼ", romaji: "bo" },
  { char: "ぱ", romaji: "pa" },
  { char: "ぴ", romaji: "pi" },
  { char: "ぷ", romaji: "pu" },
  { char: "ぺ", romaji: "pe" },
  { char: "ぽ", romaji: "po" },
]

const hiraganaCombinations = [
  { char: "きゃ", romaji: "kya" },
  { char: "きゅ", romaji: "kyu" },
  { char: "きょ", romaji: "kyo" },
  { char: "しゃ", romaji: "sha" },
  { char: "しゅ", romaji: "shu" },
  { char: "しょ", romaji: "sho" },
  { char: "ちゃ", romaji: "cha" },
  { char: "ちゅ", romaji: "chu" },
  { char: "ちょ", romaji: "cho" },
  { char: "にゃ", romaji: "nya" },
  { char: "にゅ", romaji: "nyu" },
  { char: "にょ", romaji: "nyo" },
  { char: "ひゃ", romaji: "hya" },
  { char: "ひゅ", romaji: "hyu" },
  { char: "ひょ", romaji: "hyo" },
  { char: "みゃ", romaji: "mya" },
  { char: "みゅ", romaji: "myu" },
  { char: "みょ", romaji: "myo" },
  { char: "りゃ", romaji: "rya" },
  { char: "りゅ", romaji: "ryu" },
  { char: "りょ", romaji: "ryo" },
  { char: "ぎゃ", romaji: "gya" },
  { char: "ぎゅ", romaji: "gyu" },
  { char: "ぎょ", romaji: "gyo" },
  { char: "じゃ", romaji: "ja" },
  { char: "じゅ", romaji: "ju" },
  { char: "じょ", romaji: "jo" },
  { char: "びゃ", romaji: "bya" },
  { char: "びゅ", romaji: "byu" },
  { char: "びょ", romaji: "byo" },
  { char: "ぴゃ", romaji: "pya" },
  { char: "ぴゅ", romaji: "pyu" },
  { char: "ぴょ", romaji: "pyo" },
]

export default function HiraganaPage() {
  const [selectedChar, setSelectedChar] = useState<{ char: string; romaji: string } | null>(null)

  const playAudio = (romaji: string) => {
    // Yapon harflarining to'g'ri talaffuzi uchun maxsus mapping
    const japaneseMapping: { [key: string]: string } = {
      a: "あ",
      i: "い",
      u: "う",
      e: "え",
      o: "お",
      ka: "か",
      ki: "き",
      ku: "く",
      ke: "け",
      ko: "こ",
      sa: "さ",
      shi: "し",
      su: "す",
      se: "せ",
      so: "そ",
      ta: "た",
      chi: "ち",
      tsu: "つ",
      te: "て",
      to: "と",
      na: "な",
      ni: "に",
      nu: "ぬ",
      ne: "ね",
      no: "の",
      ha: "は",
      hi: "ひ",
      fu: "ふ",
      he: "へ",
      ho: "ほ",
      ma: "ま",
      mi: "み",
      mu: "む",
      me: "め",
      mo: "も",
      ya: "や",
      yu: "ゆ",
      yo: "よ",
      ra: "ら",
      ri: "り",
      ru: "る",
      re: "れ",
      ro: "ろ",
      wa: "わ",
      wo: "を",
      n: "ん",
      // Dakuten
      ga: "が",
      gi: "ぎ",
      gu: "ぐ",
      ge: "げ",
      go: "ご",
      za: "ざ",
      ji: "じ",
      zu: "ず",
      ze: "ぜ",
      zo: "ぞ",
      da: "だ",
      de: "で",
      do: "ど",
      ba: "ば",
      bi: "び",
      bu: "ぶ",
      be: "べ",
      bo: "ぼ",
      pa: "ぱ",
      pi: "ぴ",
      pu: "ぷ",
      pe: "ぺ",
      po: "ぽ",
      // Kombinatsiyalar
      kya: "きゃ",
      kyu: "きゅ",
      kyo: "きょ",
      sha: "しゃ",
      shu: "しゅ",
      sho: "しょ",
      cha: "ちゃ",
      chu: "ちゅ",
      cho: "ちょ",
      nya: "にゃ",
      nyu: "にゅ",
      nyo: "にょ",
      hya: "ひゃ",
      hyu: "ひゅ",
      hyo: "ひょ",
      mya: "みゃ",
      myu: "みゅ",
      myo: "みょ",
      rya: "りゃ",
      ryu: "りゅ",
      ryo: "りょ",
      gya: "ぎゃ",
      gyu: "ぎゅ",
      gyo: "ぎょ",
      ja: "じゃ",
      ju: "じゅ",
      jo: "じょ",
      bya: "びゃ",
      byu: "びゅ",
      byo: "びょ",
      pya: "ぴゃ",
      pyu: "ぴゅ",
      pyo: "ぴょ",
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
            className={`cursor-pointer hover:bg-blue-50 transition-all duration-200 hover:scale-105 ${
              item.char === "" ? "invisible" : ""
            } ${selectedChar?.char === item.char ? "bg-blue-100 border-blue-500" : ""}`}
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifa
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hiragana Alifbosi</h1>
          <p className="text-gray-600">Yapon tilining asosiy yozuv tizimi</p>
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
                <CharacterGrid characters={hiraganaBasic} title="Asosiy Hiragana harflari (46 ta)" />
              </TabsContent>

              <TabsContent value="dakuten" className="mt-6">
                <CharacterGrid characters={hiraganaDakuten} title="Dakuten va Handakuten harflar (25 ta)" />
              </TabsContent>

              <TabsContent value="combinations" className="mt-6">
                <CharacterGrid characters={hiraganaCombinations} title="Kombinatsiya harflar (33 ta)" />
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
                    <div className="text-6xl font-bold text-blue-600 mb-4">{selectedChar.char}</div>
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
