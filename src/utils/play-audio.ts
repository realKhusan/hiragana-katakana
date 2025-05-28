import { IAlphabet } from "@/types/alphabet";

export const createPlayAudio = (array: IAlphabet[]) => {
  const romajiToKana = Object.fromEntries(
    array
      .filter(({ char, romaji }) => char && romaji)
      .map(({ romaji, char }) => [romaji, char])
  ) as Record<string, string>;
  return (romaji: string) => {
    if (!("speechSynthesis" in window)) return;

    const kana = romajiToKana[romaji] ?? romaji;
    const utterance = new SpeechSynthesisUtterance(kana);

    utterance.lang = "ja-JP";
    utterance.rate = 0.7;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;

    const japaneseVoice = speechSynthesis
      .getVoices()
      .find(
        (v) =>
          v.lang.includes("ja") ||
          v.name.includes("Japanese") ||
          v.name.includes("Japan")
      );

    if (japaneseVoice) utterance.voice = japaneseVoice;

    speechSynthesis.speak(utterance);
  };
};
