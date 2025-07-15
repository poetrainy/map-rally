import type { FC, ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { Image, Grid, GridItem } from "@chakra-ui/react";
import type { Post } from "@/types/map";

type Props = { posts: Post[]; children?: ReactNode };

export const ThumbnailGrid: FC<Props> = ({ posts, children }) => {
  const { search } = useLocation();

  return (
    <Grid
      templateColumns={{ base: "repeat(3, 1fr)", sm: "repeat(4, 1fr)" }}
      gap="2"
    >
      {children}
      {posts.map(({ id, publishedAt, images, title }, i) => {
        const label =
          title ??
          `${new Date(publishedAt).toLocaleDateString("ja-JP")}のポスト`;

        return (
          <GridItem
            asChild
            key={i}
            boxSize="full"
            bg="gray.secondary"
            aspectRatio="1"
            rounded="lg"
            overflow="hidden"
          >
            <Link to={{ pathname: `/posts/${id}`, search }} aria-label={label}>
              <Image
                src={images[0]}
                alt={label}
                boxSize="full"
                objectFit="cover"
              />
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
};
