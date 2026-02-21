import nextConfig from 'eslint-config-next'

export default [
  ...nextConfig,
  {
    rules: {
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_'
        }
      ],
      'react/display-name': 0
    }
  }
]
