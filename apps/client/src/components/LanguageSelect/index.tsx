import { Group, Image, Text, Combobox, useCombobox, InputBase, Input, Flex } from "@mantine/core";
import { LOCALE_CONFIGS, SupportedLocaleType, useLanguage } from "@/hooks/useLanguage";
import { IconCheck, IconWorld } from "@tabler/icons-react";

export function LanguageSelect() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [curLocale, setCurLocale] = useLanguage();

  const options = LOCALE_CONFIGS.map((item) => (
    <Combobox.Option value={item.locale} key={item.locale}>
      <Flex justify="space-between">
        <Group>
          <Image alt={item.locale} src={item.imgSrc} h="24px" w="auto" radius="sm" />
          <div>
            <Text size="sm">{item.name}</Text>
          </div>
        </Group>
        {item.locale === curLocale && <IconCheck />}
      </Flex>
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val: SupportedLocaleType) => {
        setCurLocale(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          pointer
          w={180}
          leftSection={<IconWorld />}
          rightSection={<Combobox.Chevron />}
          onClick={() => combobox.toggleDropdown()}
        >
          {curLocale ? (
            LOCALE_CONFIGS.find((it) => it.locale === curLocale)?.name
          ) : (
            <Input.Placeholder>Pick your language</Input.Placeholder>
          )}
        </InputBase>
      </Combobox.Target>
      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
