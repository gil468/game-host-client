module.exports = {
    extends: [
      'react-app', // or your chosen ESLint config
      'prettier',
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': 'error',
    },
  };
  