module.exports = {
  content: [
    './layouts/**/*.html.twig',
  ],
  darkMode: "media",
  safelist: [
    'anchorjs-link',
    'dark:brightness-90',
    'hidden',
    'font-display',
    'font-medium',
    'transition-opacity',
    'duration-1000',
    'ease-out',
    'opacity-0',
    'opacity-100',
    'opacity-60',
    'mt-0.5'
  ],
  plugins: [
    require('@tailwindcss/typography')({
      className: 'markdown',
    }),
  ],
  theme: {
    fontFamily: {
      display: ["Poppins", "system-ui", "sans-serif"],
      body: ["Roboto", "system-ui", "sans-serif"],
    },
    colors: {
      white: {
        DEFAULT: "white",
      },
      black: {
        DEFAULT: "231B30",
      },
      violet: {
        DEFAULT: "#300a66",
        light: "#4a21cc",
        dark: "#26153f",
      },
      rose: {
        DEFAULT: "#ff4863",
        50: '#fcf9f8',
        100: '#fdeef2',
        200: '#fbcfe4',
        300: '#faa7cd',
        400: '#fb6ea5',
        500: '#fc437c',
        600: '#ff4863',
        700: '#de1f47',
        800: '#b31a39',
        900: '#8f162e',
      },
      blue: {
        DEFAULT: "#7DACFF",
        100: "#E5EFFF",
        200: "#CCDFFF",
        300: "#B3CFFF",
        400: "#99BEFF",
        500: "#7DACFF",
        600: "#669EFF",
        700: "#4D8EFF",
        800: "#337EFF",
        900: "#1A6EFF",
      },
      "black-grape": {
        DEFAULT: "#231B31",
        100: "#E6E1EF",
        200: "#B1A3CC",
        300: "#7C64AA",
        400: "#4E3E70",
        500: "#231B31",
        600: "#1C1627",
        700: "#15101E",
        800: "#0E0B14",
        900: "#07050A",
      },
      gray: {
        DEFAULT: "#71717A",
        50: "#FAFAFA",
        100: "#F4F4F5",
        200: "#E4E4E7",
        300: "#D4D4D8",
        400: "#A1A1AA",
        500: "#71717A",
        600: "#52525B",
        700: "#3F3F46",
        800: "#27272A",
        900: "#18181B",
      },
    },
    fill: {
      current: "currentColor",
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              color: theme("colors.violet.DEFAULT"),
              fontFamily: "Poppins",
            },
            h2: {
              color: theme("colors.violet.DEFAULT"),
              fontFamily: "Poppins",
            },
            h3: {
              color: theme("colors.violet.DEFAULT"),
              fontFamily: "Poppins",
            },
            a: {
              color: theme("colors.violet.DEFAULT"),
              "&:hover": {
                color: theme("colors.violet.light"),
              },
            },
            blockquote: {
              background: theme("colors.malibu.100"),
              borderColor: theme("colors.malibu.DEFAULT"),
              padding: ".5em",
            },
            pre: {
              background: "rgba(128, 174, 255, 0.1)",
            },
            "pre code": {
              color: theme("colors.black-grape.500"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            h1: {
              color: theme("colors.blue.500"),
            },
            h2: {
              color: theme("colors.blue.500"),
            },
            h3: {
              color: theme("colors.blue.500"),
            },
            h4: {
              color: theme("colors.blue.500"),
            },
            strong: {
              color: theme("colors.gray.300"),
            },
            a: {
              color: theme("colors.blue.500"),
              "&:hover": {
                color: theme("colors.blue.300"),
              },
            },
            blockquote: {
              color: theme("colors.blue.500"),
              background: theme("colors.gray.800"),
              borderColor: theme("colors.gray.700"),
            },
            code: {
              color: theme("colors.gray.300"),
            },
          },
        },
      }),
    },
  }
};
