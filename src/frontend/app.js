export default class App {
  constructor(render, requestAnimationFrame) {
    this._willRender = false;
    this._requestAnimationFrame = requestAnimationFrame;
    this._data = [];

    this.http('news', (err, result) => {
      this._data = result.map(function(item) {
        item.title = item.title.replace(/&quot;/g, '"');
        item.title = item.title.replace(/&amp;/g, '&');
        item.text = item.text.replace(/&quot;/g, '"');
        item.text = item.text.replace(/&amp;/g, '&');
        return item;
      });
      this.render();
    });

    this._render = () => {
      render();
      this._willRender = false;
    }
  }

  http(endpoint, callback) {
    const req = new XMLHttpRequest();
    const baseUrl = '';

    req.onload = function () {
      try {
        const configs = JSON.parse(this.responseText);
        callback(null, configs);
      } catch(e) {
        callback(e, null);
      }
    };
    req.open(
      'get',
      `${baseUrl}/${endpoint}`,
      true
    );
    req.send();
  }

  getData() {
    return this._data;
  }

  render() {
    if(!this._willRender) {
      this._willRender = true;
      this._requestAnimationFrame(this._render);
    }
  }
}
