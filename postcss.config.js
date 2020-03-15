module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": {
      content: ["./layouts/**/*.html"],
      whitelist: ["highlight", "notice", "pre", "code", "chroma", "blockquote", "fill-current"]
    },
    autoprefixer: {
      overrideBrowserslist: ["> 0.5% in my stats", "> 5% in FR"]
    }
  }
};
