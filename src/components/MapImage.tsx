// FIXME: Rename

import type { FC, ReactNode } from "react";
import { chakra } from "@chakra-ui/react";
import type { Level, MapColorToken, Region } from "@/types/map";
import { plainColor } from "@/constants/map";
import {
  ALL_REGION_PATH_MAP,
  INDIVIDUAL_REGION_PATH_MAP,
} from "@/constants/map/svg";

type RegionMapPrefecture = {
  id: string;
  d: string;
  fill: string;
};

const mapStyle = {
  stroke: "gray.subtle",
  strokeWidth: "1.5",
  strokeLinejoin: "round",
};

const regionStyle = {
  boxSize: "full",
  objectFit: "contain",
};

export type MapRegionProps = {
  colorToken: MapColorToken;
};

export type LevelMap = Record<string, Level>;

const RegionMapBase: FC<{
  prefectures: RegionMapPrefecture[];
  children?: ReactNode;
}> = ({ prefectures, children }) => (
  <>
    {prefectures.map(({ d, fill }) => (
      <chakra.path key={d} fill={fill} d={d} css={mapStyle} />
    ))}
    {children}
  </>
);

const fill: (region: Region, level: Level) => string = (
  region: Region,
  level: Level
) => `${region}.${level}`;

const individualMapPrefecture: (
  region: Region,
  levelMap?: LevelMap
) => RegionMapPrefecture[] = (region: Region, levelMap?: LevelMap) =>
  Array.from(
    Object.entries(INDIVIDUAL_REGION_PATH_MAP[region]).map(
      ([prefecture, d]) => {
        return {
          id: prefecture,
          d,
          fill: fill(region, levelMap ? levelMap[prefecture] : "default"),
        };
      }
    )
  );

const HokkaidoTohoku: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 145 260" css={regionStyle}>
    <RegionMapBase
      prefectures={individualMapPrefecture("hokkaido-tohoku", levelMap)}
    />
  </chakra.svg>
);

const Kanto: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 57 64" css={regionStyle}>
    <RegionMapBase prefectures={individualMapPrefecture("kanto", levelMap)} />
  </chakra.svg>
);

const Chubu: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 103 113" css={regionStyle}>
    <RegionMapBase prefectures={individualMapPrefecture("chubu", levelMap)} />
  </chakra.svg>
);

const Kinki: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 62 66" css={regionStyle}>
    <RegionMapBase prefectures={individualMapPrefecture("kinki", levelMap)} />
  </chakra.svg>
);

const Chugoku: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 84 50" css={regionStyle}>
    <RegionMapBase prefectures={individualMapPrefecture("chugoku", levelMap)} />
  </chakra.svg>
);

const Shikoku: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 55 46" css={regionStyle}>
    <RegionMapBase prefectures={individualMapPrefecture("shikoku", levelMap)} />
  </chakra.svg>
);

const KyushuOkinawa: FC<{ levelMap?: LevelMap }> = ({ levelMap }) => (
  <chakra.svg viewBox="0 0 105 80" css={regionStyle}>
    <RegionMapBase
      prefectures={individualMapPrefecture("kyushu-okinawa", levelMap)}
    >
      <chakra.path
        d="M105 46H80.5459L66 61.0921V77"
        fill="transparent"
        stroke={plainColor}
      />
    </RegionMapBase>
  </chakra.svg>
);

const All: FC = ({ variant = "all" }: { variant?: "all" | null | Region }) => {
  return (
    <chakra.svg viewBox="0 0 363 417">
      {Object.entries(ALL_REGION_PATH_MAP).map(([region, d]) => (
        <RegionMapBase
          key={region}
          prefectures={d.map((item) => ({
            id: region,
            d: item,
            fill: fill(
              region as Region,
              variant === "all" || variant === region ? "default" : "plain"
            ),
          }))}
        >
          {region === "kyushu-okinawa" && (
            <chakra.path
              d="M351.513 335.958H297.956L266.099 370.1V406.088"
              fill="transparent"
              stroke={plainColor}
            />
          )}
        </RegionMapBase>
      ))}
    </chakra.svg>
  );
};

export default {
  All,
  HokkaidoTohoku,
  Kanto,
  Chubu,
  Kinki,
  Chugoku,
  Shikoku,
  KyushuOkinawa,
};
