import React, { Component } from 'react';
import { post } from './service/service'
import './App.css';
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';


class add_course extends Component {
    constructor() {
        super();
        this.state = {
         
            name_main: null,
            detail_main: null,
            price_main: null,

        }
    }

    add_course = async () => {
        let object = {
            id_product: null,
            name_main: this.state.name_main,
            detail_main: this.state.detail_main,
            price_main: this.state.price_main
        };

        try {
            await post(object, "course/main", null).then(result => {
                console.log("promotion", result);

                if (result.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_course" }, 1500)
                } else {
                    swal(result.error_message, "", "error");
                }
            });
        } catch (error) {
            alert('error', error);
        }
        // console.log("Signup" + this.state);
    }

    

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div >
                        
                <div className="con">

                    <label style={{ fontSize: 25 }}>ชื่อคอร์ส</label>
                    <input style={{ fontSize: 20 }} 
                    name="name_main" 
                    onChange={this.oninput} 
                    type="text" 
                    placeholder="กรุณากรอกชื่อคอร์ส"></input>
                    {console.log('check', this.state.name_main)}
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
                   
                    <label style={{ fontSize: 25 }}>ราคา</label>
                    <input style={{ fontSize: 20 }} name="price_main" onChange={this.oninput} type="text" placeholder="กรุณากรอกราคา" />
                    <label style={{ fontSize: 25 }}>รายละเอียด</label>
                    <textarea style={{ fontSize: 20 }} name="detail_main" onChange={this.oninput} type="text" placeholder="กรุณากรอกรายละเอียด" />
                
                </div>

                <div >
                    <button className="btn-group" onClick={this.add_course}>เพิ่ม</button>
                    
                </div>
            </div>
        )
    }
}

export default add_course