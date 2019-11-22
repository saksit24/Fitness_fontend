import React, { Component } from 'react';
import { post } from './service/service'
import './App.css';
import {DatePicker} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import swal from 'sweetalert';



class add_promotion extends Component {
    constructor() {
        super();
        this.state = {
            pro_image: null,
            name_promotion: null,
            detail_promotion: null,
            date_promotion: null,
            image_promotion: null,
            startDate: new Date()
        }
    }

    add_promotion = async () => {
        let object = {
            id_product: null,
            name_promotion: this.state.name_promotion,
            detail_promotion: this.state.detail_promotion,
            image_promotion: this.state.pro_image
        };

        try {
            await post(object, "promotion/add_promotion", null).then(result => {
                console.log("promotion", result);

                if (result.success) {
                    swal("เพิ่มสินค้าเรียบร้อย", "", "success");
                    setTimeout(()=>{window.location.href = "/add_product"},1000)
                } else {
                    alert('error ' + result.error_message);
                }
            });
        } catch (error) {
            alert('error', error);
        }
        // console.log("Signup" + this.state);
    }

    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    pro_image: reader.result
                });
            }
        }
    }

    

    handleChange = (date) => {
        this.setState({ startDate: date });
    }

    oninput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        return (
            <div >
                        
                <div className="con">

                    <label style={{ fontSize: 25 }}>ชื่อโปรโมชั่น</label>
                    <input style={{ fontSize: 20 }} name="name_promotion" onChange={this.oninput} type="text" placeholder="กรุณากรอกชื่อโปรโมชั่น"></input>
                    {console.log('check', this.state.name_promotion)}
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
                   
                    <label style={{ fontSize: 25 }}>รายละเอียด</label>
                    <textarea style={{ fontSize: 20 }} name="detail_promotion" onChange={this.oninput} type="text" placeholder="กรุณากรอกรายละเอียด" />
                    {
                        this.state.pro_image ? <img style={{ width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.pro_image} /> : null
                    }
                    <br />
                    <input type="file" onChange={this.uploadpicture} />
                </div>

                <div >
                    <button className="btn-group" onClick={this.add_promotion}>เพิ่ม</button>
                </div>
            </div>
        )
    }
}

export default add_promotion