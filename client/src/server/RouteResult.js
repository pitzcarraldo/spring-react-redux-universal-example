export default class RouteResult {
  constructor(){
    this.response = {};
  }

  status(status) {
    this.response.status = status;
    return this;
  }

  end(body) {
    this.response.body = body;
    return this;
  }
}