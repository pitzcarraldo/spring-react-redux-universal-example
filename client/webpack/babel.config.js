module.exports = {
  presets: ["es2015", "react", "stage-0"],
  optional: ['runtime'],
  stage: 0,
  plugins: ['typecheck'],
  env: {
    development: {
      plugins: ['react-transform'],
      extra: {
        'react-transform': {
          transforms: [
            {
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module']
            },
            {
              transform: 'react-transform-catch-errors',
              imports: [
                'react',
                'redbox-react'
              ]
            }
          ]
        }
      }
    }
  }
};