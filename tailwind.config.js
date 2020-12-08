module.exports = {
  important: true,
  mode: "all",
  experimental: {
    // See https://github.com/tailwindlabs/tailwindcss/pull/2159
    // applyComplexClasses: true,
  },
  darkMode: "media",
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
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
              borderColor: theme("colors.malibu.default"),
              padding: ".5em",
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.gray.300"),
            a: {
              color: theme("colors.violet-indigo.400"),
              "&:hover": {
                color: theme("colors.violet-indigo.500"),
              },
            },
            h2: {
              color: theme("colors.violet.light"),
            },
          },
        },
      }),
    },
    colors: {
      violet: {
        light: "#4a21cc",
        DEFAULT: "#300a66",
        dark: "#26153f",
      },
      brand: '#300A66',
      "violet-indigo": {
        50:  "#f7f9fc",
        100: "#f1f1fb",
        200: "#e0dbf8",
        300: "#cebef6",
        400: "#b88ff4",
        500: "#9c61f2",
        600: "#7940e9",
        700: "#5832cb",
        800: "#41289a",
        900: "#332276",
      },
      white: {
        DEFAULT: "white",
      },
      black: "#231B30",
      "black-grape": {
        default: "#231B31",
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
      rose: "#ff4863",
      blue: "#7DACFF",
      malibu: {
        default: "#80AEFF",
        100: "#E5EFFF",
        200: "#CCDFFF",
        300: "#B3CFFF",
        400: "#99BEFF",
        500: "#80AEFF",
        600: "#669EFF",
        700: "#4D8EFF",
        800: "#337EFF",
        900: "#1A6EFF",
      },
    },
    fontFamily: {
      display: ["Poppins", "system-ui", "sans-serif"],
      body: ["Roboto", "system-ui", "sans-serif"],
    },
    fill: {
      current: "currentColor",
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./hugo_stats.json"],
    options: {
      //safelist: [ 'pl-1', 'pl-3' ],
      defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        els = els.tags.concat(els.classes, els.ids);
        return els;
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
