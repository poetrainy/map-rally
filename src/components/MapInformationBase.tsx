import { useState, type FC } from "react";
import { LuBookmark, LuEllipsis, LuLink, LuLock } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
import {
  Box,
  Center,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import Map, { type LevelMap } from "@/components/MapImage";
import { createLevelMap } from "@/libraries/map";
import type { User } from "@/types/user";
import type { Map as MapType, Region } from "@/types/map";
import { getPost, MOCK_USER_SIGN_INNED } from "@/api/mock";
import { UserBanner } from "@/components/UserBanner";
import { MenuBase } from "@/components/MenuBase";
import { IconButton } from "@/components/IconButton";

type CardVariant = "card-full" | "card-pin" | "page";

export type MapInformationBaseProps = {
  map: MapType;
  user?: User;
  variant?: CardVariant;
};

const THUMBNAIL_LENGTH = 3;

const SHOW_CARD_DATA_MAP: Record<
  CardVariant,
  { user: boolean; options: boolean; thumbnails: boolean }
> = {
  "card-full": {
    user: true,
    options: false,
    thumbnails: true,
  },
  "card-pin": {
    user: false,
    options: false,
    thumbnails: true,
  },
  page: {
    user: false,
    options: true,
    thumbnails: false,
  },
};

const OPTION_ITEMS = ["リンクをコピー", "報告"];
const OPTION_ITEMS_OWN = ["トップにピンどめ", "リンクをコピー", "編集", "削除"];

export const REGION_IMAGE_MAP: Record<Region, FC<{ levelMap?: LevelMap }>> = {
  "hokkaido-tohoku": Map.HokkaidoTohoku,
  kanto: Map.Kanto,
  chubu: Map.Chubu,
  kinki: Map.Kinki,
  chugoku: Map.Chugoku,
  shikoku: Map.Shikoku,
  "kyushu-okinawa": Map.KyushuOkinawa,
};

export const MapInformationBase: FC<MapInformationBaseProps> = ({
  map,
  user = undefined,
  variant = "page",
}) => {
  const [open, setOpen] = useState(false);
  const showCardData = SHOW_CARD_DATA_MAP[variant];
  const RegionComponent = REGION_IMAGE_MAP[map.region];

  return (
    <Box>
      <Flex flexDir="column" alignItems="stretch" mb="2" p="0">
        {showCardData.user && !!user && <UserBanner user={user} size="sm" />}
        <Flex justifyContent="space-between" alignItems="center" gap="4">
          <Heading
            as="h2"
            color="gray.fg"
            lineHeight="2rem"
            _icon={{ display: "inline", color: "gray.secondary", pl: 1 }}
          >
            <Text as="span">{map.name}</Text>
            {map.visibility === "private" && <LuLock />}
            {map.visibility === "unlisted" && <LuLink />}
          </Heading>
          {showCardData.options && (
            <Flex flex="none" gap="1">
              <IconButton
                aria-label={
                  MOCK_USER_SIGN_INNED.likedMapIds.find((id) => id === map.id)
                    ? "ブックマークから削除"
                    : "ブックマークに追加"
                }
              >
                <LuBookmark />
              </IconButton>
              <MenuBase
                items={
                  MOCK_USER_SIGN_INNED.id === map.userId
                    ? OPTION_ITEMS_OWN
                    : OPTION_ITEMS
                }
                onOpenChange={(event) => setOpen(event.open)}
              >
                <IconButton
                  aria-label={open ? "メニューを閉じる" : "メニューを開く"}
                >
                  <LuEllipsis />
                </IconButton>
              </MenuBase>
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex alignItems="center" w="full" p="0">
        <Center w="full" h="64">
          <RegionComponent levelMap={createLevelMap(map)} />
        </Center>
        {showCardData.thumbnails && (
          <VStack gap="1" w="20" p="0" flex="none">
            {[...Array(THUMBNAIL_LENGTH).keys()].map((i) => {
              const thumbnail = getPost(map.posts[i])?.images[0];

              return (
                <Center
                  key={thumbnail ?? i}
                  w="full"
                  aspectRatio="1"
                  bg="gray.muted"
                  rounded="md"
                  overflow="hidden"
                  _icon={{
                    boxSize: 6,
                    color: "gray.contrast",
                  }}
                  css={{
                    ...(!thumbnail && {
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "gray.emphasized",
                    }),
                  }}
                >
                  {!!thumbnail ? (
                    <Image src={thumbnail} boxSize="full" objectFit="cover" />
                  ) : (
                    <FaImage />
                  )}
                </Center>
              );
            })}
          </VStack>
        )}
      </Flex>
      <Flex
        justifyContent="flex-end"
        flexWrap="wrap"
        gap="0 0.5rem"
        mt="3"
        p="0"
      >
        {map.tags.map((tag) => (
          <Text
            key={tag}
            as="span"
            color="gray.secondary"
            fontSize="xs"
            fontWeight="bold"
          >
            {`#${tag}`}
          </Text>
        ))}
      </Flex>
    </Box>
  );
};
