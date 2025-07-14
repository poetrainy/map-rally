import { useEffect, useState, type ChangeEvent, type FC } from "react";
import { LuChevronDown, LuPlus } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {
  Box,
  Button,
  Center,
  Dialog,
  Flex,
  Input,
  Portal,
  Text,
  VStack,
} from "@chakra-ui/react";
import type { MapEdit, MapVisibility, Region } from "@/types/map";
import { REGION_IMAGE_MAP } from "@/components/MapInformationBase";
import { MenuRadioItemBase } from "@/components/MenuRadioItemBase";
import { TagSearch } from "@/components/TagSearch";
import { Tag } from "@/components/Tag";

type Props = {
  data?: {
    name?: string;
    description?: string;
    region?: Region | "all";
    tags?: string[];
    visibility?: MapVisibility;
  };
  onChange?: (data: MapEdit) => void;
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

export const MapEditable: FC<Props> = ({ data, onChange }) => {
  const [name, setName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);
  const [region, _setRegion] = useState<Region | "all">(data?.region ?? "all");
  const [dialogTags, setDialogTags] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>(data?.tags ?? []);
  const [visibility, setVisibility] = useState<MapVisibility>(
    data?.visibility ?? "public"
  );

  const RegionComponent = REGION_IMAGE_MAP[region];

  useEffect(
    () =>
      onChange?.({ name: name ?? "", description, region, tags, visibility }),
    [name, description, region, tags, visibility]
  );

  // FIXME: Region change button
  return (
    <Box flex="1">
      <Input
        name="name"
        value={name}
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
        value={description}
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
        h="64"
        mb="2"
        _icon={{ boxSize: "full", objectFit: "contain" }}
      >
        <RegionComponent />
      </Center>
      <Flex gap="2" justifyContent="flex-end" flexWrap="wrap" w="full" mb="6">
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
                  <Dialog.CloseTrigger pos="relative" inset="auto">
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
      <VStack gap="1" p="0">
        <Text as="span" color="gray.secondary" fontSize="xs" fontWeight="bold">
          公開範囲
        </Text>
        <MenuRadioItemBase
          value={visibility}
          onValueChange={(event) => setVisibility(event.value as MapVisibility)}
          radioItems={VISIBILITY_LIST_ITEMS}
          trigger={
            <Button
              variant="outline"
              colorPalette="gray"
              gap="1"
              h="fit"
              color="gray.fg"
              bg="gray.contrast"
              py="3"
              rounded="lg"
              _icon={{
                boxSize: 4,
              }}
            >
              <LuChevronDown />
              {
                VISIBILITY_LIST_ITEMS.find(({ value }) => value === visibility)
                  ?.label
              }
            </Button>
          }
        />
      </VStack>
      {/* <ButtonGroup w="full">
        <Button
          variant="outline"
          colorPalette="gray"
          size="xl"
          color="gray.secondary"
          bg="gray.contrast"
          fontWeight="bold"
          rounded="full"
          borderColor="gray.tertiary"
          borderWidth="2px"
        >
          下書き保存
        </Button>
        <Button flex="1" size="xl" fontWeight="bold" rounded="full">
          公開
        </Button>
      </ButtonGroup> */}
    </Box>
  );
};
