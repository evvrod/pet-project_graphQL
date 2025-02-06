module.exports = {
  extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  plugins: ['no-comments', 'react-compiler'],
  rules: {
    'no-console': 'error',
    'max-lines-per-function': [
      'error',
      {
        'max': 100,
        'skipBlankLines': true,
        'skipComments': true,
        'IIFEs': true,
      },
    ],
    'prefer-destructuring': [
      'error',
      {
        'array': true,
        'object': true,
      },
    ],
    'no-comments/disallowComments': [
      'error',
      {
        'allow': ['TODO', 'FIXME', 'NOTE', 'DEBUG'],
      },
    ],
    'react-compiler/react-compiler': 'error',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src'],
        ]
      }
    }
  }
};
