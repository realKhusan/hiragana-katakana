"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, RotateCcw, Check, X, CheckSquare } from "lucide-react"
import Link from "next/link"

// Harf guruhlari
const characterGroups = {
  vowels: { name: "Unlilar (A, I, U, E, O)", chars: ["あ", "い", "う", "え", "お", "ア", "イ", "ウ", "エ", "オ"] },
  k: { name: "K guruhi (Ka, Ki, Ku, Ke, Ko)", chars: ["か", "き", "く", "け", "こ", "カ", "キ", "ク", "ケ", "コ"] },
  s: { name: "S guruhi (Sa, Shi, Su, Se, So)", chars: ["さ", "し", "す", "せ", "そ", "サ", "シ", "ス", "セ", "ソ"] },
  t: { name: "T guruhi (Ta, Chi, Tsu, Te, To)", chars: ["た", "ち", "つ", "て", "と", "タ", "チ", "ツ", "テ", "ト"] },
  n: { name: "N guruhi (Na, Ni, Nu, Ne, No)", chars: ["な", "に", "ぬ", "ね", "の", "ナ", "ニ", "ヌ", "ネ"] },
  h: { name: "H guruhi (Ha, Hi, Fu, He, Ho)", chars: ["は", "ひ", "ふ", "へ", "ほ", "ハ", "ヒ", "フ", "ヘ", "ホ"] },
  m: { name: "M guruhi (Ma, Mi, Mu, Me, Mo)", chars: ["ま", "み", "む", "め", "も", "マ", "ミ", "ム", "メ", "モ"] },
  y: { name: "Y guruhi (Ya, Yu, Yo)", chars: ["や", "ゆ", "よ", "ヤ", "ユ", "ヨ"] },
  r: { name: "R guruhi (Ra, Ri, Ru, Re, Ro)", chars: ["ら", "り", "る", "れ", "ろ", "ラ", "リ", "ル", "レ", "ロ"] },
  w: { name: "W guruhi (Wa, Wo, N)", chars: ["わ", "を", "ん", "ワ", "ヲ", "ン"] },
}

const dakutenGroups = {
  g: { name: "G guruhi (Ga, Gi, Gu, Ge, Go)", chars: ["が", "ぎ", "ぐ", "げ", "ご", "ガ", "ギ", "グ", "ゲ", "ゴ"] },
  z: { name: "Z guruhi (Za, Ji, Zu, Ze, Zo)", chars: ["ざ", "じ", "ず", "ぜ", "ぞ", "ザ", "ジ", "ズ", "ゼ", "ゾ"] },
  d: { name: "D guruhi (Da, Ji, Zu, De, Do)", chars: ["だ", "ぢ", "づ", "で", "ど", "ダ", "ヂ", "ヅ", "デ", "ド"] },
  b: { name: "B guruhi (Ba, Bi, Bu, Be, Bo)", chars: ["ば", "び", "ぶ", "べ", "ぼ", "バ", "ビ", "ブ", "ベ", "ボ"] },
  p: { name: "P guruhi (Pa, Pi, Pu, Pe, Po)", chars: ["ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "パ", "ピ", "プ", "ペ", "ポ"] },
}

const combinationGroups = {
  ky: { name: "KY guruhi (Kya, Kyu, Kyo)", chars: ["きゃ", "きゅ", "きょ", "キャ", "キュ", "キョ"] },
  sy: { name: "SY guruhi (Sha, Shu, Sho)", chars: ["しゃ", "しゅ", "しょ", "シャ", "シュ", "ショ"] },
  ty: { name: "TY guruhi (Cha, Chu, Cho)", chars: ["ちゃ", "ちゅ", "ちょ", "チャ", "チュ", "チョ"] },
  ny: { name: "NY guruhi (Nya, Nyu, Nyo)", chars: ["にゃ", "にゅ", "にょ", "ニャ", "ニュ", "ニョ"] },
  hy: { name: "HY guruhi (Hya, Hyu, Hyo)", chars: ["ひゃ", "ひゅ", "ひょ", "ヒャ", "ヒュ", "ヒョ"] },
  my: { name: "MY guruhi (Mya, Myu, Myo)", chars: ["みゃ", "みゅ", "みょ", "ミャ", "ミュ", "ミョ"] },
  ry: { name: "RY guruhi (Rya, Ryu, Ryo)", chars: ["りゃ", "りゅ", "りょ", "リャ", "リュ", "リョ"] },
  gy: { name: "GY guruhi (Gya, Gyu, Gyo)", chars: ["ぎゃ", "ぎゅ", "ぎょ", "ギャ", "ギュ", "ギョ"] },
  jy: { name: "JY guruhi (Ja, Ju, Jo)", chars: ["じゃ", "じゅ", "じょ", "ジャ", "ジュ", "ジョ"] },
  by: { name: "BY guruhi (Bya, Byu, Byo)", chars: ["びゃ", "びゅ", "びょ", "ビャ", "ビュ", "ビョ"] },
  py: { name: "PY guruhi (Pya, Pyu, Pyo)", chars: ["ぴゃ", "ぴゅ", "ぴょ", "ピャ", "ピュ", "ピョ"] },
}

const allCharacters = [
  // Hiragana basic
  { char: "あ", romaji: "a", type: "hiragana", group: "vowels" },
  { char: "い", romaji: "i", type: "hiragana", group: "vowels" },
  { char: "う", romaji: "u", type: "hiragana", group: "vowels" },
  { char: "え", romaji: "e", type: "hiragana", group: "vowels" },
  { char: "お", romaji: "o", type: "hiragana", group: "vowels" },
  { char: "か", romaji: "ka", type: "hiragana", group: "k" },
  { char: "き", romaji: "ki", type: "hiragana", group: "k" },
  { char: "く", romaji: "ku", type: "hiragana", group: "k" },
  { char: "け", romaji: "ke", type: "hiragana", group: "k" },
  { char: "こ", romaji: "ko", type: "hiragana", group: "k" },
  { char: "さ", romaji: "sa", type: "hiragana", group: "s" },
  { char: "し", romaji: "shi", type: "hiragana", group: "s" },
  { char: "す", romaji: "su", type: "hiragana", group: "s" },
  { char: "せ", romaji: "se", type: "hiragana", group: "s" },
  { char: "そ", romaji: "so", type: "hiragana", group: "s" },
  { char: "た", romaji: "ta", type: "hiragana", group: "t" },
  { char: "ち", romaji: "chi", type: "hiragana", group: "t" },
  { char: "つ", romaji: "tsu", type: "hiragana", group: "t" },
  { char: "て", romaji: "te", type: "hiragana", group: "t" },
  { char: "と", romaji: "to", type: "hiragana", group: "t" },
  { char: "な", romaji: "na", type: "hiragana", group: "n" },
  { char: "に", romaji: "ni", type: "hiragana", group: "n" },
  { char: "ぬ", romaji: "nu", type: "hiragana", group: "n" },
  { char: "ね", romaji: "ne", type: "hiragana", group: "n" },
  { char: "の", romaji: "no", type: "hiragana", group: "n" },
  { char: "は", romaji: "ha", type: "hiragana", group: "h" },
  { char: "ひ", romaji: "hi", type: "hiragana", group: "h" },
  { char: "ふ", romaji: "fu", type: "hiragana", group: "h" },
  { char: "へ", romaji: "he", type: "hiragana", group: "h" },
  { char: "ほ", romaji: "ho", type: "hiragana", group: "h" },
  { char: "ま", romaji: "ma", type: "hiragana", group: "m" },
  { char: "み", romaji: "mi", type: "hiragana", group: "m" },
  { char: "む", romaji: "mu", type: "hiragana", group: "m" },
  { char: "め", romaji: "me", type: "hiragana", group: "m" },
  { char: "も", romaji: "mo", type: "hiragana", group: "m" },
  { char: "や", romaji: "ya", type: "hiragana", group: "y" },
  { char: "ゆ", romaji: "yu", type: "hiragana", group: "y" },
  { char: "よ", romaji: "yo", type: "hiragana", group: "y" },
  { char: "ら", romaji: "ra", type: "hiragana", group: "r" },
  { char: "り", romaji: "ri", type: "hiragana", group: "r" },
  { char: "る", romaji: "ru", type: "hiragana", group: "r" },
  { char: "れ", romaji: "re", type: "hiragana", group: "r" },
  { char: "ろ", romaji: "ro", type: "hiragana", group: "r" },
  { char: "わ", romaji: "wa", type: "hiragana", group: "w" },
  { char: "を", romaji: "wo", type: "hiragana", group: "w" },
  { char: "ん", romaji: "n", type: "hiragana", group: "w" },

  // Katakana basic
  { char: "ア", romaji: "a", type: "katakana", group: "vowels" },
  { char: "イ", romaji: "i", type: "katakana", group: "vowels" },
  { char: "ウ", romaji: "u", type: "katakana", group: "vowels" },
  { char: "エ", romaji: "e", type: "katakana", group: "vowels" },
  { char: "オ", romaji: "o", type: "katakana", group: "vowels" },
  { char: "カ", romaji: "ka", type: "katakana", group: "k" },
  { char: "キ", romaji: "ki", type: "katakana", group: "k" },
  { char: "ク", romaji: "ku", type: "katakana", group: "k" },
  { char: "ケ", romaji: "ke", type: "katakana", group: "k" },
  { char: "コ", romaji: "ko", type: "katakana", group: "k" },
  { char: "サ", romaji: "sa", type: "katakana", group: "s" },
  { char: "シ", romaji: "shi", type: "katakana", group: "s" },
  { char: "ス", romaji: "su", type: "katakana", group: "s" },
  { char: "セ", romaji: "se", type: "katakana", group: "s" },
  { char: "ソ", romaji: "so", type: "katakana", group: "s" },
  { char: "タ", romaji: "ta", type: "katakana", group: "t" },
  { char: "チ", romaji: "chi", type: "katakana", group: "t" },
  { char: "ツ", romaji: "tsu", type: "katakana", group: "t" },
  { char: "テ", romaji: "te", type: "katakana", group: "t" },
  { char: "ト", romaji: "to", type: "katakana", group: "t" },
  { char: "ナ", romaji: "na", type: "katakana", group: "n" },
  { char: "ニ", romaji: "ni", type: "katakana", group: "n" },
  { char: "ヌ", romaji: "nu", type: "katakana", group: "n" },
  { char: "ネ", romaji: "ne", type: "katakana", group: "n" },
  { char: "ノ", romaji: "no", type: "katakana", group: "n" },
  { char: "ハ", romaji: "ha", type: "katakana", group: "h" },
  { char: "ヒ", romaji: "hi", type: "katakana", group: "h" },
  { char: "フ", romaji: "fu", type: "katakana", group: "h" },
  { char: "ヘ", romaji: "he", type: "katakana", group: "h" },
  { char: "ホ", romaji: "ho", type: "katakana", group: "h" },
  { char: "マ", romaji: "ma", type: "katakana", group: "m" },
  { char: "ミ", romaji: "mi", type: "katakana", group: "m" },
  { char: "ム", romaji: "mu", type: "katakana", group: "m" },
  { char: "メ", romaji: "me", type: "katakana", group: "m" },
  { char: "モ", romaji: "mo", type: "katakana", group: "m" },
  { char: "ヤ", romaji: "ya", type: "katakana", group: "y" },
  { char: "ユ", romaji: "yu", type: "katakana", group: "y" },
  { char: "ヨ", romaji: "yo", type: "katakana", group: "y" },
  { char: "ラ", romaji: "ra", type: "katakana", group: "r" },
  { char: "リ", romaji: "ri", type: "katakana", group: "r" },
  { char: "ル", romaji: "ru", type: "katakana", group: "r" },
  { char: "レ", romaji: "re", type: "katakana", group: "r" },
  { char: "ロ", romaji: "ro", type: "katakana", group: "r" },
  { char: "ワ", romaji: "wa", type: "katakana", group: "w" },
  { char: "ヲ", romaji: "wo", type: "katakana", group: "w" },
  { char: "ン", romaji: "n", type: "katakana", group: "w" },

  // Dakuten harflar
  { char: "が", romaji: "ga", type: "hiragana", group: "g", category: "dakuten" },
  { char: "ぎ", romaji: "gi", type: "hiragana", group: "g", category: "dakuten" },
  { char: "ぐ", romaji: "gu", type: "hiragana", group: "g", category: "dakuten" },
  { char: "げ", romaji: "ge", type: "hiragana", group: "g", category: "dakuten" },
  { char: "ご", romaji: "go", type: "hiragana", group: "g", category: "dakuten" },
  { char: "ざ", romaji: "za", type: "hiragana", group: "z", category: "dakuten" },
  { char: "じ", romaji: "ji", type: "hiragana", group: "z", category: "dakuten" },
  { char: "ず", romaji: "zu", type: "hiragana", group: "z", category: "dakuten" },
  { char: "ぜ", romaji: "ze", type: "hiragana", group: "z", category: "dakuten" },
  { char: "ぞ", romaji: "zo", type: "hiragana", group: "z", category: "dakuten" },
  { char: "だ", romaji: "da", type: "hiragana", group: "d", category: "dakuten" },
  { char: "ぢ", romaji: "ji", type: "hiragana", group: "d", category: "dakuten" },
  { char: "づ", romaji: "zu", type: "hiragana", group: "d", category: "dakuten" },
  { char: "で", romaji: "de", type: "hiragana", group: "d", category: "dakuten" },
  { char: "ど", romaji: "do", type: "hiragana", group: "d", category: "dakuten" },
  { char: "ば", romaji: "ba", type: "hiragana", group: "b", category: "dakuten" },
  { char: "び", romaji: "bi", type: "hiragana", group: "b", category: "dakuten" },
  { char: "ぶ", romaji: "bu", type: "hiragana", group: "b", category: "dakuten" },
  { char: "べ", romaji: "be", type: "hiragana", group: "b", category: "dakuten" },
  { char: "ぼ", romaji: "bo", type: "hiragana", group: "b", category: "dakuten" },
  { char: "ぱ", romaji: "pa", type: "hiragana", group: "p", category: "dakuten" },
  { char: "ぴ", romaji: "pi", type: "hiragana", group: "p", category: "dakuten" },
  { char: "ぷ", romaji: "pu", type: "hiragana", group: "p", category: "dakuten" },
  { char: "ぺ", romaji: "pe", type: "hiragana", group: "p", category: "dakuten" },
  { char: "ぽ", romaji: "po", type: "hiragana", group: "p", category: "dakuten" },

  // Katakana dakuten
  { char: "ガ", romaji: "ga", type: "katakana", group: "g", category: "dakuten" },
  { char: "ギ", romaji: "gi", type: "katakana", group: "g", category: "dakuten" },
  { char: "グ", romaji: "gu", type: "katakana", group: "g", category: "dakuten" },
  { char: "ゲ", romaji: "ge", type: "katakana", group: "g", category: "dakuten" },
  { char: "ゴ", romaji: "go", type: "katakana", group: "g", category: "dakuten" },
  { char: "ザ", romaji: "za", type: "katakana", group: "z", category: "dakuten" },
  { char: "ジ", romaji: "ji", type: "katakana", group: "z", category: "dakuten" },
  { char: "ズ", romaji: "zu", type: "katakana", group: "z", category: "dakuten" },
  { char: "ゼ", romaji: "ze", type: "katakana", group: "z", category: "dakuten" },
  { char: "ゾ", romaji: "zo", type: "katakana", group: "z", category: "dakuten" },
  { char: "ダ", romaji: "da", type: "katakana", group: "d", category: "dakuten" },
  { char: "ヂ", romaji: "ji", type: "katakana", group: "d", category: "dakuten" },
  { char: "ヅ", romaji: "zu", type: "katakana", group: "d", category: "dakuten" },
  { char: "デ", romaji: "de", type: "katakana", group: "d", category: "dakuten" },
  { char: "ド", romaji: "do", type: "katakana", group: "d", category: "dakuten" },
  { char: "バ", romaji: "ba", type: "katakana", group: "b", category: "dakuten" },
  { char: "ビ", romaji: "bi", type: "katakana", group: "b", category: "dakuten" },
  { char: "ブ", romaji: "bu", type: "katakana", group: "b", category: "dakuten" },
  { char: "ベ", romaji: "be", type: "katakana", group: "b", category: "dakuten" },
  { char: "ボ", romaji: "bo", type: "katakana", group: "b", category: "dakuten" },
  { char: "パ", romaji: "pa", type: "katakana", group: "p", category: "dakuten" },
  { char: "ピ", romaji: "pi", type: "katakana", group: "p", category: "dakuten" },
  { char: "プ", romaji: "pu", type: "katakana", group: "p", category: "dakuten" },
  { char: "ペ", romaji: "pe", type: "katakana", group: "p", category: "dakuten" },
  { char: "ポ", romaji: "po", type: "katakana", group: "p", category: "dakuten" },

  // Kombinatsiyalar
  { char: "きゃ", romaji: "kya", type: "hiragana", group: "ky", category: "combination" },
  { char: "きゅ", romaji: "kyu", type: "hiragana", group: "ky", category: "combination" },
  { char: "きょ", romaji: "kyo", type: "hiragana", group: "ky", category: "combination" },
  { char: "しゃ", romaji: "sha", type: "hiragana", group: "sy", category: "combination" },
  { char: "しゅ", romaji: "shu", type: "hiragana", group: "sy", category: "combination" },
  { char: "しょ", romaji: "sho", type: "hiragana", group: "sy", category: "combination" },
  { char: "ちゃ", romaji: "cha", type: "hiragana", group: "ty", category: "combination" },
  { char: "ちゅ", romaji: "chu", type: "hiragana", group: "ty", category: "combination" },
  { char: "ちょ", romaji: "cho", type: "hiragana", group: "ty", category: "combination" },
  { char: "にゃ", romaji: "nya", type: "hiragana", group: "ny", category: "combination" },
  { char: "にゅ", romaji: "nyu", type: "hiragana", group: "ny", category: "combination" },
  { char: "にょ", romaji: "nyo", type: "hiragana", group: "ny", category: "combination" },
  { char: "ひゃ", romaji: "hya", type: "hiragana", group: "hy", category: "combination" },
  { char: "ひゅ", romaji: "hyu", type: "hiragana", group: "hy", category: "combination" },
  { char: "ひょ", romaji: "hyo", type: "hiragana", group: "hy", category: "combination" },
  { char: "みゃ", romaji: "mya", type: "hiragana", group: "my", category: "combination" },
  { char: "みゅ", romaji: "myu", type: "hiragana", group: "my", category: "combination" },
  { char: "みょ", romaji: "myo", type: "hiragana", group: "my", category: "combination" },
  { char: "りゃ", romaji: "rya", type: "hiragana", group: "ry", category: "combination" },
  { char: "りゅ", romaji: "ryu", type: "hiragana", group: "ry", category: "combination" },
  { char: "りょ", romaji: "ryo", type: "hiragana", group: "ry", category: "combination" },
  { char: "ぎゃ", romaji: "gya", type: "hiragana", group: "gy", category: "combination" },
  { char: "ぎゅ", romaji: "gyu", type: "hiragana", group: "gy", category: "combination" },
  { char: "ぎょ", romaji: "gyo", type: "hiragana", group: "gy", category: "combination" },
  { char: "じゃ", romaji: "ja", type: "hiragana", group: "jy", category: "combination" },
  { char: "じゅ", romaji: "ju", type: "hiragana", group: "jy", category: "combination" },
  { char: "じょ", romaji: "jo", type: "hiragana", group: "jy", category: "combination" },
  { char: "びゃ", romaji: "bya", type: "hiragana", group: "by", category: "combination" },
  { char: "びゅ", romaji: "byu", type: "hiragana", group: "by", category: "combination" },
  { char: "びょ", romaji: "byo", type: "hiragana", group: "by", category: "combination" },
  { char: "ぴゃ", romaji: "pya", type: "hiragana", group: "py", category: "combination" },
  { char: "ぴゅ", romaji: "pyu", type: "hiragana", group: "py", category: "combination" },
  { char: "ぴょ", romaji: "pyo", type: "hiragana", group: "py", category: "combination" },

  // Katakana kombinatsiyalar
  { char: "キャ", romaji: "kya", type: "katakana", group: "ky", category: "combination" },
  { char: "キュ", romaji: "kyu", type: "katakana", group: "ky", category: "combination" },
  { char: "キョ", romaji: "kyo", type: "katakana", group: "ky", category: "combination" },
  { char: "シャ", romaji: "sha", type: "katakana", group: "sy", category: "combination" },
  { char: "シュ", romaji: "shu", type: "katakana", group: "sy", category: "combination" },
  { char: "ショ", romaji: "sho", type: "katakana", group: "sy", category: "combination" },
  { char: "チャ", romaji: "cha", type: "katakana", group: "ty", category: "combination" },
  { char: "チュ", romaji: "chu", type: "katakana", group: "ty", category: "combination" },
  { char: "チョ", romaji: "cho", type: "katakana", group: "ty", category: "combination" },
  { char: "ニャ", romaji: "nya", type: "katakana", group: "ny", category: "combination" },
  { char: "ニュ", romaji: "nyu", type: "katakana", group: "ny", category: "combination" },
  { char: "ニョ", romaji: "nyo", type: "katakana", group: "ny", category: "combination" },
  { char: "ヒャ", romaji: "hya", type: "katakana", group: "hy", category: "combination" },
  { char: "ヒュ", romaji: "hyu", type: "katakana", group: "hy", category: "combination" },
  { char: "ヒョ", romaji: "hyo", type: "katakana", group: "hy", category: "combination" },
  { char: "ミャ", romaji: "mya", type: "katakana", group: "my", category: "combination" },
  { char: "ミュ", romaji: "myu", type: "katakana", group: "my", category: "combination" },
  { char: "ミョ", romaji: "myo", type: "katakana", group: "my", category: "combination" },
  { char: "リャ", romaji: "rya", type: "katakana", group: "ry", category: "combination" },
  { char: "リュ", romaji: "ryu", type: "katakana", group: "ry", category: "combination" },
  { char: "リョ", romaji: "ryo", type: "katakana", group: "ry", category: "combination" },
  { char: "ギャ", romaji: "gya", type: "katakana", group: "gy", category: "combination" },
  { char: "ギュ", romaji: "gyu", type: "katakana", group: "gy", category: "combination" },
  { char: "ギョ", romaji: "gyo", type: "katakana", group: "gy", category: "combination" },
  { char: "ジャ", romaji: "ja", type: "katakana", group: "jy", category: "combination" },
  { char: "ジュ", romaji: "ju", type: "katakana", group: "jy", category: "combination" },
  { char: "ジョ", romaji: "jo", type: "katakana", group: "jy", category: "combination" },
  { char: "ビャ", romaji: "bya", type: "katakana", group: "by", category: "combination" },
  { char: "ビュ", romaji: "byu", type: "katakana", group: "by", category: "combination" },
  { char: "ビョ", romaji: "byo", type: "katakana", group: "by", category: "combination" },
  { char: "ピャ", romaji: "pya", type: "katakana", group: "py", category: "combination" },
  { char: "ピュ", romaji: "pyu", type: "katakana", group: "py", category: "combination" },
  { char: "ピョ", romaji: "pyo", type: "katakana", group: "py", category: "combination" },
]

export default function TestPage() {
  const [selectedGroups, setSelectedGroups] = useState<string[]>([])
  const [includeDakuten, setIncludeDakuten] = useState(false)
  const [includeCombinations, setIncludeCombinations] = useState(false)
  const [scriptType, setScriptType] = useState<"hiragana" | "katakana" | "mixed">("mixed")
  const [testMode, setTestMode] = useState<"multiple" | "input">("multiple")
  const [repetitions, setRepetitions] = useState(3)
  const [isTestStarted, setIsTestStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [testQuestions, setTestQuestions] = useState<any[]>([])
  const [userAnswer, setUserAnswer] = useState("")
  const [selectedOption, setSelectedOption] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answers, setAnswers] = useState<any[]>([])

  const handleGroupSelection = (groupKey: string) => {
    setSelectedGroups((prev) => (prev.includes(groupKey) ? prev.filter((g) => g !== groupKey) : [...prev, groupKey]))
  }

  const selectAllGroups = () => {
    const allGroupKeys = Object.keys(characterGroups)
    setSelectedGroups(allGroupKeys)
  }

  const clearAllGroups = () => {
    setSelectedGroups([])
  }

  const getSelectedCharacters = () => {
    const selectedChars: any[] = []

    // Asosiy guruhlar
    selectedGroups.forEach((groupKey) => {
      const groupChars = characterGroups[groupKey as keyof typeof characterGroups]?.chars || []
      groupChars.forEach((char) => {
        const charData = allCharacters.find((c) => c.char === char)
        if (charData) {
          // Script type bo'yicha filter
          if (scriptType === "mixed" || charData.type === scriptType) {
            selectedChars.push(charData)
          }
        }
      })
    })

    // Dakuten harflar
    if (includeDakuten) {
      selectedGroups.forEach((groupKey) => {
        const dakutenKey =
          groupKey === "k" ? "g" : groupKey === "s" ? "z" : groupKey === "t" ? "d" : groupKey === "h" ? "b" : null

        if (dakutenKey && dakutenGroups[dakutenKey as keyof typeof dakutenGroups]) {
          const dakutenChars = dakutenGroups[dakutenKey as keyof typeof dakutenGroups].chars
          dakutenChars.forEach((char) => {
            const charData = allCharacters.find((c) => c.char === char)
            if (charData && (scriptType === "mixed" || charData.type === scriptType)) {
              selectedChars.push(charData)
            }
          })
        }

        // P guruhi (handakuten)
        if (groupKey === "h") {
          const pChars = dakutenGroups.p.chars
          pChars.forEach((char) => {
            const charData = allCharacters.find((c) => c.char === char)
            if (charData && (scriptType === "mixed" || charData.type === scriptType)) {
              selectedChars.push(charData)
            }
          })
        }
      })
    }

    // Kombinatsiya harflar
    if (includeCombinations) {
      selectedGroups.forEach((groupKey) => {
        const combinationKey = groupKey + "y"
        if (combinationGroups[combinationKey as keyof typeof combinationGroups]) {
          const combinationChars = combinationGroups[combinationKey as keyof typeof combinationGroups].chars
          combinationChars.forEach((char) => {
            const charData = allCharacters.find((c) => c.char === char)
            if (charData && (scriptType === "mixed" || charData.type === scriptType)) {
              selectedChars.push(charData)
            }
          })
        }
      })
    }

    return selectedChars
  }

  const generateTestQuestions = () => {
    const selectedChars = getSelectedCharacters()
    if (selectedChars.length === 0) return []

    const questions: any[] = []

    for (let i = 0; i < repetitions; i++) {
      selectedChars.forEach((char) => {
        if (testMode === "multiple") {
          // Generate wrong options
          const wrongOptions = allCharacters
            .filter((c) => c.romaji !== char.romaji)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map((c) => c.romaji)

          const options = [char.romaji, ...wrongOptions].sort(() => Math.random() - 0.5)

          questions.push({
            char: char.char,
            correctAnswer: char.romaji,
            options: options,
            type: "multiple",
          })
        } else {
          questions.push({
            char: char.char,
            correctAnswer: char.romaji,
            type: "input",
          })
        }
      })
    }

    return questions.sort(() => Math.random() - 0.5)
  }

  const startTest = () => {
    const questions = generateTestQuestions()
    if (questions && questions.length > 0) {
      setTestQuestions(questions)
      setIsTestStarted(true)
      setCurrentQuestion(0)
      setScore(0)
      setAnswers([])
      setUserAnswer("")
      setSelectedOption("")
      setShowResult(false)
    }
  }

  const submitAnswer = () => {
    const currentQ = testQuestions[currentQuestion]
    const answer = testMode === "multiple" ? selectedOption : userAnswer.toLowerCase().trim()
    const isCorrect = answer === currentQ.correctAnswer

    if (isCorrect) {
      setScore(score + 1)
    }

    setAnswers([
      ...answers,
      {
        question: currentQ,
        userAnswer: answer,
        isCorrect: isCorrect,
      },
    ])

    if (currentQuestion + 1 < testQuestions.length) {
      setCurrentQuestion(currentQuestion + 1)
      setUserAnswer("")
      setSelectedOption("")
    } else {
      setShowResult(true)
    }
  }

  const resetTest = () => {
    setIsTestStarted(false)
    setCurrentQuestion(0)
    setScore(0)
    setAnswers([])
    setUserAnswer("")
    setSelectedOption("")
    setShowResult(false)
  }

  // Test boshlanganda playAudio funksiyasini qo'shing
  const playAudio = (romaji: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(romaji)
      utterance.lang = "ja-JP"
      utterance.rate = 0.8
      utterance.pitch = 1
      speechSynthesis.speak(utterance)
    }
  }

  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Test natijalari</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {score}/{testQuestions.length}
                </div>
                <div className="text-lg text-gray-600">
                  {Math.round((score / testQuestions.length) * 100)}% to'g'ri javob
                </div>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {answers.map((answer, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border ${
                      answer.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl font-bold">{answer.question.char}</div>
                        <div>
                          <div className="text-sm text-gray-600">Sizning javobingiz: {answer.userAnswer}</div>
                          <div className="text-sm text-gray-600">To'g'ri javob: {answer.question.correctAnswer}</div>
                        </div>
                      </div>
                      {answer.isCorrect ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 mt-6">
                <Button onClick={resetTest} className="flex-1">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Qayta test
                </Button>
                <Link href="/" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Bosh sahifa
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isTestStarted) {
    const currentQ = testQuestions[currentQuestion]

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-lg mx-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Savol {currentQuestion + 1}/{testQuestions.length}
                </CardTitle>
                <div className="text-sm text-gray-600">Ball: {score}</div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-purple-600 mb-4">{currentQ.char}</div>
                <div className="text-lg text-gray-700 mb-3">Bu harfni qanday o'qiladi?</div>
                <Button
                  onClick={() => playAudio(currentQ.correctAnswer)}
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:text-purple-700"
                >
                  🔊 Ovozni eshitish
                </Button>
              </div>

              {testMode === "multiple" ? (
                <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                  {currentQ.options.map((option: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="text-lg">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <Input
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Javobni kiriting..."
                  className="text-lg text-center"
                  onKeyPress={(e) => e.key === "Enter" && submitAnswer()}
                />
              )}

              <Button
                onClick={submitAnswer}
                className="w-full mt-6"
                disabled={testMode === "multiple" ? !selectedOption : !userAnswer.trim()}
              >
                {currentQuestion + 1 === testQuestions.length ? "Testni tugatish" : "Keyingi savol"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const selectedCharsCount = getSelectedCharacters().length

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Bosh sahifa
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test sozlamalari</h1>
          <p className="text-gray-600">Harf guruhlarini tanlang va test parametrlarini sozlang</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Harf guruhlari */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Harf guruhlari</CardTitle>
                  <div className="flex gap-2">
                    <Button onClick={selectAllGroups} size="sm" variant="outline">
                      <CheckSquare className="w-4 h-4 mr-1" />
                      Barchasini tanlash
                    </Button>
                    <Button onClick={clearAllGroups} size="sm" variant="outline">
                      Tozalash
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {Object.entries(characterGroups).map(([key, group]) => (
                    <div key={key} className="flex items-center space-x-2">
                      <Checkbox
                        id={key}
                        checked={selectedGroups.includes(key)}
                        onCheckedChange={() => handleGroupSelection(key)}
                      />
                      <Label htmlFor={key} className="text-sm font-medium">
                        {group.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Qo'shimcha harflar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="dakuten" checked={includeDakuten} onCheckedChange={setIncludeDakuten} />
                  <Label htmlFor="dakuten" className="text-sm font-medium">
                    Dakuten harflar (が, ざ, だ, ば, ぱ)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="combinations" checked={includeCombinations} onCheckedChange={setIncludeCombinations} />
                  <Label htmlFor="combinations" className="text-sm font-medium">
                    Kombinatsiya harflar (きゃ, しゃ, ちゃ)
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Test sozlamalari */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Yozuv turi</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={scriptType}
                  onValueChange={(value: "hiragana" | "katakana" | "mixed") => setScriptType(value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hiragana">Faqat Hiragana</SelectItem>
                    <SelectItem value="katakana">Faqat Katakana</SelectItem>
                    <SelectItem value="mixed">Aralash</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test turi</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={testMode} onValueChange={(value: "multiple" | "input") => setTestMode(value)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="multiple" id="multiple" />
                    <Label htmlFor="multiple">Ko'p variantli</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="input" id="input" />
                    <Label htmlFor="input">Yozib javob berish</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Takrorlash soni</CardTitle>
              </CardHeader>
              <CardContent>
                <Label htmlFor="repetitions">Har bir harf necha marta takrorlansin?</Label>
                <Input
                  id="repetitions"
                  type="number"
                  min="1"
                  max="10"
                  value={repetitions}
                  onChange={(e) => setRepetitions(Number.parseInt(e.target.value) || 1)}
                  className="mt-2"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Test ma'lumotlari</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>Tanlangan harflar: {selectedCharsCount}</div>
                  <div>Takrorlash: {repetitions} marta</div>
                  <div>Jami savollar: {selectedCharsCount * repetitions}</div>
                  <div>Test turi: {testMode === "multiple" ? "Ko'p variantli" : "Yozib javob berish"}</div>
                  <div>
                    Yozuv turi:{" "}
                    {scriptType === "hiragana" ? "Hiragana" : scriptType === "katakana" ? "Katakana" : "Aralash"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={startTest} className="w-full" size="lg" disabled={selectedCharsCount === 0}>
              Testni boshlash
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
