import type { Region } from "@/types/map";

export const plainColor = "gray.emphasized";

export const REGIONS = [
  "hokkaido-tohoku",
  "kanto",
  "chubu",
  "kinki",
  "chugoku",
  "shikoku",
  "kyushu-okinawa",
] as const;

export const REGION_HOKKAIDO_TOHOKU_PREFECTURES = [
  "hokkaido",
  "aomori-prefecture",
  "iwate-prefecture",
  "miyagi-prefecture",
  "akita-prefecture",
  "yamagata-prefecture",
  "fukushima-prefecture",
] as const;

export const REGION_KANTO_PREFECTURES = [
  "ibaraki-prefecture",
  "tochigi-prefecture",
  "gunma-prefecture",
  "saitama-prefecture",
  "chiba-prefecture",
  "tokyo",
  "kanagawa-prefecture",
] as const;

export const REGION_CHUBU_PREFECTURES = [
  "nigata-prefecture",
  "toyama-prefecture",
  "ishikawa-prefecture",
  "fukui-prefecture",
  "yamanashi-prefecture",
  "nagano-prefecture",
  "gifu-prefecture",
  "shizuoka-prefecture",
  "aichi-prefecture",
] as const;

export const REGION_KINKI_PREFECTURES = [
  "mie-prefecture",
  "shiga-prefecture",
  "kyoto-prefecture",
  "osaka-prefecture",
  "hyogo-prefecture",
  "nara-prefecture",
  "wakayama-prefecture",
] as const;

export const REGION_CHUGOKU_PREFECTURES = [
  "tottori-prefecture",
  "shimane-prefecture",
  "okayama-prefecture",
  "hiroshima-prefecture",
  "yamaguchi-prefecture",
] as const;

export const REGION_SHIKOKU_PREFECTURES = [
  "tokushima-prefecture",
  "kagawa-prefecture",
  "ehime-prefecture",
  "kochi-prefecture",
] as const;

export const REGION_KYUSHU_OKINAWA_PREFECTURES = [
  "fukuoka-prefecture",
  "saga-prefecture",
  "nagasaki-prefecture",
  "kumamoto-prefecture",
  "oita-prefecture",
  "miyazaki-prefecture",
  "kagoshima-prefecture",
  "okinawa-prefecture",
] as const;

export const REGION_JP_MAP: Record<Region, string> = {
  "hokkaido-tohoku": "北海道・東北",
  kanto: "関東",
  chubu: "中部",
  kinki: "近畿",
  chugoku: "中国",
  shikoku: "四国",
  "kyushu-okinawa": "九州・沖縄県",
};

export const PREFECTURES = {
  "hokkaido-tohoku": REGION_HOKKAIDO_TOHOKU_PREFECTURES,
  kanto: REGION_KANTO_PREFECTURES,
  chubu: REGION_CHUBU_PREFECTURES,
  kinki: REGION_KINKI_PREFECTURES,
  chugoku: REGION_CHUGOKU_PREFECTURES,
  shikoku: REGION_SHIKOKU_PREFECTURES,
  "kyushu-okinawa": REGION_KYUSHU_OKINAWA_PREFECTURES,
} as const;
