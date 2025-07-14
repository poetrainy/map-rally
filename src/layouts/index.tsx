import type { ReactNode } from "react";
import { Box, type BoxProps } from "@chakra-ui/react";
import { Navigation } from "@/components/Navigation";

export function Layout({
  children,
  hasNavigation = true,
  ...props
}: { children: ReactNode; hasNavigation?: boolean } & BoxProps) {
  return (
    <>
      <Box
        as="main"
        display="flex"
        flexDir="column"
        w="100dvw"
        maxW="40rem"
        mx="auto"
        pt="6"
        px="4"
        pb="28"
        {...props}
      >
        {children}
      </Box>
      {hasNavigation && <Navigation />}
    </>
  );
}
