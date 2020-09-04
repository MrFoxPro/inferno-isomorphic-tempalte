const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
// https://medium.com/atticus-engineering/server-side-rendering-with-react-and-typescript-8cebb4400b3c

module.exports = function(env, _) {
  const base = {
    mode: "production",
    entry: "./src/server/index.tsx", // Point to main file
    output: {
      // path: __dirname + "/dist/server",
      path: path.resolve(process.cwd(), 'dist'),
      filename: "js/server.js",
      publicPath: '/',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    performance: {
      hints: false
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
          test: /\.(js|jsx|tsx|ts)$/,   // All ts and tsx files will be process by
          loaders: 'babel-loader',			// first babel-loader, then ts-loader
          exclude: /node_modules/				// ignore node_modules
        }
      ]
    },
    devServer: {
      host: '0.0.0.0',
      contentBase: "src/",
      historyApiFallback: true
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles/styles.css",
      }),
    ]
  }

  // server-specific configuration
  if (env.platform === 'server') {
    base.target = 'node';
  }
  // client-specific configurations
  if (env.platform === 'client') {
    base.entry = './src/client/index.tsx';
    base.output.filename =  "js/client.js";
  }
  return base;
}
