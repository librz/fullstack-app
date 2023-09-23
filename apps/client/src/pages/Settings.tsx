import { FC } from "react";
import { Title } from "@mantine/core";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { useTranslation } from "react-i18next";

const Settings: FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Title order={3}>{t("settings.lang")}</Title>
      <LanguageSwitch />
    </div>
  );
};

export { Settings };
