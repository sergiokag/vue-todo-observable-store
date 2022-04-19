module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  testMatch: [
    "**/tests/unit/**/*.spec.[jt]s?(x)",
    "**/*.spec.[jt]s?(x)"
  ],
}
