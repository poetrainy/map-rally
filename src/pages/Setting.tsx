import { Link } from "react-router";
import { LuBookmark, LuMap } from "react-icons/lu";
import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import { MOCK_USER_SIGN_INNED } from "@/api/mock";
import { UserIcon } from "@/components/UserIcon";
import { Layout } from "@/layouts";
import { useColorMode } from "@/components/ui/color-mode";

const BUTTON_ITEMS = [
  { label: "自分の投稿", path: "", Icon: LuMap },
  { label: "ブックマーク", path: "", Icon: LuBookmark },
];

const SETTING_ITEMS = [
  {
    label: "ユーザー設定",
    path: "",
  },
  {
    label: "いいねしたマップ",
    path: "",
  },
  {
    label: "ブロックしたユーザー",
    path: "",
  },
  {
    label: "お問い合わせ",
    path: "",
  },
];

export function Setting() {
  const { toggleColorMode } = useColorMode();

  return (
    <Layout gap="8">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex alignItems="center" gap="3">
          <UserIcon user={MOCK_USER_SIGN_INNED} boxSize="16" />
          <VStack alignItems="flex-start" gap="0.5" p="0">
            <Text as="span" fontSize="xl" fontWeight="bold">
              {MOCK_USER_SIGN_INNED.name}
            </Text>
            <Text as="span" color="gray.secondary" fontSize="xs">
              {MOCK_USER_SIGN_INNED.email}
            </Text>
          </VStack>
        </Flex>
        <Text
          asChild
          as="span"
          color="gray.fg"
          bg="gray.contrast"
          px="4"
          py="1"
          borderStyle="solid"
          borderWidth="1px"
          borderColor="gray.muted"
          rounded="full"
          fontWeight="bold"
          fontSize="xs"
        >
          <Link to="">プロフィール設定</Link>
        </Text>
      </Flex>
      <Flex as="ul" gap="3">
        {BUTTON_ITEMS.map(({ label, path, Icon }) => (
          <Flex asChild flexDir="column" alignItems="center" gap="1">
            <Link to={path}>
              <Center
                boxSize="20"
                p="0"
                bg="gray.contrast"
                rounded="lg"
                borderColor="gray.muted"
                borderWidth="1px"
                borderStyle="solid"
                _icon={{ color: "gray.fg", boxSize: 8 }}
              >
                <Icon />
              </Center>
              <Text as="span" color="gray.fg" fontWeight="bold" fontSize="xs">
                {label}
              </Text>
            </Link>
          </Flex>
        ))}
      </Flex>
      <VStack as="ul" gap="0">
        {SETTING_ITEMS.map(({ label, path }) => (
          <Text
            asChild
            display="inline-flex"
            alignItems="center"
            w="full"
            h="16"
            color="gray.fg"
            css={{
              "&:not(:last-child)": {
                borderBottomColor: "gray.muted",
                borderBottomWidth: "1px",
                borderBottomStyle: "solid",
              },
            }}
          >
            <Link to={path}>{label}</Link>
          </Text>
        ))}
      </VStack>
      <Text
        as="button"
        onClick={toggleColorMode}
        color="gray.secondary"
        fontWeight="bold"
      >
        カラーモード切替
      </Text>
    </Layout>
  );
}
