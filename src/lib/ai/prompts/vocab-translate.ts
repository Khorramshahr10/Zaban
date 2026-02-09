import { LanguageConfig } from "@/lib/language/types";

export function buildVocabTranslatePrompt(
  words: string[],
  langConfig: LanguageConfig
): { system: string; user: string } {
  const system = `You are a ${langConfig.name} language expert and translator. You translate English words to ${langConfig.name} with transliterations, part-of-speech labels, plural forms, synonyms, and antonyms. Always respond with valid JSON only.`;

  const wordList = words.map((w, i) => `${i + 1}. ${w}`).join("\n");

  const user = `Translate the following English words to ${langConfig.name}:

${wordList}

Return a JSON array with one object per word, in the same order:
[
  {
    "english": "<original English word>",
    "target": "<translated word in ${langConfig.name}>",
    "transliteration": "<romanized pronunciation>",
    "partOfSpeech": "<noun|verb|adjective|adverb|preposition|pronoun|conjunction|interjection|particle|phrase>",
    "plural1": "<broken/irregular plural form, or empty string if not applicable>",
    "plural2": "<sound/regular plural form, or empty string if not applicable>",
    "muradif": "<comma-separated synonyms in ${langConfig.name}, or empty string if none>",
    "mudaad": "<comma-separated antonyms in ${langConfig.name}, or empty string if none>"
  }
]

Guidelines for the new fields:
- plural1/plural2: Only provide for nouns and adjectives. Leave empty for verbs, particles, prepositions, etc.
- muradif (synonyms): Provide 1-3 synonyms in ${langConfig.name} script, comma-separated. Leave empty if no common synonyms exist.
- mudaad (antonyms): Provide 1-3 antonyms in ${langConfig.name} script, comma-separated. Leave empty if no common antonyms exist.

Return ONLY the JSON array, no markdown, no explanation.`;

  return { system, user };
}
