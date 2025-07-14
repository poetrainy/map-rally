import type { FC } from "react";
import { type CenterProps, Center } from "@chakra-ui/react";

export const Tag: FC<CenterProps & { variant?: "icon" | "text" }> = ({
  variant = "text",
  ...props
}) => (
  <Center
    as="button"
    flex="none"
    gap="1"
    h="7"
    color="gray.secondary"
    bg="gray.muted"
    rounded="full"
    fontSize="xs"
    fontWeight="bold"
    _icon={{ boxSize: 4, color: "gray.tertiary" }}
    css={{
      ...(variant === "icon" ? { w: 7, p: 0 } : { w: "fit", pl: 3, pr: 4 }),
    }}
    {...props}
  />
);
