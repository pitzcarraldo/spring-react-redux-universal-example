import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.dev';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import render from '../src/server/render';

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.get('/*', render);

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});