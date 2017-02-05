### WIP
this package is under development

### image-renderer

Renders React elements into PNG files
```js
const React = require('react');
const renderToImage = require('image-renderer');

const css = '.example { display: inline-block; background-color: #e4685d }';
const element = React.createElement('div', { className: 'example' }, 'nice');
renderToImage(element, 'nice.png', { css })
```
