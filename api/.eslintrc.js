module.exports = {
    env: {
        es6: true,
    },
    extends: ['../eslint/default.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaVersion: 6,
        sourceType: 'module',
    },
};
