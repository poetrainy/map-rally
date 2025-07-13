import { useParams } from "react-router";
import { Center, Flex, Image, Separator, Text } from "@chakra-ui/react";
import { Layout } from "@/layouts";
import { getMap, getPost, getPosts, getUser } from "@/api/mock";
import { UserBanner } from "@/components/UserBanner";
import { ThumbnailGrid } from "@/components/ThumbnailGrid";
import { PREFECTURE_NAME_MAP } from "@/constants/map/prefectures";
import { Header } from "@/components/Header";

// FIXME: Place menu components
const OPTION_ITEMS = ["リンクをコピー", "報告"];
const OPTION_ITEMS_OWN = ["リンクをコピー", "編集", "削除"];

export function PostPage() {
  const { id } = useParams();
  const post = getPost(id ?? "");
  const user = getUser(getMap(post?.mapId ?? "")?.userId ?? "");
  const otherPosts = getPosts(post?.mapId ?? "").filter(
    (item) => item.id != id
  );

  if (!(post && user)) {
    return (
      <>
        ポストが見つかりませんでした。存在しないか、既に削除されている可能性があります。
      </>
    );
  }

  return (
    <Layout hasNavigation={false} pt="14" gap="5">
      <Header backLinkType="chevron">
        {PREFECTURE_NAME_MAP[post.prefecture]}{" "}
      </Header>
      <Center w="calc(100% + 2rem)" mx="-4" aspectRatio="1">
        <Image src={post.images[0]} boxSize="full" objectFit="cover" />
      </Center>
      <Flex flexDir="column" gap="1">
        <Flex gap="2" alignItems="center">
          {post.title && (
            <Text as="span" color="gray.fg" fontWeight="bold">
              {post.title}
            </Text>
          )}
          {post.place && (
            <Text
              as="span"
              color="gray.secondary"
              fontSize="xs"
              _before={{ content: "'-'", pr: 1 }}
            >
              {post.place}
            </Text>
          )}
        </Flex>
        {post.text && (
          <Text color="gray.fg" fontSize="xs">
            {post.text}
          </Text>
        )}
        <Text
          as="time"
          // @ts-ignore
          datetime={post.publishedAt}
          color="gray.secondary"
          fontSize="xs"
        >
          {new Date(post.publishedAt).toLocaleDateString("ja-JP")}
        </Text>
      </Flex>
      <UserBanner user={user} />
      <Separator />
      {otherPosts.length > 0 && (
        <Flex flexDir="column" gap="4">
          <Text color="gray.secondary" fontSize="xs" fontWeight="bold">
            このマップのポストをもっと見る
          </Text>
          <ThumbnailGrid posts={otherPosts} />
        </Flex>
      )}
    </Layout>
  );
}
