import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import moment from 'moment'
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { post, get } from '../service/service'
import "react-datepicker/dist/react-datepicker.css";
import queryString from 'query-string';


class get_money extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(),
            type_income: null,
            detail_income: null,
            price_income: null,
            data: '',
            date_income: null

        }
    }

    componentWillMount() {
        this.get_income()
    }

    get_income = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'product/get_up_income', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result
                    })
                    console.log('test',this.state.data)
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


    handleInputChange(e, a) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        console.log('val',value)
        console.log('anme',name)

        let dataa = this.state.data
        dataa[name] = value
        console.log('dsds',dataa[name])
        this.setState({
            data: dataa
        });
    }

    render() {
        return (
            <div >

                <div className="con">
                    <h1>เพิ่มรายรับเพิ่มเติม</h1>
                    <label style={{ fontSize: 25 }}>ประเภทรายการ</label>
                    <select onChange={this.handleInputChange} name="type_income" id="type_income" style={{ fontSize: 20 }} >
                        <option value="9" disabled selected hidden>{this.state.data.type_income=='0'? 'รายรับ' : 'รายจ่าย'}</option>
                        <option value="0">รายรับ</option>
                        <option value="1">รายจ่าย</option>
                    </select>
                    <label style={{ fontSize: 25 }}>จำนวนเงิน</label>
                    <input style={{ fontSize: 20 }}
                        name="price_income"
                        id="price_income"
                        onChange={this.handleInputChange}
                        value={this.state.data.price_income}
                        type="text"
                        placeholder="กรุณากรอกจำนวนเงิน"></input>
                    {/* {console.log('check', this.state.name_main)} */}
                    <label style={{ fontSize: 25 }}>วันที่</label>
                    <br/>
                    <DatePicker
                        selected={this.state.startDate}
                        value={moment(this.state.data.date_income).format('l')}
                        onChange={this.handleInputChange}
                        name="date_income"
                        id="date_income"
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
                        id="detail_income"
                        onChange={this.handleInputChange}
                        value={this.state.data.detail_income}
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