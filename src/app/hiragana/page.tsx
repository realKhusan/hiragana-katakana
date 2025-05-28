"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { hiraganaBasic, hiraganaCombinations, hiraganaDakuten } from "@/constants/hiragana"

import { IAlphabet } from "@/types/alphabet"
import { createPlayAudio } from "@/utils/play-audio"

export default function HiraganaPage() {
  const [selectedChar, setSelectedChar] = useState<{ char: string; romaji: string } | null>(null)

  const playAudio = createPlayAudio([...hiraganaBasic, ...hiraganaCombinations, ...hiraganaDakuten])

  const CharacterGrid = ({ characters, title }: { characters: IAlphabet[]; title: string }) => (
    <div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {characters.map((item, index) => (
          <Card
            key={index}
            className={`cursor-pointer hover:bg-blue-50 transition-all duration-200 hover:scale-105 ${item.char === "" ? "invisible" : ""
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
            <Button variant="ghost" className="mb-4 cursor-pointer shadow-sm">
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
                    <div className="text-sm text-gray-600 mb-4">{`Bu harf "${selectedChar.romaji}" deb o'qiladi`}</div>
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
