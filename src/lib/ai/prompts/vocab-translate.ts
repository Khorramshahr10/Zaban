import { LanguageConfig } from "@/lib/language/types";

export function buildVocabTranslatePrompt(
  words: string[],
  langConfig: LanguageConfig
): { system: string; user: string } {
  const system = `You are a ${langConfig.name} language expert and translator. You translate English words to ${langConfig.name} with transliterations and part-of-speech labels. Always respond with valid JSON only.`;

  const wordList = words.map((w, i) => `${i + 1}. ${w}`).join("\n");

  const user = `Translate the following English words to ${langConfig.name}:

${wordList}

Return a JSON array with one object per word, in the same order:
[
  {
    "english": "<original English word>",
    "target": "<translated word in ${langConfig.name}>",
    "transliteration": "<romanized pronunciation>",
    "partOfSpeech": "<noun|verb|adjective|adverb|preposition|pronoun|conjunction|interjection|particle|phrase>"
  }
]

Return ONLY the JSON array, no markdown, no explanation.`;

  return { system, user };
}
