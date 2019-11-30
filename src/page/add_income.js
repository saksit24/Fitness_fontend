import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment'
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { post } from '../service/service'
import "react-datepicker/dist/react-datepicker.css";

class get_money extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            type_income: null,
            detail_income: null,
            price_income: null

        }
    }

    add_income = async () => {
        let object = {
            date_income: moment(this.state.startDate).format(),
            type_income: this.state.type_income,
            detail_income: this.state.detail_income,
            price_income: this.state.price_income,

        };
        console.log('check', object)
        if (object.type_income == null) {
            swal('กรุณาเลือกประเภทรายการ', "", "error");
        }
        else if (object.price_income == null) {
            swal('กรุณากรอกจำนวนเงิน', "", "error");

        }
        else {
            try {
                await post(object, "product/add_income", null).then(result => {
                    console.log("promotion", result);

                    if (result.success) {
                        swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                        setTimeout(() => { window.location.href = "/add_income" }, 1500)
                    } else {
                        swal(result.error_message, "", "error");
                    }
                });
            } catch (error) {
                alert('error', error);
            }
            // console.log("Signup" + this.state);
        }

    }

    handleChange = date => {
        this.setState({
            startDate: date
        });
    };

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    ondropdown = (event) => {
        console.log("event", event.target.value)

        this.setState({
            type_income: event.target.value
        })
    }


    render() {
        return (
            <div >

                <div className="con">
                    <h1>เพิ่มรายรับเพิ่มเติม</h1>
                    <label style={{ fontSize: 25 }}>ประเภทรายการ</label>
                    <select onChange={this.ondropdown} name="day_sup" style={{ fontSize: 20 }} >
                        <option value="9" disabled selected hidden>กรุณาเลือกประเภทรายการ</option>
                        <option value="0">รายรับ</option>
                        <option value="1">รายจ่าย</option>
                    </select>
                    <label style={{ fontSize: 25 }}>จำนวนเงิน</label>
                    <input style={{ fontSize: 20 }}
                        name="price_income"
                        onChange={this.oninput}
                        type="text"
                        placeholder="กรุณากรอกจำนวนเงิน"></input>
                    {/* {console.log('check', this.state.name_main)} */}
                    <label style={{ fontSize: 25 }}>วันที่</label>
                    <br />
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        dateFormat='d/M/y'
                        showYearDropdown
                        showMonthDropdown
                    />
                    {/* {console.log('date', moment(this.state.startDate).format('l'))} */}
                    {/* <input style={{ fontSize: 20 }} name="price_main" onChange={this.oninput} type="text" placeholder="กรุณากรอกราคา" /> */}
                    <br />
                    <label style={{ fontSize: 25 }}>รายละเอียด</label>
                    <textarea style={{ fontSize: 20 }}
                        name="detail_income"
                        onChange={this.oninput}
                        type="text"
                        placeholder="กรุณากรอกรายละเอียด" />

                </div>
                <div >
                    <button className="btn-group" onClick={this.add_income}>เพิ่ม</button>

                </div>
            </div>
        );
    }
}

export default get_money;