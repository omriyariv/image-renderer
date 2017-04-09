const React = require('react')
const { render, close } = require('./index.js')
const fs = require('fs')

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

let done = 0

for (let i = 0; i < 100; i++) {
  const element = <Button text={`testing${i}`}/>
  render(element, {
    css: css
  })
  .then((img) => {
    try {
      done++
      console.log('success', img.data.length, done)
      if (done === 100) {
        close()
      }
    } catch (e) {
      console.log('error', e)
    }
  })
}

// BENCHMARKS:
// 100 screenshots - writing to fs, single browser (27, 34, 33)
// 100 screenshots - no fs writing, single browser (29, 30, 29)
// 100 screenshots - no fs writing, 3 browsers (27, 27, 26)
// 100 screenshots - no fs writing, 5 browsers (26, 28, 27)
