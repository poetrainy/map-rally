import { Link, useParams } from "react-router";
import { getMap, getPosts, getUser, MOCK_USER_SIGN_INNED } from "@/api/mock";
import { Flex, GridItem } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { Layout } from "@/layouts";
import { MapInformationBase } from "@/components/MapInformationBase";
import { ThumbnailGrid } from "@/components/ThumbnailGrid";
import { UserBanner } from "@/components/UserBanner";

export function MapPage() {
  const { id } = useParams();
  const map = getMap(id ?? "");
  const user = getUser(map?.userId ?? "");
  const posts = getPosts(map?.id ?? "");

  if (!(map && user)) {
    return (
      <>
        マップが見つかりませんでした。存在しないか、既に削除されている可能性があります。
      </>
    );
  }

  return (
    <Layout>
      <Flex flex="none" flexDir="column" gap="8">
        <MapInformationBase map={map} />
        <ThumbnailGrid posts={posts}>
          {user.id === MOCK_USER_SIGN_INNED.id && (
            <GridItem
              asChild
              aria-label="ポストを作成"
              display="flex"
              justifyContent="center"
              alignItems="center"
              w="full"
              bg="gray.fg"
              aspectRatio="1"
              rounded="lg"
              _icon={{ color: "gray.contrast", boxSize: 8 }}
            >
              <Link to="">
                <LuPlus />
              </Link>
            </GridItem>
          )}
        </ThumbnailGrid>
        <UserBanner user={user} />
      </Flex>
    </Layout>
  );
}
