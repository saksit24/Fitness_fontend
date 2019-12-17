import React, { Component, useState } from 'react';
import DatePicker from "react-datepicker";
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import { get, ip, post } from '../service/service'
import { MDBIcon, MDBBtn } from "mdbreact"
import "react-datepicker/dist/react-datepicker.css";

class income extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      income: [],
      sum: ''
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

  componentWillMount() {
    // this.get_income()
  }

  get_income = async () => {
    let ob = {
      dateStart: moment(this.state.startDate).format("YYYY-MM-DD"),
      dateEnd: moment(this.state.endDate).format("YYYY-MM-DD")
    }
    console.log(ob)
    try {
      await post(ob, 'product/income', null).then((result) => {
        if (result.success) {
          // this.time_check(result.result)
          this.setState({
            income: result.result
          })
          console.log("income", result.result)
        } else {
          // window.location.href = "/";
          alert("user1" + result.error_message);
        }
      });
    } catch (error) {
      alert(error);
    }
  }


  sum_data = () => {
    let sum = 0
    let sum2 = 0
    let sum1 = 0
    this.state.income.map((data_element) => {
      sum1 = data_element.price_income + sum1
      sum2 = data_element.price_pay + sum2
      sum = sum1 - sum2
      // this.setState({
      //   sum: sum
      // })
    })
    return sum;
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
                  maxDate={new Date()}
                  selectsEnd
                  showYearDropdown
                  showMonthDropdown
                  isClearable
                />
                <MDBBtn color="unique" rounded size="md" type="submit" className="mr-auto" onClick={() => this.get_income()}>
                  <MDBIcon size='2x' icon="search" />
                </MDBBtn>
              </td>
            </tr>
          </table>
        </div>
        <table style={{ border: "1px solid #ccc" }} >
          <tr style={{ border: "1px solid #ccc" }} >
            <th>รายการที่</th>
            <th>วันที่</th>
            <th>รายรับ</th>
            <th>รายจ่าย</th>
            <th>คงเหลือ</th>
          </tr>
          {this.state.income.map((element, index) => {
            return (
              <tr style={{ border: "1px solid #ccc" }}>
                <td>{index + 1}</td>
                <td>{moment(element.date_income).format('l')}</td>
                <td>{element.price_income}</td>
                <td>{element.price_pay}</td>
                <td>{element.price_income - element.price_pay}</td>
                {/* <td>{this.render_type(element.type_income)}</td> */}
              </tr>
            )
          })
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <th style={{ fontSize: 25 }}>รวม</th>
            <td style={{ fontSize: 25 }}>{this.sum_data()}</td>
          </tr>

        </table>
      </div>



    );
  }
}

export default income;