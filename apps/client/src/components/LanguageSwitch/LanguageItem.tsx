import { FC } from "react";
import { Flex, Group, Image, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

interface IProps {
  selected: boolean;
  name: string;
  imgSrc: string;
  onClick: () => void;
}

const LanguageItem: FC<IProps> = ({ selected, name, imgSrc, onClick }) => {
  return (
    <Flex
      w={200}
      justify="space-between"
      py="sm"
      px="md"
      className="border rounded-sm cursor-pointer hover:bg-gray-50"
      onClick={onClick}
    >
      <Group align="center" gap="xs">
        <Image src={imgSrc} h="24px" />
        <Text fz="md">{name}</Text>
      </Group>
      {selected && <IconCheck />}
    </Flex>
  );
};

export { LanguageItem };
