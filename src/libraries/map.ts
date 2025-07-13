import { getPost } from "@/api/mock";
import { PREFECTURES } from "@/constants/map";
import type { Level, Map, Prefecture, Region } from "@/types/map";

export const levelMap: (map: Map) => Record<Prefecture<Region>, Level> = (
  map: Map
) => {
  const region = map.region;
  const prefectureMap = Object.fromEntries(
    // FIXME: Type error
    PREFECTURES[region].map((prefecture: Prefecture<typeof region>) => {
      const postLength = map.posts.filter(
        (post) => getPost(post)?.prefecture === prefecture
      ).length;

      return [
        prefecture,
        (postLength < 1
          ? "plain"
          : postLength < 2
          ? "level1"
          : postLength < 3
          ? "level2"
          : postLength < 4
          ? "level3"
          : "level4") as Level,
      ];
    })
  ) as Record<Prefecture<typeof region>, Level>;

  return prefectureMap;
};
