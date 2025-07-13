import { Link } from "react-router";
import { LuPin } from "react-icons/lu";
import { Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { MOCK_MAPS_USER_SIGN_INNED, MOCK_USER_SIGN_INNED } from "@/api/mock";
import { CardLarge } from "@/components/Card/Large";
import { CardSmall } from "@/components/Card/Small";
import { UserIcon } from "@/components/UserIcon";
import { Layout } from "@/layouts";

export function HomePage() {
  return (
    <Layout gap="8">
      <Flex as="header" gap="3">
        <Button
          asChild
          colorPalette="teal"
          size="xl"
          w="full"
          fontSize="md"
          rounded="full"
          flexShrink="1"
        >
          <Link to="/maps/new">新しいマップをつくる</Link>
        </Button>
        <Link to="/setting">
          <UserIcon user={MOCK_USER_SIGN_INNED} />
        </Link>
      </Flex>
      <Flex flexDir="column" gap="2">
        <Text
          as="span"
          display="inline-flex"
          alignItems="center"
          gap="1"
          color="gray.tertiary"
          fontWeight="bold"
          fontSize="xs"
        >
          <LuPin />
          ピンどめしたマップ
        </Text>
        <Flex flexDir="column">
          {MOCK_MAPS_USER_SIGN_INNED.filter(({ isPin }) => isPin).map((map) => (
            <CardLarge
              key={map.id}
              user={MOCK_USER_SIGN_INNED}
              map={map}
              variant="card-pin"
            />
          ))}
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap="2">
        {MOCK_MAPS_USER_SIGN_INNED.filter(({ isPin }) => !isPin).map((map) => (
          <GridItem key={map.id}>
            <CardSmall map={map} />
          </GridItem>
        ))}
      </Grid>
    </Layout>
  );
}
