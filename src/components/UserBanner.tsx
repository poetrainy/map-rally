import type { FC } from "react";
import { Link, useLocation } from "react-router";
import { Flex, Text } from "@chakra-ui/react";
import { UserIcon } from "@/components/UserIcon";
import type { User } from "@/types/user";

type Props = {
  user: User;
  size?: "sm" | "md";
};

export const UserBanner: FC<Props> = ({ user, size = "md" }) => {
  const { search } = useLocation();

  return (
    <Flex asChild alignItems="center" gap="2">
      <Link to={{ pathname: `/users/${user.id}`, search }}>
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
};
