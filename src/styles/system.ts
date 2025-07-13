import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import { REGIONS } from "@/constants/map";
import type { MapColorToken, Region } from "@/types/map";

type RegionColor = Record<
  Region,
  Record<MapColorToken, { value: { _light: string; _dark: string } }>
>;

const REGION_COLOR_MAP: Record<Region, string> = {
  "hokkaido-tohoku": "blue",
  kanto: "green",
  chubu: "yellow",
  kinki: "orange",
  chugoku: "red",
  shikoku: "pink",
  "kyushu-okinawa": "purple",
};

const regionColor: RegionColor = Object.fromEntries(
  REGIONS.map((region) => {
    const color = REGION_COLOR_MAP[region];

    return [
      region,
      {
        default: {
          value: {
            _light: `{colors.${color}.300}`,
            _dark: `{colors.${color}.700}`,
          },
        },
        plain: {
          value: {
            _light: "{colors.gray.300}",
            _dark: "{colors.gray.700}",
          },
        },
        level1: {
          value: {
            _light: `{colors.${color}.200}`,
            _dark: `{colors.${color}.900}`,
          },
        },
        level2: {
          value: {
            _light: `{colors.${color}.300}`,
            _dark: `{colors.${color}.800}`,
          },
        },
        level3: {
          value: {
            _light: `{colors.${color}.400}`,
            _dark: `{colors.${color}.700}`,
          },
        },
        level4: {
          value: {
            _light: `{colors.${color}.600}`,
            _dark: `{colors.${color}.500}`,
          },
        },
      },
    ];
  })
) as RegionColor;

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        gray: {
          secondary: {
            value: {
              _light: "{colors.gray.600}",
              _dark: "{colors.gray.400}",
            },
          },
          tertiary: {
            value: {
              _light: "{colors.gray.500}",
              _dark: "{colors.gray.500}",
            },
          },
        },
        ...regionColor,
      },
    },
  },
  globalCss: {
    "*": {
      boxSizing: "border-box",
      fontFamily: "body",
    },
    body: {
      bgColor: "gray.subtle",
      fontSize: "sm",
    },
    a: {
      color: "gray.fg",
      textDecoration: "none",
    },
    li: {
      listStyleType: "none",
    },
    pre: {
      fontFamily: "sans-serif",
      whiteSpace: "pre-wrap",
    },
    "*:focus-visible": {
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineColor: "gray.focusRing",
      outlineOffset: "2px",
    },
    "::selection": {
      background: "rgba(8, 103, 118, 0.2)",
    },
    "::-moz-selection": {
      background: "rgba(8, 103, 118, 0.2)",
    },
  },
  // theme: {},
});

export default createSystem(defaultConfig, config);
