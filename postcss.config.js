module.exports = {
  plugins: {
    "@fullhuman/postcss-purgecss": {
      content: ["./layouts/**/*.html"],
      whitelist: []
    },
    autoprefixer: {
      overrideBrowserslist: ["> 0.5% in my stats", "> 5% in FR"]
    }
  }
};
