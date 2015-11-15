import RouteResult from './RouteResult';
import renderAsync from './render';
import { Promise } from 'es6-promise';

export default function render (url) {
  let res = new RouteResult();
  renderAsync({ url }, res);
  while(!res.response.body){}
  return res.response;
}