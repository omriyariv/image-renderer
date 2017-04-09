var ReactDOMServer = require('react-dom/server');
var express = require('express');
var screenshot = require('electron-screenshot-service');

var makeHtml = (content, css) => (`
  <!doctype html>
  <html>
    <head>
      <style>
        ${css}
      </style>
    </head>
    <body>
      ${content}
    </body>
  </html>
`);

var server = express();

server.get('/', (req, res) => {
  var decodedParams = JSON.parse(decodeURIComponent(req.query.params));
  res.send(makeHtml(decodedParams.html, decodedParams.css));
})

var serverHandle = server.listen(9000);

var render = (element, options) => {
  var urlParams = {
    html: ReactDOMServer.renderToStaticMarkup(element),
    css: options.css || ''
  };

  var encodedParams = encodeURIComponent(JSON.stringify(urlParams));

  return screenshot({
    url : `http://localhost:9000?params=${encodedParams}`,
    width : 1024,
    height : 768
  });
};

var close = () => {
  screenshot.close();
  serverHandle.close();
}

module.exports = {
  render,
  close
};
