var Nightmare = require('nightmare');
var ReactDOMServer = require('react-dom/server');
var express = require('express');

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

server.listen(9000);

var render = function (element, options) {
  var nightmare = Nightmare();
  var urlParams = {
    html: ReactDOMServer.renderToStaticMarkup(element),
    css: options.css || ''
  };

  var encodedParams = encodeURIComponent(JSON.stringify(urlParams));
  return nightmare
    .goto(`http://localhost:9000?params=${encodedParams}`)
    .evaluate(function () { return document.fonts.ready })
    .screenshot(options.outputPath)
    .end()
    .then(function () {})
};

module.exports = render;
