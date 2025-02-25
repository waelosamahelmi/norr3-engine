const path = require('path');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'webworker',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'worker.js'
  },
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "crypto": false
    }
  }
};
