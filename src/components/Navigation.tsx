import type { FC } from "react";
import { NavLink } from "react-router";
import { LuFootprints, LuMap, LuUser } from "react-icons/lu";
import type { IconType } from "react-icons";
import { Box, Flex, Text } from "@chakra-ui/react";

type Path = "/" | "/search" | "/setting";

export type NavigationProps = {
  overrideStyle?: Path | null;
};

const NAVIGATION_ITEMS: {
  label: string;
  path: Path;
  Icon: IconType;
}[] = [
  {
    label: "つくる",
    path: "/",
    Icon: LuMap,
  },
  {
    label: "めぐる",
    path: "/search",
    Icon: LuFootprints,
  },
  {
    label: "ユーザー",
    path: "/setting",
    Icon: LuUser,
  },
];

export const Navigation: FC<NavigationProps> = ({ overrideStyle = null }) => (
  <Flex
    as="nav"
    justifyContent="center"
    gap="8"
    h="20"
    bg="gray.contrast"
    py="2"
    borderTopColor="gray.muted"
    borderTopWidth="1px"
    borderTopStyle="solid"
    pos="fixed"
    inset="auto 0 0 0"
  >
    {NAVIGATION_ITEMS.map(({ label, path, Icon }) => (
      <Box
        asChild
        key={path}
        display="inline-flex"
        alignItems="center"
        flexDir="column"
        gap="1"
        w="20"
        h="14"
        py="2"
        _icon={{
          boxSize: 6,
        }}
        zIndex={10}
      >
        <NavLink to={path}>
          {({ isActive }) => (
            <>
              <Box
                asChild
                css={{
                  ...(overrideStyle === path ||
                  (overrideStyle === null && isActive)
                    ? {
                        color: { _light: "teal.600", _dark: "teal.500" },
                      }
                    : {
                        color: "gray.fg",
                      }),
                }}
              >
                <Icon />
              </Box>
              <Text
                as="span"
                fontSize="0.625rem"
                fontWeight="bold"
                lineHeight="1.2"
                css={{
                  ...(overrideStyle === path ||
                  (overrideStyle === null && isActive)
                    ? {
                        color: { _light: "teal.600", _dark: "teal.500" },
                      }
                    : {
                        color: "gray.fg",
                      }),
                }}
              >
                {label}
              </Text>
            </>
          )}
        </NavLink>
      </Box>
    ))}
  </Flex>
);
