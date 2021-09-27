module.exports = {
  extends: ["plugin:prettier/recommended"],
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  }
};
