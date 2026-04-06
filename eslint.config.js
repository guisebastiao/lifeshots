import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-plugin-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import js from "@eslint/js";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-object-type": "off"
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["public/service-worker.js"],
    languageOptions: {
      globals: {
        self: "readonly",
        clients: "readonly",
        caches: "readonly",
      },
    },
  },
];
