import React from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
// import {DatePickerPage} from '../layout/timepicker';


class ChartsPage extends React.Component {
  state = {
    dataBar: {
      labels: ["08.00-08.59", "09.00-09.59", "10.00-10.59", "11.00-11.59", "12.00-12.59", "13.00-13.59",
               "14.00-14.59", "15.00-15.59", "16.00-16.59", "17.00-17.59", "18.00-18.59", "19.00-19.59",
               "20.00-20.59", "21.00-21.59", "22.00-22.59", "23.00-23.59", "อื่น ๆ"],
      datasets: [
        {
          label: "จำนวนผู้เข้าใช้บริการ",
          data: [2, 5, 10, 5,0,1,2,2,8,6,0,4,5,3,2,5 ],
          backgroundColor: [
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(255, 218, 128,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(255, 218, 128, 1)",
          
          ]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [
          {
            barPercentage: 1,
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: "rgba(0, 0, 0, 0.1)"
            },
            ticks: {
              beginAtZero: true
              
            }
          }
        ]
      }
    }
  }


  render() {
    return (
      <MDBContainer>
        <h3 className="mt-5">สถิติการเข้าใช้บริการ 1/1/2019</h3>
        
        <Bar data={this.state.dataBar} options={this.state.barChartOptions} />
        
        
      </MDBContainer>
    );
  }
}


export default ChartsPage;