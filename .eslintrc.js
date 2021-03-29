module.exports = {
    "env": {
        "browser": true,
        "amd": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
    },
    overrides: [
        {
            files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
            parser: "@typescript-eslint/parser",
            rules: {
                semi: ["error", "never"],
                indent: ["error", 4],
                quotes: ["error", "double"]
            }
        }
    ]
}
