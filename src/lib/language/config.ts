import { LanguageConfig } from "./types";
import { arabicConfig } from "./arabic";
import { farsiConfig } from "./farsi";

const registry: Record<string, LanguageConfig> = {
  ar: arabicConfig,
  fa: farsiConfig,
};

export function getLanguageConfig(code: string): LanguageConfig {
  const config = registry[code];
  if (!config) {
    throw new Error(`No language config found for code: ${code}`);
  }
  return config;
}

export function getAvailableLanguages(): { code: string; name: string }[] {
  return Object.entries(registry).map(([code, config]) => ({
    code,
    name: config.name,
  }));
}
