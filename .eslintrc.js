const env = process.env.NODE_ENV || "";

const allowIfDev = env.toLowerCase() === "production" ? "error" : "warn";

const sortGroups = {
  groups: [
    [
      "^react",
      "^react-dom",
      "^lodash",
      "^graphql.*",
      "^@?apollo.*",
      "^antd",
      "^@?\\w",
    ],
    // Internal packages
    ["^(@|@ui|components|utils|config|vendored-lib)(/.*|$)"],
    // Side effect imports
    ["^\\u0000"],
    // Parent imports
    ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
    // Other relative imports
    ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
    // Style imports.
    ["^.+\\.s?css$", "^.+\\.less$"],
  ],
};

module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier",
      "plugin:react/recommended"
  ],
  plugins: ["react", "react-hooks", "simple-import-sort", "@typescript-eslint", "import", "json"],
  settings: {
    "import/resolver": {
      typescript: {
        project: ".",
      },
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx", ".mts", ".cts"],
    },
    react: {
      version: "detect",
    },
  },
  rules: {

    "no-console": [allowIfDev, { allow: ["warn", "error"] }],
    "no-debugger": allowIfDev,
    "@typescript-eslint/no-unused-vars": allowIfDev,
    "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-for-of": "error",
    curly: ["error", "all"],
    eqeqeq: ["error", "always", { null: "ignore" }],
    "func-style": ["error", "declaration", { allowArrowFunctions: true }],
    "import/default": "off",
    "import/export": "off",
    "import/first": "error",
    "import/named": "off",
    "import/namespace": "off",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",
    "import/no-named-as-default-member": "off",
    "import/no-named-as-default": "off",
    "import/no-unresolved": [
      "error",
      { ignore: [".svg$", "@curi/types", "^@types/"] },
    ],
    "react-hooks/exhaustive-deps": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/react-in-jsx-scope": "off",
    "react/jsx-boolean-value": "error",
    "react/jsx-curly-brace-presence": "error",
    "react/jsx-fragments": "error",
    "react/jsx-no-useless-fragment": ["error", { allowExpressions: true }],
    "react/jsx-uses-react": "off",
    "react/no-danger": "error",
    "react/prop-types": "off",
    "sort-imports": "off",
    "import/order": "off",
    "no-alert": "error",
    "no-eval": "error",
    "no-shadow": "error",
    "no-underscore-dangle": ["error", { allow: ["__type", "__typename"] }],
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    "no-unused-vars": "off",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "simple-import-sort/imports": ["error", sortGroups],
    "simple-import-sort/exports": "error",
  },
  overrides: [
    {
      files: ["*.d.ts"],
      rules: {
        "spaced-comment": "off",
      },
    },
    {
      files: ["*.ts", "*.tsx", "*.mts", "*.cts"],
      rules: {
        "@typescript-eslint/explicit-function-return-type": [
          "error",
          { allowExpressions: true, allowHigherOrderFunctions: true },
        ],
      },
    },
  ],
};
