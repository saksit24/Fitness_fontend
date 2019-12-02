import React, { Component } from 'react';
import { post } from './service/service'
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';


class add_course_sup extends Component {
    constructor() {
        super();
        this.state = {

            time_start_sup: null,
            time_end_sup: null,
            course_sup: null,
            location_sup: null,
            day_sup: null,

        }
    }

    add_course_sup = async () => {
        let object = {

            time_start_sup: this.state.time_start_sup,
            time_end_sup: this.state.time_end_sup,
            course_sup: this.state.course_sup,
            location_sup: this.state.location_sup,
            day_sup: this.state.day_sup,
        };

        try {
            await post(object, "course/sup", null).then(result => {
                console.log("promotion", result);

                if (result.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_course_sup" }, 1500)
                } else {
                    swal(result.error_message, "", "error");
                }
            });
        } catch (error) {
            alert('error', error);
        }
        // console.log("Signup" + this.state);
    }

    ondropdown = (event) => {
        console.log("event", event.target.value)
       
        this.setState({
            day_sup: event.target.value
        })
    }



    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div >

                <div className="con">

                    <label style={{ fontSize: 25 }}>เวลาเริ่มต้น</label>
                    <input style={{ fontSize: 20 }}
                        name="time_start_sup"
                        onChange={this.oninput}
                        type="text"
                        placeholder="กรุณากรอกเวลาเริ่มต้น"></input>
                    {console.log('check', this.state.time_start_sup)}
                    {/* <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleChange}
                        showTimeSelect
                        showMonthDropdown
                        showYearDropdown
                        // locale="th"
                        dateFormat="d/m/y p"
                        timeIntervals={10}
                    /> */}
                    {/* <div style={{ width: 900, marginLeft: 200 }}> */}

                    {/* </div> */}

                    <label style={{ fontSize: 25 }}>เวลาสิ้นสุด</label>
                    <input style={{ fontSize: 20 }} name="time_end_sup" onChange={this.oninput} type="text" placeholder="กรุณากรอกเวลาสิ้นสุด" />
                    <label style={{ fontSize: 25 }}>ชื่อคอร์ส</label>
                    <input style={{ fontSize: 20 }} name="course_sup" onChange={this.oninput} type="text" placeholder="กรุณากรอกชื่อคอร์ส" />
                    <label style={{ fontSize: 25 }}>สถานที่</label>
                    <input style={{ fontSize: 20 }} name="location_sup" onChange={this.oninput} type="text" placeholder="กรุณากรอกสถานที่" />
                    <label style={{ fontSize: 25 }} >วัน</label>
                    <select onChange={this.ondropdown} name="day_sup" style={{ fontSize: 20 }} >
                        <option value="0" disabled selected hidden>กรุณาเลือกวัน</option>
                        <option value="1">วันอาทิตย์</option>
                        <option value="2">วันจันทร์</option>
                        <option value="3">วันอังคาร</option>
                        <option value="4">วันพุธ</option>
                        <option value="5">วันพฤหัสบดี</option>
                        <option value="6">วันศุกร์</option>
                        <option value="7">วันเสาร์4555</option>

                    </select>

                </div>

                <div >
                    <button className="btn-group" onClick={this.add_course_sup}>เพิ่ม</button>
                    
                </div>
            </div>
        )
    }
}

export default add_course_sup