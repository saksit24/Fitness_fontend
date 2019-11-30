import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import { get, ip, post } from '../service/service'

import "react-datepicker/dist/react-datepicker.css";

class income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      income:''
      // date:''
      // endDate: (this.state.d).setMonth((this.state.d).getMonth()+1)

    }
  }


  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  handleChange2 = date => {
    this.setState({
      endDate: date
    });
  };

  componentWillMount(){
    this.get_income()
  }

  get_income = async () => {
    try {
        await get('product/get_income', null).then((result) => {
            if (result.success) {
                this.setState({
                    income: result.result,
                    // search_promotion: result.result

                })
                setTimeout(() => {
                    console.log("income", result.result)
                }, 500)
            } else {
                window.location.href = "/";
                //alert("user1"+result.error_message);
            }
        });
    } catch (error) {
        alert(error);
    }
}




  render() {
    return (
      <div>

        <div style={{
          display: 'flex',
          width: "100%",
          marginTop: 10,
          justifyContent: "center"
        }} >
          <table>
            <tr>
              <td>

                เลือกวันที่  
                <DatePicker
                  selected={this.state.startDate}
                  onChange={this.handleChange} //only when value has changed
                  dateFormat='d/M/y'
                  selectsStart
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  showYearDropdown
                  showMonthDropdown
                  isClearable
                />
                ถึงวันที่   
                <DatePicker
                  selected={this.state.endDate}
                  onChange={this.handleChange2} //only when value has changed
                  dateFormat='d/M/y'
                  endDate={this.state.endDate}
                  minDate={this.state.startDate}
                  selectsEnd
                  showYearDropdown
                  showMonthDropdown
                  isClearable

                />
              </td>
            </tr>
          </table>
        </div>
        <table style={{ border: "1px solid #ccc" }} >
          <tr style={{ border: "1px solid #ccc" }} >
            <th>วันที่</th>
            <th>รายรับ</th>
            <th>รายจ่าย</th>
            <th>คงเหลือ</th>
          </tr>
          <tr style={{ border: "1px solid #ccc" }}>
            <td>{moment().format('l')}</td>
            <td>111</td>
            <td style={{ textAlign: "left" }}>22</td>
            <td>333</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <th>รวม</th>
            <td>100</td>
          </tr>

        </table>
      </div>



    );
  }
}

export default income;