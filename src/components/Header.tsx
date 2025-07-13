import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router";
import { LuChevronLeft } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { Center, IconButton } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  backLinkType?: "chevron" | "close" | null;
  rightElement?: ReactNode;
};

export const Header: FC<Props> = ({
  children,
  backLinkType = null,
  rightElement,
}) => {
  const navigate = useNavigate();

  return (
    <Center
      as="header"
      h="14"
      bg="gray.contrast"
      pos="fixed"
      inset="0 0 auto 0"
      fontWeight="bold"
      fontSize="md"
      zIndex={10}
    >
      {backLinkType === "chevron" && (
        <IconButton
          variant="ghost"
          aria-label="前のページに戻る"
          pos="absolute"
          left="4"
          onClick={() => navigate(-1)}
          _icon={{ boxSize: 7 }}
        >
          <LuChevronLeft />
        </IconButton>
      )}
      {children}
      {rightElement}
      {!rightElement && backLinkType === "close" && (
        <IconButton
          variant="ghost"
          aria-label="前のページに戻る"
          pos="absolute"
          right="4"
          onClick={() => navigate(-1)}
          _icon={{ boxSize: 6 }}
        >
          <IoClose />
        </IconButton>
      )}
    </Center>
  );
};
