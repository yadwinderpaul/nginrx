module.exports = {
  'env': {
    'node': true,
    'es6': true,
  },

  'rules': {
    'indent': ['error', 2],
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': 'always-multiline',
      'exports': 'always-multiline',
    }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'no-var': 0,
    'no-undef': 'error',
    'no-unused-vars': 'error',
  },
}
