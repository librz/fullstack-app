import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";

// console.log(typeof enAuthLocales, enAuthLocales);

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    // lazy load translation files into memory
    // translation file will be requested (through http) whenever it's needed
    // if you have a very large translation file (which may take some time to load over the network), you may want to use <Suspense /> and show a loading UI as fallback
    resourcesToBackend((language: string, namespace: string) => import(`@/locales/${language}/${namespace}.json`))
  )
  .init({
    fallbackLng: "en",
  });
