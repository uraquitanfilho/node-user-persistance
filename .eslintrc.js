module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  rules: {
    'prettier/prettier': 'error',
    /* per default all class method need use this but controllers and app will
    stay inside classes but would not necessary to use this */
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off', //to allow receive and modify parameters
    camelcase: 'off', //to allow variables
    /* To allow declare next variable and never uses it (this is important to
    middlewares) */
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};
