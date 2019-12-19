import React, { Component } from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { post } from '../service/service'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment'

import 'moment/locale/th';




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
      index_people: 0,
      data_month: [],
      data_peoples: [],
      test_data: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 0, 0, 0, 0, 0, 0],
      selectedDay: moment(),
      peopleTotal: '',
      peopleMax: '',
      peopleMin: '',



    }
    this.handleDayChange = this.handleDayChange.bind(this);
  }


  componentWillMount() {
    this.get_people(moment().format("YYYY-MM-DD"))
  }


  handleDayChange(day) {
    this.setState({ selectedDay: moment(day) });
    this.get_people(moment(day).format("YYYY-MM-DD"))
  }


  get_people = async (date) => {
    let object = {
      date: date
    }
    try {
      await post(object, 'user/get_access', null).then((result) => {
        if (result.success) {
          // alert('yesssss')
          console.log('get_people', result.result)
          this.time_check(result.result)



        }
        else {
          alert(result.error_message)
        }
      })

    } catch (error) {
      alert('get_people: ' + error)

    }
  }

  time_check(data) {
    let people = []
    if (data.length > 0) {
      for (let i = 0; i <= 16; i++) {
        let people_count = 0
        data.map((data_emement) => {
          if (moment("08:00:00", "hh:mm:ss").add(i, 'hours').format('HH') === moment(data_emement.time, "hh:mm:ss").format("HH")) {
            people_count += 1
          } else {
          }
        })
        people.push(people_count)

      }

    } else {
      people = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

    }


    this.state.peopleTotal = people.reduce((totalpeople, people) => totalpeople + people, 0);
    this.state.peopleMax = Math.max(...people)
    this.state.peopleMin = Math.min.apply(null, people)

    console.log("max", this.state.peopleMax)
    console.log("min", this.state.peopleMin)
    this.setState({
      data_peoples: people

    })


  }


  render() {
    const today = moment().format('LTS');
    const to_date = moment().format("LL");


    const { selectedDay } = this.state;



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
        categories: ['08.00-08.59', '09.00-09.59', '10.00-10.59', '11.00-11.59', '12.00-12.59', '13.00-13.59', '14.00-14.59', '15.00-15.59', '16.00-16.59', '17.00-17.59', '18.00-18.59', '19.00-19.59', '20.00-20.59', '21.00-21.59', '22.00-22.59', '23.00-23.59', '00.00-00.59']
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
        data: this.state.data_peoples,
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
        {/* <div>
          <h1>{this.state.selectedDay.format("LL")}</h1>
        </div> */}
        <div>
          <table>
            <tr>
              <td>
                <DayPickerInput
                  formatDate={formatDate}
                  parseDate={parseDate}
                  format="ll"
                  placeholder={`${formatDate(new Date(), 'll', 'th')}`}
                  dayPickerProps={{
                    locale: 'th',
                    localeUtils: MomentLocaleUtils,
                  }}
                  onDayChange={this.handleDayChange}

                />
              </td>
            </tr>
          </table>

        </div>
        <br />
        <div >

          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
        
        <div>
          <table style={{ border: "1px solid #000" }}>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>วันที่</th>
              <th style={{ border: "1px solid #000" }}> {moment(this.state.selectedDay).format('DD-MM-YYYY')} </th>

            </tr>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>จำนวนคนเข้าใช้บริการทั้งหมด</th>
              <th style={{ border: "1px solid #000" }}>{this.state.peopleTotal} คน</th>
            </tr>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>จำนวนคนเข้าใช้บริการมากที่สุด</th>
              <th style={{ border: "1px solid #000" }}>{this.state.peopleMax} คน</th>
            </tr>
            {/* <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>จำนวนคนเข้าใช้บริการน้อยที่สุด</th>
              <th style={{ border: "1px solid #000" }}>คน</th>
            </tr> */}
          </table>
        </div>
        <br />

      </div>
    );
  }
}

export default test_hc;