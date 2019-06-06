module.exports = {
  "parser": "babel-eslint",
  "extends": ["airbnb", "plugin:flowtype/recommended", "plugin:react/recommended"],
  "plugins": [
    "react",
    "flowtype",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "no-restricted-syntax": 0,
    "linebreak-style": 0,
    "react/require-default-props": 0,
    "react/default-props-match-prop-types": 0,
    "react/prop-types": 0,
    "react/no-unused-prop-types": 0,
    "react/no-unused-state": 0,
    "prefer-promise-reject-errors": 0,
    "import/prefer-default-export": 0,
    "react/jsx-filename-extension": [
      1, { "extensions": [".js", ".jsx"] }
    ],
    "react/prefer-stateless-function": [
      2, { "ignorePureComponents": true }
    ],
    "react/forbid-prop-types": [0, { "forbid": [] }],
    "import/extensions": [1, "never", { "svg": "always" }],
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": true,
        "optionalDependencies": false,
        "peerDependencies": false
      }
    ],
    "semi": ["error", "always"],
    "global-require": ["off"],
    "max-len": ["error", { "code": 80 }],
    "no-case-declarations": ["off"],
    "no-unused-expressions": ["off"],
    "no-mixed-operators": ["off"],
    "no-nested-ternary": ["off"],
    "no-shadow": ["off"],
    "no-plusplus": ["warn"],
    "import/no-cycle": 0,
    "no-prototype-builtins": 0,
    "no-underscore-dangle": 0,
    "arrow-body-style": ["error", "as-needed"],
    "no-use-before-define": ["error", { "variables": false }]
  },
  "env": {
    "jest": true,
    "browser": true
  }
};