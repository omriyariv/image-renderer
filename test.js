const React = require('react')
const renderToImage = require('./index.js')

const Button = (props) => (
  <a className='button'>
    {props.text}
  </a>
)

const css = `
@import url('https://fonts.googleapis.com/css?family=Bree+Serif');
.button {
  -webkit-box-shadow: inset 0px 39px 0px -24px #e67a73;
  box-shadow: inset 0px 39px 0px -24px #e67a73;
  background-color: #e4685d;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: 'Bree Serif', serif;
  font-size: 15px;
  padding :6px 15px;
  text-decoration: none;
  text-shadow: 0px 1px 0px #b23e35;
}
`

for (let i = 0; i < 5; i++) {
  const element = <Button text={`testing${i}`}/>
  renderToImage(element, {
    css: css,
    outputPath: `./testing${i}.png`
  })
}
