import { useState, type FC, type ReactNode } from "react";
import { LuSearch } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import {
  Button,
  Checkbox,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Portal,
  RadioGroup,
  VStack,
} from "@chakra-ui/react";
import { MOCK_MAPS, MOCK_USERS } from "@/api/mock";
import { CardLarge } from "@/components/Card/Large";
import { Layout } from "@/layouts";
import type { Region } from "@/types/map";
import { REGION_JP_MAP, REGIONS } from "@/constants/map";
import { TagSearch } from "@/components/TagSearch";

const FILLED_PERCENTAGE_ITEMS: {
  value: string;
  label: string;
}[] = [
  {
    value: "none",
    label: "これからを含む（0%〜すべて）",
  },
  {
    value: "half",
    label: "半分以上埋まった（50%〜すべて）",
  },
  {
    value: "many",
    label: "ほぼ全て埋まった（90%〜すべて）",
  },
];

const filledPercentageValues = FILLED_PERCENTAGE_ITEMS.map(
  ({ value }) => value
);
type FilledPercentageValue = (typeof filledPercentageValues)[number];

const regionItems = REGIONS.map((region) => ({
  value: region,
  label: REGION_JP_MAP[region],
}));

const SectionHeading: FC<{ children: ReactNode }> = ({ children }) => (
  <Heading as="h3" color="gray.secondary" fontSize="xs" fontWeight="bold">
    {children}
  </Heading>
);

export function SearchPage() {
  const [tags, setTags] = useState<string[]>([]); // FIXME: Reflect the received array
  const [regions, setRegions] = useState<(Region | "all" | null)[]>([]);
  const [filledPercentage, setFilledPercentage] =
    useState<FilledPercentageValue>("none");
  const overrideSearchLabel = [
    !!tags.length ? tags : [],
    !!regions.length ? regions : [],
    filledPercentage != "none" ? filledPercentage : [],
  ]
    .flat()
    .join(", ");

  return (
    <Layout gap="8">
      <Drawer.Root size="full" placement="top">
        <Drawer.Trigger asChild>
          <Button
            size="xl"
            variant="outline"
            justifyContent="left"
            color="gray.focusRing"
            bg="gray.contrast"
            pl="3"
            pr="3"
            fontSize="md"
            fontWeight="normal"
            rounded="lg"
          >
            <LuSearch />
            {!!overrideSearchLabel.length
              ? overrideSearchLabel
              : "マップを検索"}
          </Button>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Positioner>
            <Drawer.Content pb="10" px="4" pt="20">
              <Drawer.Header
                p="0"
                h="14"
                pos="fixed"
                inset="0 0 auto 0"
                fontWeight="bold"
                fontSize="md"
              >
                <Drawer.Title textAlign="center">マップを検索</Drawer.Title>
              </Drawer.Header>
              <Drawer.CloseTrigger asChild>
                <IconButton
                  variant="ghost"
                  aria-label="マップの検索を閉じる"
                  pos="absolute"
                  top="2"
                  right="4"
                  _icon={{ color: "gray.fg", boxSize: 6 }}
                >
                  <IoClose />
                </IconButton>
              </Drawer.CloseTrigger>
              <Drawer.Body display="flex" flexDir="column" gap="8" p="0">
                <VStack alignItems="stretch" p="0">
                  <SectionHeading>タグ</SectionHeading>
                  <TagSearch />
                </VStack>
                <VStack alignItems="stretch" p="0">
                  <SectionHeading>マップの地域</SectionHeading>
                  <Flex flexWrap="wrap" gap="0.75rem 2rem">
                    {regionItems.map(({ value, label }) => (
                      <Checkbox.Root
                        key={value}
                        name="region"
                        colorPalette="teal"
                        value={value}
                        checked={!!regions.find((item) => item === value)}
                        onCheckedChange={() =>
                          setRegions((p) =>
                            p.find((item) => item === value)
                              ? p.filter((item) => item === value)
                              : [...p, value]
                          )
                        }
                        gap="2"
                        color="gray.fg"
                      >
                        <Checkbox.HiddenInput />
                        <Checkbox.Control />
                        <Checkbox.Label>{label}</Checkbox.Label>
                      </Checkbox.Root>
                    ))}
                  </Flex>
                </VStack>
                <VStack alignItems="stretch" p="0">
                  <SectionHeading>マップの進捗率</SectionHeading>
                  <RadioGroup.Root
                    value={filledPercentage}
                    colorPalette="teal"
                    onValueChange={({ value }) =>
                      value && setFilledPercentage(value)
                    }
                    display="flex"
                    flexWrap="wrap"
                    gap="0.75rem 2rem"
                  >
                    {FILLED_PERCENTAGE_ITEMS.map(({ value, label }) => (
                      <RadioGroup.Item key={value} value={value} gap="2">
                        <RadioGroup.ItemHiddenInput />
                        <RadioGroup.ItemIndicator />
                        <RadioGroup.ItemText>{label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </RadioGroup.Root>
                </VStack>
              </Drawer.Body>
              <Drawer.Footer p="0">
                <Drawer.CloseTrigger asChild pos="relative" inset="0">
                  <Button
                    colorPalette="teal"
                    size="xl"
                    flex="1"
                    fontWeight="bold"
                    rounded="full"
                  >
                    検索
                  </Button>
                </Drawer.CloseTrigger>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
      <Flex flexDir="column" gap="6">
        {MOCK_MAPS.filter(({ visibility }) => visibility === "public").map(
          (map) => (
            <CardLarge
              key={map.id}
              user={MOCK_USERS.find(({ id }) => id === map.userId)}
              variant="card-full"
              map={map}
            />
          )
        )}
      </Flex>
    </Layout>
  );
}
