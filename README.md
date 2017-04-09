### WIP
this package is under development

### image-renderer

Renders React elements into PNG files
```js
const React = require('react');
const fs = require('fs');
const ImageRenderer = require('image-renderer');

const css = '.example { display: inline-block; background-color: #e4685d }';
const element = React.createElement('div', { className: 'example' }, 'nice');
ImageRenderer.render(element, { css }).then((img) => {
  fs.writeFile('./nice.png', img.data, (err) => {
    ImageRenderer.close(); // cleanup BG processes and unbind ports
  });
}
```
