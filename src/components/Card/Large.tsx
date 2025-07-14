import type { FC } from "react";
import { Card, LinkOverlay } from "@chakra-ui/react";
import {
  MapInformationBase,
  type MapInformationBaseProps,
} from "@/components/MapInformationBase";
import { Link } from "react-router";

export type CardProps = {
  from?: "home" | "search";
};

type Props = MapInformationBaseProps & CardProps;

export const CardLarge: FC<Props> = ({ from = "search", ...props }) => {
  return (
    <Card.Root bg="transparent" border="none">
      <LinkOverlay asChild>
        <Link to={`/maps/${props.map.id}?from=${from}`} />
      </LinkOverlay>
      <Card.Body p="0">
        <MapInformationBase {...props} />
      </Card.Body>
    </Card.Root>
  );
};
