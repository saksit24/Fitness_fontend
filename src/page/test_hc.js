import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { get } from '../service/service';
import moment from 'moment'


Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

class test_hc extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data_people: null,
      id_access: '',
      user_id: '',
      date: '',
      time: '',
    }
  }

  componentWillMount() {
    this.get_people()
  }

  get_people = async () => {
    try {
      await get('user/get_access', null).then((result) => {
        if (result.success) {
          this.setState({
            data_people: result.result

          })
          console.log('get_people', result.result)
        }
        else {
          alert(result.error_message)
        }
      })

    } catch (error) {
      alert('get_people: ' + error)

    }
  }

  render() {
    const today = moment().format('LTS');
    const to_date = moment().format("LL");
    var options = {

      title: {
        text: '',
        style: {
          fontSize: '24px',
          fontFamily: 'printable4uregular'
        }
      },
      credits: {
        enabled: false
      },

      xAxis: {
        categories: ['12.00-13.00', '13.00-14.00', '14.00-15.00', '15.00-16.00', '16.00-17.00', '17.00-18.00', '18.00-19.00', '19.00-20.00', '20.00-21.00', '21.00-22.00', '22.00-23.00', '23.00-0.00']
      },

      yAxis: {
        type: 'logarithmic',
        // minorTickInterval: 10
        title: {
          text: '<span style="font-size:15px;">จำนวน (คน)</span>',
          style: {
            fontSize: '20px',
            fontFamily: 'printable4uregular'
          }
        }
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            // format: '{point.y}'
          }
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:14px">{point.key}</span><br/><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0;font-size:10px">จำนวน : </td>' +
          '<td style="padding:0"><b>{point.y} คน </b></td></tr>',
        footerFormat: '</table>',
      },
      series: [{
        type: 'column',
        colorByPoint: true,
        data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        showInLegend: false,
        labels: {
          enabled: true,
          rotation: 0,
          color: '{series.color}',
          align: 'center',
          format: '(point.y)}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '20px',
            fontFamily: 'printable4uregular'

          }
        }
      }],
    }

    return (
      <div>
        <div>
          <h1>{to_date}</h1>
        </div>

        <div>
          
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>


      </div>
    );
  }
}

export default test_hc;