import React from "react";
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";

class ChartsPage extends React.Component {
  state = {
    dataLine: {
        labels: ["11.00-12.00", "12.01-13.00", "14.01-15.00", "15.01-16.00","17.01-18.00","18.01-19.00","19.01-20.00","20.01-21.00","21.01-22.00",],
      datasets: [
        {
          label: "รายรับ",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(255, 218, 128,0.4)",
          borderColor: "rgba(255, 218, 128, 1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba( 255, 140, 0, 1 )",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [650, 590, 800, 810, 560, 550, 400,1000,1200]
        },
        {
          label: "รายจ่าย",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "RGBA( 211, 211, 211, 1 )",
          borderColor: "RGBA( 119, 136, 153, 1 )",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(35, 26, 136)",
          pointBackgroundColor: "rgb(255, 255, 255)",
          pointBorderWidth: 10,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(0, 0, 0)",
          pointHoverBorderColor: "rgba(220, 220, 220, 1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [1000, 200, 0, 0, 0, 0, 0,0,0]
        }
      ]
    }
  };

  render() {
    return (
        <div>
      <MDBContainer>
        <h3 className="mt-5">บัญชีรายรับรายจ่าย ของวันที่ </h3>
        <Line data={this.state.dataLine} options={{ responsive: true }} />
      </MDBContainer>
      
      <h4 className="mt-5">รวมรายได้ = 11,560 </h4>
      <h4 className="mt-5">รวมรายจ่าย =  1,200</h4>
      <h4 className="mt-5">กำไร =  10,360</h4>
      
      
      
    
    </div>
    );
  }
}

export default ChartsPage;