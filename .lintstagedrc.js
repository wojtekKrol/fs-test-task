module.exports = {
  // Type check TypeScript files
  '**/*.(ts)': () => 'yarn tsc --noEmit',

  // Lint & Prettify TS files
  '**/*.{ts,tsx}': filenames => [
    `yarn eslint --fix ${filenames.join(' ')}`,
    `yarn prettier --write ${filenames.join(' ')}`,
  ],

  // Prettify only Markdown and JSON files
  '**/*.{json,md,mdx,yml}': filenames    =>
    `yarn prettier --write ${filenames.join(' ')}`,
}