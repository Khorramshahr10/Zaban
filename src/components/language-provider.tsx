"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

interface LanguageContextValue {
  activeLanguage: string;
  languageName: string;
  setActiveLanguage: (code: string) => void;
  languages: { code: string; name: string }[];
  loading: boolean;
}

const LanguageContext = createContext<LanguageContextValue>({
  activeLanguage: "ar",
  languageName: "Arabic",
  setActiveLanguage: () => {},
  languages: [],
  loading: true,
});

const availableLanguages = [
  { code: "ar", name: "Arabic (MSA)" },
  { code: "fa", name: "Farsi (Persian)" },
];

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [activeLanguage, setActiveLanguageState] = useState("ar");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.activeLanguage) {
          setActiveLanguageState(data.activeLanguage);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const setActiveLanguage = useCallback((code: string) => {
    setActiveLanguageState(code);
    fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ activeLanguage: code }),
    });
  }, []);

  const languageName =
    availableLanguages
      .find((l) => l.code === activeLanguage)
      ?.name.split(" (")[0] ?? activeLanguage;

  return (
    <LanguageContext.Provider
      value={{
        activeLanguage,
        languageName,
        setActiveLanguage,
        languages: availableLanguages,
        loading,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
