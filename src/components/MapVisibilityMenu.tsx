import { useState, type FC } from "react";
import { LuChevronDown } from "react-icons/lu";
import { Button } from "@chakra-ui/react";
import { MenuRadioItemBase } from "@/components/MenuRadioItemBase";
import type { MapVisibility } from "@/types/map";

type Props = {
  defaultValue?: MapVisibility;
  onChange: (value: MapVisibility) => void;
};

const VISIBILITY_LIST_ITEMS = [
  {
    value: "public",
    label: "全体",
  },
  {
    value: "unlisted",
    label: "リンク限定",
  },
  {
    value: "private",
    label: "自分だけ",
  },
];

export const MapVisibilityMenu: FC<Props> = ({
  defaultValue = "public",
  onChange,
}) => {
  const [value, setValue] = useState<MapVisibility>(defaultValue);

  return (
    <MenuRadioItemBase
      value={value ?? defaultValue}
      onValueChange={(event) => {
        const typedValue = event.value as MapVisibility;

        setValue(typedValue);
        onChange(typedValue);
      }}
      radioItems={VISIBILITY_LIST_ITEMS}
      trigger={
        <Button
          variant="ghost"
          colorPalette="gray"
          gap="1"
          w="24"
          h="fit"
          color="gray.fg"
          py="3"
          px="0"
          rounded="lg"
          _icon={{
            boxSize: 4,
          }}
        >
          <LuChevronDown />
          {`${
            VISIBILITY_LIST_ITEMS.find((item) => value === item.value)?.label
          }`}
        </Button>
      }
    />
  );
};
