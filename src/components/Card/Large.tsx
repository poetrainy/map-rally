import type { FC } from "react";
import { Card, LinkOverlay } from "@chakra-ui/react";
import {
  MapInformationBase,
  type MapInformationBaseProps,
} from "@/components/MapInformationBase";
import { Link } from "react-router";

export const CardLarge: FC<MapInformationBaseProps> = (props) => {
  return (
    <Card.Root bg="transparent" border="none">
      <LinkOverlay asChild>
        <Link to={`/maps/${props.map.id}`} />
      </LinkOverlay>
      <Card.Body p="0">
        <MapInformationBase {...props} />
      </Card.Body>
    </Card.Root>
  );
};
