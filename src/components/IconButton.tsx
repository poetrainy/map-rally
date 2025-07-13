import {
  IconButton as ChakraUIIconButton,
  type IconButtonProps,
} from "@chakra-ui/react";
import type { FC } from "react";

export const IconButton: FC<IconButtonProps> = (props) => (
  <ChakraUIIconButton
    variant="ghost"
    colorPalette="gray"
    size="xs"
    _icon={{ boxSize: 6 }}
    {...props}
  />
);
