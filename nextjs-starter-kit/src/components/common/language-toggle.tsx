"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "@/lib/i18n";

export function LanguageToggle() {
  const { locale, setLocale, availableLocales } = useTranslations();

  const languages = {
    en: { name: "English", flag: "🇺🇸" },
    tr: { name: "Türkçe", flag: "🇹🇷" },
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLocales.map(loc => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className={locale === loc ? "bg-accent" : ""}
          >
            <span className="mr-2">{languages[loc].flag}</span>
            <span>{languages[loc].name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
