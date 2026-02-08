"use client";

import { useLanguage } from "@/components/language-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LanguageSwitcher() {
  const { activeLanguage, setActiveLanguage, languages } = useLanguage();

  return (
    <Select value={activeLanguage} onValueChange={setActiveLanguage}>
      <SelectTrigger className="w-[160px] h-8 text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
