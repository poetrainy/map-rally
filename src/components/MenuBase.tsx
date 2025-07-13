import type { FC, ReactNode } from "react";
import { Menu, Portal } from "@chakra-ui/react";

type Props = Menu.RootProps & {
  items: string[];
  children: ReactNode;
};

export const MenuBase: FC<Props> = ({ items, children, ...props }) => (
  <Menu.Root {...props}>
    <Menu.Trigger asChild>{children}</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.muted"
          rounded="lg"
          boxShadow="none"
        >
          {items.map((item) => (
            <Menu.Item value={item} color="gray.fg">
              {item}
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);
