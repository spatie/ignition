module.exports = {
  presets: [
    ['@babel/preset-typescript', { 
      allowDeclareFields: true,
      isTSX: true,
      allExtensions: true
    }],
    ['@babel/preset-react', { runtime: 'classic' }]
  ],
  babelrcRoots: [
    ".",
    "../flareapp.io/resources/packages/ignition-ui"
  ]
};