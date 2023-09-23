import { Dispatch, SetStateAction, useState } from "react"
import { useTranslation } from "react-i18next";
import { useUpdateEffect } from "react-use";
import EN from "@/assets/flags/GB.svg";
import CN from "@/assets/flags/CN.svg";

export const SupportedLocales = ["en", "zh-CN"] as const;

export type SupportedLocaleType = (typeof SupportedLocales)[number];

export const LOCALE_CONFIGS: Array<{
  locale: SupportedLocaleType;
  name: string;
  imgSrc: string;
}> = [
    {
      locale: "en",
      name: "English",
      imgSrc: EN,
    },
    {
      locale: "zh-CN",
      name: "中文(简体)",
      imgSrc: CN,
    },
  ];

export function useLanguage(): [
  SupportedLocaleType,
  Dispatch<SetStateAction<SupportedLocaleType>>
] {
  const { i18n } = useTranslation();

  const [curLocale, setCurLocale] = useState<SupportedLocaleType>(() => {
    if (i18n.language.startsWith("zh")) return "zh-CN";
    return "en";
  });

  useUpdateEffect(() => {
    i18n.changeLanguage(curLocale)
  }, [curLocale]);

  return [curLocale, setCurLocale]
}