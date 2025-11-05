import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

   // --- START: CUSTOM RULE OVERRIDE TO FIX UNUSED VARS WARNING ---
  {
    // This configuration extends the existing ones to modify specific rules.
    rules: {
      // Configuration for the rule causing the warning.
      // We set it to 'warn' (or 'error' if desired) and provide options.
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          // This crucial setting tells ESLint to ignore any variable 
          // that starts with an underscore, such as '_' or '_node'.
          "varsIgnorePattern": "^_", 
          "argsIgnorePattern": "^_",
          "caughtErrorsIgnorePattern": "^_"
        }
      ],
      // If you are using the base ESLint 'no-unused-vars' rule (not recommended in TS projects),
      // you would also configure it here. We'll stick to the TS version.
    },
  },
  
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
