import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {ignores: [".next/", "out/"]},
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // New JSX transform (jsx: react-jsx) — React is not required in scope.
  // The legacy .eslintrc.json disabled react/react-in-jsx-scope; the flat
  // config never did, which produced thousands of false positives.
  pluginReact.configs.flat["jsx-runtime"],
];