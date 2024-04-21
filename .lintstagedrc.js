module.exports = {
  "*/**/*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "eslint --fix",
    "eslint"
  ],

  // Prettify only Markdown and JSON files
  '**/*.{json,md,mdx,yml}': filenames    =>
    `yarn prettier --write ${filenames.join(' ')}`,
}