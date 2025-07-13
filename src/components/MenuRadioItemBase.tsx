import type { FC, ReactNode } from "react";
import { Menu, Portal } from "@chakra-ui/react";

type Props = Menu.RadioItemGroupProps & {
  radioItems: { value: string; label: string }[];
  trigger: ReactNode;
};

export const MenuRadioItemBase: FC<Props> = ({
  trigger,
  radioItems,
  ...props
}) => (
  <Menu.Root positioning={{ placement: "top" }}>
    <Menu.Trigger asChild>{trigger}</Menu.Trigger>
    <Portal>
      <Menu.Positioner>
        <Menu.Content
          borderWidth="1px"
          borderStyle="solid"
          borderColor="gray.muted"
          rounded="lg"
          boxShadow="none"
        >
          <Menu.RadioItemGroup {...props}>
            {radioItems.map(({ value, label }) => (
              <Menu.RadioItem key={value} value={value} color="gray.fg">
                <Menu.ItemIndicator />
                {label}
              </Menu.RadioItem>
            ))}
          </Menu.RadioItemGroup>
        </Menu.Content>
      </Menu.Positioner>
    </Portal>
  </Menu.Root>
);
