import type { FC } from "react";
import { Link, useLocation } from "react-router";
import { Card, Center, LinkOverlay, Text } from "@chakra-ui/react";
import type { Map } from "@/types/map";
import { createLevelMap } from "@/libraries/map";
import { REGION_IMAGE_MAP } from "@/components/MapInformationBase";
import type { CardProps } from "@/components/Card/Large";

type Props = CardProps & {
  map: Map;
};

export const CardSmall: FC<Props> = ({ map, from = "search" }) => {
  const { search } = useLocation();
  const RegionComponent = REGION_IMAGE_MAP[map.region];

  return (
    <Card.Root bg="transparent" border="none">
      <LinkOverlay asChild>
        {!!search.length ? (
          <Link to={{ pathname: `/maps/${map.id}`, search }} />
        ) : (
          <Link to={`/maps/${map.id}?from=${from}`} />
        )}
      </LinkOverlay>
      <Card.Body
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        gap="2"
        w="full"
        p="0"
      >
        <Center w="full" h="32" bg="gray.muted" p="1" rounded="lg">
          <RegionComponent levelMap={createLevelMap(map)} />
        </Center>
        <Text as="span" color="gray.fg" fontWeight="bold">
          {map.name}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};
