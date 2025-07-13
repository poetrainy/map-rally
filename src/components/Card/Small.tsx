import type { FC } from "react";
import { Card, Center, LinkOverlay, Text } from "@chakra-ui/react";
import type { Map } from "@/types/map";
import { levelMap } from "@/libraries/map";
import { REGION_IMAGE_MAP } from "@/components/MapInformationBase";
import { Link } from "react-router";

type Props = {
  map: Map;
};

export const CardSmall: FC<Props> = ({ map }) => {
  const RegionComponent = REGION_IMAGE_MAP[map.region];

  return (
    <Card.Root bg="transparent" border="none">
      <LinkOverlay asChild>
        <Link to={`/maps/${map.id}`} />
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
          <RegionComponent levelMap={levelMap(map)} />
        </Center>
        <Text as="span" color="gray.fg" fontWeight="bold">
          {map.name}
        </Text>
      </Card.Body>
    </Card.Root>
  );
};
