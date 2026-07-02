import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      // Literal apostrophes and quotes in JSX text render correctly in React,
      // so this rule adds no safety — but as an error it fails the production
      // build whenever blog/marketing copy contains an apostrophe. Turn it off
      // project-wide so content pages don't break `next build`.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
