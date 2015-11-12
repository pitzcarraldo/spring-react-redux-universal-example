import React from 'react';
import ReactDOMServer from 'react-dom/server';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../webpack/webpack.config.test';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import Html from '../src/universal/containers/Html';

const renderFullPage = (html, initialState) => {
  return ReactDOMServer.renderToString(<Html html={html} initialState={initialState}/>);
};

const app = express();
const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
app.use(webpackHotMiddleware(compiler));
app.get('/*', (req, res)=>{
  res.status(200).end(renderFullPage("test",{}));
});

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});