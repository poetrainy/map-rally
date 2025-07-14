import type { PREFECTURES, REGIONS } from "@/constants/map";

export type Region = (typeof REGIONS)[number];

export type Level =
  | "default"
  | "plain"
  | "level1"
  | "level2"
  | "level3"
  | "level4";

export type PrefecturesByRegion = typeof PREFECTURES;
export type Prefecture<T extends Region> = PrefecturesByRegion[T][number];

export type Map = MapEdit & {
  id: string;
  userId: string;
  isPin: boolean;
  posts: string[];
};

export type MapVisibility = "public" | "unlisted" | "private";

export type MapEdit = {
  name: string;
  description?: string;
  region: Region;
  tags: string[];
  visibility: MapVisibility;
};

export type MapColorToken =
  | "default"
  | "plain"
  | "level1"
  | "level2"
  | "level3"
  | "level4";

export type Post = {
  id: string;
  publishedAt: string;
  prefecture: string;
  images: string[];
  title?: string;
  place?: string;
  text?: string;
  mapId: string;
};
