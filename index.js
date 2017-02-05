var Nightmare = require('nightmare');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var express = require('express');

var MyComponent = (props) => React.createElement(
  'a',
  { className: 'myButton' },
  props.message
);

var element = React.createElement(MyComponent, { message: 'Hello World' });
var css = `
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');
.myButton {
	-moz-box-shadow:inset 0px 39px 0px -24px #e67a73;
	-webkit-box-shadow:inset 0px 39px 0px -24px #e67a73;
	box-shadow:inset 0px 39px 0px -24px #e67a73;
	background-color:#e4685d;
	-moz-border-radius:4px;
	-webkit-border-radius:4px;
	border-radius:4px;
	border:1px solid #ffffff;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
  font-family: 'Bree Serif', serif;
	font-size:15px;
	padding:6px 15px;
	text-decoration:none;
	text-shadow:0px 1px 0px #b23e35;
}
`

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
  console.log('express: got request');
  var elementMarkup = ReactDOMServer.renderToStaticMarkup(element);
  res.send(makeHtml(elementMarkup, css));
})

server.listen(9000, () => {
  console.log('express: listening on port 9000');
});

var nightmare = Nightmare();
nightmare
  .goto('http://localhost:9000')
  .evaluate(function () { return document.fonts.ready })
  .screenshot('temp.png')
  .then(() => {
    console.log('nightmare: done');
    process.exit(1);
  });
