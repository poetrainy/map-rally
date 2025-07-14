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
  Text,
  VStack,
} from "@chakra-ui/react";
import { MOCK_MAPS, MOCK_USERS } from "@/api/mock";
import { CardLarge } from "@/components/Card/Large";
import { Layout } from "@/layouts";
import type { Region } from "@/types/map";
import { REGION_JP_MAP, REGION_JP_ITEMS } from "@/constants/map";
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

const SectionHeading: FC<{ children: ReactNode }> = ({ children }) => (
  <Heading as="h3" color="gray.secondary" fontSize="xs" fontWeight="bold">
    {children}
  </Heading>
);

export function SearchPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [filledPercentage, setFilledPercentage] =
    useState<FilledPercentageValue>("none");
  const overrideSearchLabel = [
    !!tags.length ? tags.map((tag) => `#${tag}`) : [],
    !!regions.length ? regions.map((region) => REGION_JP_MAP[region]) : [],
    filledPercentage != "none"
      ? FILLED_PERCENTAGE_ITEMS.find(({ value }) => value === filledPercentage)
          ?.label
      : [],
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
            bg="gray.contrast"
            pl="3"
            pr="3"
            fontSize="md"
            fontWeight="normal"
            rounded="lg"
            css={{
              ...(!!overrideSearchLabel.length
                ? {
                    color: "gray.fg",
                  }
                : { color: "gray.focusRing" }),
            }}
            _icon={{
              color: "gray.focusRing",
            }}
          >
            <LuSearch />
            <Text
              as="span"
              w="full"
              overflow="hidden"
              whiteSpace="nowrap"
              textOverflow="ellipsis"
              textAlign="left"
            >
              {!!overrideSearchLabel.length
                ? overrideSearchLabel
                : "マップを検索"}
            </Text>
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
                  <TagSearch onChange={(tags) => setTags(tags)} />
                </VStack>
                <VStack alignItems="stretch" p="0">
                  <SectionHeading>マップの地域</SectionHeading>
                  <Flex flexWrap="wrap" gap="0.75rem 2rem">
                    {REGION_JP_ITEMS.map(({ value, label }) => (
                      <Checkbox.Root
                        key={value}
                        name="region"
                        colorPalette="teal"
                        value={value}
                        checked={regions.includes(value)}
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
