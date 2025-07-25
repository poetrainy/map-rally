import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { LuPlus, LuRepeat } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {
  Box,
  Button,
  Center,
  Dialog,
  Flex,
  Input,
  Portal,
} from "@chakra-ui/react";
import type { MapEdit, MapVisibility, Region } from "@/types/map";
import { REGION_IMAGE_MAP } from "@/components/MapInformationBase";
import { MenuRadioItemBase } from "@/components/MenuRadioItemBase";
import { TagSearch } from "@/components/TagSearch";
import { Tag } from "@/components/Tag";
import { REGION_JP_ITEMS } from "@/constants/map";

type Props = {
  data?: {
    name: string;
    description?: string;
    region: Region;
    tags?: string[];
    visibility?: MapVisibility;
  };
  onChange?: (data: MapEdit) => void;
};

export const MapEditable: FC<Props> = ({ data, onChange }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState<Region>();
  const [dialogTags, setDialogTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(data?.tags ?? []);
  const [visibility, _setVisibility] = useState<MapVisibility>(
    data?.visibility ?? "public"
  );

  const RegionComponent =
    REGION_IMAGE_MAP[region ?? data?.region ?? "hokkaido-tohoku"];

  useEffect(() => {
    if (!region) {
      return;
    }

    onChange?.({ name: name ?? "", description, region, tags, visibility });
  }, [name, description, region, tags, visibility]);

  return (
    <Box flex="1">
      <Input
        name="name"
        value={!!name.length ? name : data?.name}
        variant="flushed"
        placeholder="名前を入力"
        color="gray.fg"
        fontWeight="bold"
        fontSize="2xl"
        textAlign="left"
        mb="2"
        _placeholder={{
          color: "gray.emphasized",
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setName(event.target.value)
        }
      />
      <Input
        name="description"
        value={!!description.length ? description : data?.description}
        variant="flushed"
        placeholder="説明を入力"
        size="xs"
        w="full"
        color="gray.fg"
        fontSize="md"
        mb="6"
        _placeholder={{
          color: "gray.emphasized",
        }}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          setDescription(event.target.value)
        }
      />
      <Center
        w="full"
        h="72"
        mb="1"
        _icon={{ boxSize: "full", objectFit: "contain" }}
      >
        <RegionComponent />
      </Center>
      <Center mb="4">
        <MenuRadioItemBase
          value={region ?? data?.region}
          onValueChange={(event) => setRegion(event.value as Region)}
          radioItems={REGION_JP_ITEMS}
          trigger={
            <Button
              variant="plain"
              colorPalette="gray"
              gap="1"
              boxSize="fit"
              color="gray.secondary"
              py="0.5"
              px="1"
              fontSize="xs"
              fontWeight="bold"
              _icon={{
                boxSize: 3,
              }}
            >
              <LuRepeat />
              マップを変更
            </Button>
          }
        />
      </Center>
      <Flex gap="2" justifyContent="flex-end" flexWrap="wrap" w="full">
        <Dialog.Root
          size="xs"
          placement="center"
          onOpenChange={(event) =>
            !event.open && setTags((p) => [...new Set([...p, ...dialogTags])])
          }
        >
          <Dialog.Trigger asChild>
            <Tag
              {...(!!tags.length
                ? { variant: "icon" }
                : { "aria-label": "タグを追加" })}
            >
              <LuPlus />
              {!tags.length && <>タグを追加</>}
            </Tag>
          </Dialog.Trigger>
          <Dialog.Backdrop />
          <Portal>
            <Dialog.Positioner>
              <Dialog.Content
                gap="3"
                maxW="90vw"
                py="6"
                px="4"
                rounded="2xl"
                boxShadow="none"
              >
                <Dialog.Header flexDir="column" gap="1" p="0">
                  <Dialog.Title>タグを追加</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body p="0">
                  <TagSearch onChange={(tags) => setDialogTags(tags)} />
                </Dialog.Body>
                <Dialog.Footer p="0">
                  <Dialog.CloseTrigger asChild pos="relative" inset="auto">
                    <Button colorPalette="teal" h="10" px="5">
                      保存
                    </Button>
                  </Dialog.CloseTrigger>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
        {tags.map((tag) => (
          <Tag
            key={tag}
            onClick={() => setTags((p) => p.filter((item) => item != tag))}
          >
            <IoClose />
            {tag}
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};
