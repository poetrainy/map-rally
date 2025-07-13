import type { FC } from "react";
import { Link } from "react-router";
import { Flex, Text } from "@chakra-ui/react";
import { UserIcon } from "@/components/UserIcon";
import type { User } from "@/types/user";

type Props = { user: User; size?: "sm" | "md" };

export const UserBanner: FC<Props> = ({ user, size = "md" }) => (
  <Flex asChild alignItems="center" gap="2">
    <Link to="">
      <UserIcon user={user} boxSize={size === "md" ? 8 : 6} />
      <Text
        as="span"
        color="gray.fg"
        fontWeight="bold"
        fontSize={size === "md" ? "sm" : "xs"}
      >
        {user.name}
      </Text>
    </Link>
  </Flex>
);
