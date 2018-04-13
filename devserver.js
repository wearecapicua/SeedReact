var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const envFlag = process.argv.indexOf('-m') !== -1 || process.argv.indexOf('-q') !== -1 || process.argv.indexOf('-s') !== -1 || process.argv.indexOf('-l') !== -1;

config.plugins = config.plugins||[];

if (envFlag) {

  var env = '';

  if(process.argv.indexOf('-m') !== -1){
    env = `"master"`;
  }else if(process.argv.indexOf('-q') !== -1){
    env = `"qa"`;
  }else if(process.argv.indexOf('-s') !== -1){
    env = `"stage"`;
  }else if(process.argv.indexOf('-l') !== -1){
    env = `"local"`;
  }

  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': env
      }
  }));
} else {
  config.plugins.push(new webpack.DefinePlugin({
      'process.env': {
          'NODE_ENV': `"stage"`
      }
  }));
}


new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(5000, 'localhost', function (err, result) {
  if (err) {
    return console.log(err);
  }

  console.log('Listening at http://localhost:5000/');
});
