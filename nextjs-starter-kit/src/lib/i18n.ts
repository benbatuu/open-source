"use client";

import { useState, useEffect } from "react";
import enTranslations from "@/locales/en.json";
import trTranslations from "@/locales/tr.json";

type Locale = "en" | "tr";

const translations = {
  en: enTranslations,
  tr: trTranslations,
};

type TranslationKeys = typeof enTranslations;

// Helper type to get nested keys
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

type TranslationKey = NestedKeyOf<TranslationKeys>;

export function useTranslations(locale: Locale = "en") {
  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);

  useEffect(() => {
    const savedLocale = localStorage.getItem("locale") as Locale;
    if (savedLocale && (savedLocale === "en" || savedLocale === "tr")) {
      setCurrentLocale(savedLocale);
    }
  }, []);

  const t = (
    key: TranslationKey,
    params?: Record<string, string | number>
  ): string => {
    const keys = key.split(".");
    let value: unknown = translations[currentLocale];

    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }

    if (typeof value !== "string") {
      console.warn(
        `Translation key "${key}" not found for locale "${currentLocale}"`
      );
      return key;
    }

    // Replace parameters in the translation
    if (params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  const setLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  return {
    t,
    locale: currentLocale,
    setLocale,
    availableLocales: ["en", "tr"] as const,
  };
}

export function getTranslations(locale: Locale = "en") {
  return translations[locale];
}
