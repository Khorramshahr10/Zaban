import { LanguageConfig } from "./types";

export const farsiConfig: LanguageConfig = {
  code: "fa",
  name: "Farsi (Persian)",
  direction: "rtl",
  fontFamily: "'Noto Sans Arabic', sans-serif",
  tenses: [
    { id: "present_simple", label: "Present Simple (حال ساده)", labelNative: "حال ساده" },
    { id: "past_simple", label: "Past Simple (گذشته ساده)", labelNative: "گذشته ساده" },
    { id: "present_continuous", label: "Present Continuous (حال استمراری)", labelNative: "حال استمراری" },
    { id: "past_continuous", label: "Past Continuous (گذشته استمراری)", labelNative: "گذشته استمراری" },
    { id: "present_perfect", label: "Present Perfect (حال کامل)", labelNative: "حال کامل" },
    { id: "past_perfect", label: "Past Perfect (گذشته کامل)", labelNative: "گذشته کامل" },
    { id: "future", label: "Future (آینده)", labelNative: "آینده" },
    { id: "subjunctive", label: "Subjunctive (التزامی)", labelNative: "التزامی" },
    { id: "imperative", label: "Imperative (امری)", labelNative: "امری" },
  ],
  persons: [
    { id: "1s", label: "I (من)", labelNative: "من" },
    { id: "2s", label: "You (تو)", labelNative: "تو" },
    { id: "3s", label: "He/She (او)", labelNative: "او" },
    { id: "1p", label: "We (ما)", labelNative: "ما" },
    { id: "2p", label: "You (pl.) (شما)", labelNative: "شما" },
    { id: "3p", label: "They (آنها)", labelNative: "آنها" },
  ],
  grammarNotes:
    "Farsi verbs have a past stem and a present stem. Conjugation is formed by adding personal endings to these stems. The infinitive ends in ـَن (-an).",
};
