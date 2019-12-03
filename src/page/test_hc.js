import React from 'react'
import { render } from 'react-dom'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
 
const options = {
  title: {
    text: 'My chart'
  },
  series: [{
    data: [1, 2, 3]
  }]
}
 
const App = () => <div>
  <HighchartsReact
    highcharts={Highcharts}
    options={options}
  />
</div>
 
render(<App />, document.getElementById('root'))