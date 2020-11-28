const colors = require("tailwindcss/colors");

module.exports = {
  important: true,
  experimental: {
    // See https://github.com/tailwindlabs/tailwindcss/pull/2159
    applyComplexClasses: true,
  },
  darkMode: "media", // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Poppins", "system-ui", "sans-serif"],
      body: ["Roboto", "system-ui", "sans-serif"],
    },
    fill: {
      current: "currentColor",
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              color: "#4c1e94",
              "font-family": "Poppins",
              "margin-bottom": ".5em",
            },
            a: {
              "font-weight": "600",
              color: "#4c1e94",
              "&:hover": {
                color: "#ff4863",
              },
            },
          },
        },
      },
      colors: {
        gray: colors.coolGray,
        violet: colors.violet,
        rose: colors.rose,
        indigo: colors.indigo,
      },
    },
  },
  variants: {},
  purge: {
    enabled: process.env.HUGO_ENVIRONMENT === "production",
    content: ["./hugo_stats.json"],
    mode: "all",
    options: {
      //safelist: [ 'pl-1', 'pl-3' ],
      defaultExtractor: (content) => {
        let els = JSON.parse(content).htmlElements;
        els = els.tags.concat(els.classes, els.ids);
        return els;
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")]
};
