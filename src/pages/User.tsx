import { useParams } from "react-router";
import { Flex, Grid, GridItem, Heading, IconButton } from "@chakra-ui/react";
import { Layout } from "@/layouts";
import { UserIcon } from "@/components/UserIcon";
import { getMaps, getUser, MOCK_USER_SIGN_INNED } from "@/api/mock";
import { MenuBase } from "@/components/MenuBase";
import { LuEllipsis } from "react-icons/lu";
import { useState } from "react";
import { CardSmall } from "@/components/Card/Small";

const OPTION_ITEMS = ["リンクをコピー", "ブロック", "報告"];
const OPTION_ITEMS_OWN = ["リンクをコピー"];

export function UserPage() {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const user = getUser(id ?? "");
  const maps = getMaps(id ?? "").filter(
    ({ visibility }) => visibility === "public"
  );

  if (!(user && maps)) {
    return (
      <>
        ユーザーが見つかりませんでした。存在しないか、既に削除されている可能性があります。
      </>
    );
  }

  return (
    <Layout gap="6">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap="3">
          <UserIcon user={user} boxSize="16" />
          <Heading as="h2" color="gray.fg" fontSize="lg" fontWeight="bold">
            {user.name}
          </Heading>
        </Flex>
        <MenuBase
          items={
            MOCK_USER_SIGN_INNED.id === id ? OPTION_ITEMS_OWN : OPTION_ITEMS
          }
          onOpenChange={(event) => setOpen(event.open)}
        >
          <IconButton
            flex="none"
            variant="ghost"
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            boxSize="8"
            _icon={{ boxSize: 6 }}
          >
            <LuEllipsis />
          </IconButton>
        </MenuBase>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap="1rem 0.5rem">
        {maps.map((map) => (
          <GridItem key={map.id}>
            <CardSmall map={map} from="home" />
          </GridItem>
        ))}
      </Grid>
    </Layout>
  );
}
