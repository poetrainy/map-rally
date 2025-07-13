import type { FC } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Center, Image, type CenterProps } from "@chakra-ui/react";
import type { User } from "@/types/user";

type Props = CenterProps & { user: User };

export const UserIcon: FC<Props> = ({ user, ...props }) => (
  <Center
    flex="none"
    boxSize="12"
    bg="gray.contrast"
    rounded="full"
    overflow="hidden"
    _icon={{ boxSize: "full", color: "gray.focusRing" }}
    {...props}
  >
    {!!user.icon ? <Image src={user.icon} alt={user.id} /> : <FaUserCircle />}
  </Center>
);
