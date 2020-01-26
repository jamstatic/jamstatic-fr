const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    purgecss({
      content: ['./layouts/**/*.html'],
      extension: "html"
    })
  ],
  autoprefixer: {
    overrideBrowserslist: [
      '> 1% in my stats',
      '> 5% in FR'
    ]
  },
}
