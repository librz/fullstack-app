import { FC } from "react";
import { Flex } from "@mantine/core";
import { LOCALE_CONFIGS, useLanguage } from "@/hooks/useLanguage";
import { LanguageItem } from "./LanguageItem";

const LanguageSwitch: FC = () => {
  const [curLocale, setCurLocale] = useLanguage();
  return (
    <div>
      <Flex py="md" gap="md" wrap="wrap">
        {LOCALE_CONFIGS.map((it) => (
          <LanguageItem
            key={it.locale}
            selected={it.locale === curLocale}
            imgSrc={it.imgSrc}
            name={it.name}
            onClick={() => {
              setCurLocale(it.locale);
            }}
          />
        ))}
      </Flex>
    </div>
  );
};

export { LanguageSwitch };
