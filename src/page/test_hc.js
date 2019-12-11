import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
});

class test_hc extends Component {

  render() {
    var options = {

      title: {
        text: 'ทดสอบๆ',
        style: {
          fontSize: '24px',
          fontFamily: 'printable4uregular'
        }
      },
      credits: {
        enabled: false
      },

      xAxis: {
        categories: ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.']
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
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

export default test_hc;