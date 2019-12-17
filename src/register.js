import React, { Component } from 'react';
import { Tabs, Tab, Form, Col, Button, Card } from 'react-bootstrap';
import swal from 'sweetalert';
import { post } from './service/service'
import { user_token } from './support/Constance';
import { NavLink } from 'react-router-dom';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import 'moment/locale/th';
import MomentLocaleUtils from 'react-day-picker/moment';

import moment from 'moment';


class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: null,
            last_name: null,
            phone_number: null,
            email: null,
            address: null,
            user_type: null,
            password: null,
            con_password: null,
            locale: 'th'
        }
        this.handleDayChange = this.handleDayChange.bind(this);
        this.state = {
            selectedDay: undefined,
        };
    }

    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    handleSubmit = () => {
        if (this.state.password !== this.state.con_password) {
            alert("รหัสผ่านไม่ตรงกัน");
        } else {
            this.register();

        }

    }

    register = async () => {
        let object = {
            user: this.state.user,
            name: this.state.name,
            last_name: this.state.last_name,
            phone_number: this.state.phone_number,
            email: this.state.email,
            address: this.state.address,
            user_type: this.state.user_type,
            password: this.state.password,
            con_password: this.state.con_password,
            name_eng: this.state.name_eng,
            last_name_eng: this.state.last_name_eng,
            gender: this.state.gender,
            dob: this.state.dob,
            personal_id: this.state.personal_id
        };
        console.log('test', object)
        try {
            await post(object, "user/register", user_token).then(result => {
                console.log("regis", result);
                if (result.success) {

                    swal("สมัครสมาชิกเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/register" }, 1000)

                } else {
                    alert('error ' + result.error_message);
                }
            });
        } catch (error) {
            alert('error : ' + error);
        }
    }

    oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }

    ondropdown = (event) => {
        console.log("event", event.target.value)
        this.setState({
            user_type: event.target.value
        })
    }
    ondropdown2 = (event) => {
        console.log("event", event.target.value)
        this.setState({
            gender: event.target.value
        })
    }



    render() {
        const { selectedDay } = this.state;
        return (<div className='kuy' style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>


            <Card>
                <Card.Body>
                    <Card.Title style={{ fontSize: 30 }}>สมัครสมาชิก</Card.Title>

                    {/* <Form> */}
                    <Form.Group >
                        <Form.Label style={{ float: 'left' }}>ชื่อผู้ใช้</Form.Label>
                        <Form.Control name="user" onChange={this.oninput} placeholder="กรุณากรอกชื่อผู้ใช้" />

                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>รหัสผ่าน</Form.Label>
                            <Form.Control name="password" onChange={this.oninput} type="password" placeholder="รหัสผ่าน" />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>ยืนยันรหัสผ่าน</Form.Label>
                            <Form.Control name="con_password" onChange={this.oninput} type="password" placeholder="ยืนยันรหัสผ่าน" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>ชื่อ (ภาษาไทย)</Form.Label>
                            <Form.Control name="name" onChange={this.oninput} placeholder="กรุณากรอกชื่อภาษาไทย" />
                        </Form.Group>
                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>นามสกุล (ภาษาไทย)</Form.Label>
                            <Form.Control name="last_name" onChange={this.oninput} placeholder="กรุณากรอกนามสกุลภาษาไทย" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>ชื่อ (ภาษาอังกฤษ)</Form.Label>
                            <Form.Control name="name_eng" onChange={this.oninput} placeholder="กรุณากรอกชื่อภาษาอังกฤษ" />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>นามสกุล (ภาษาอังกฤษ)</Form.Label>
                            <Form.Control name="last_name_eng" onChange={this.oninput} placeholder="กรุณากรอกนามสกุลภาษาอังกฤษ" />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <div>
                                {/* {selectedDay && <p>Day: {selectedDay.toLocaleDateString()}</p>}
                                    {!selectedDay && <p>Choose a day</p>} */}
                                {/* <DayPickerInput
                                        localeUtils={MomentLocaleUtils} locale={this.state.locale}
                                        onDayChange={this.handleDayChange} /> */}
                            </div>
                            {/* <input className="input-medium" type="text" data-provide="datepicker"></input> */}
                            {/* <input type="date" data-date-language="th-th" ></input> */}
                            <Form.Label style={{ float: 'left' }}>วัน/เดือน/ปี เกิด</Form.Label>
                            <Form.Control name="dob" onChange={this.oninput} placeholder="2540/10/24" />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>ประเภท</Form.Label>
                            <Form.Control name="gender" onChange={this.ondropdown2} as="select">
                                <option value="0" disabled selected hidden>กรุณาเลือกเพศ</option>
                                <option value="ชาย">ชาย</option>
                                <option value="หญิง">หญิง</option>
                            
                            </Form.Control>

                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>เลขบัตรประชาชน</Form.Label>
                            <Form.Control name="personal_id" onChange={this.oninput} placeholder="กรุณากรอกเลขประจำตัวประชาชน" />
                        </Form.Group>
                    </Form.Row>

                    <Form.Group >
                        <Form.Label style={{ float: 'left' }}>ที่อยู่</Form.Label>
                        <Form.Control name="address" onChange={this.oninput} placeholder="กรุณากรอกที่อยู่" />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>อีเมล</Form.Label>
                            <Form.Control name="email" onChange={this.oninput} placeholder="example@example.com" />
                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>ประเภท</Form.Label>
                            <Form.Control name="user_type" onChange={this.ondropdown} as="select">
                                <option value="0" disabled selected hidden>กรุณาเลือกประเภทผู้ใช้งาน</option>
                                <option value="1">ผู้ประกอบการ</option>
                                <option value="2">พนักงาน</option>
                                <option value="3">สมาชิก</option>
                                <option value="4">เทรนเนอร์</option>
                            </Form.Control>

                        </Form.Group>

                        <Form.Group as={Col} >
                            <Form.Label style={{ float: 'left' }}>เบอร์โทรศัพท์</Form.Label>
                            <Form.Control name="phone_number" onChange={this.oninput} placeholder="กรุณากรอกเบอร์โทรศัพท์" />
                        </Form.Group>
                    </Form.Row>



                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>ยืนยัน</Button>
                    <NavLink to="/homereal"><Button variant="primary" type="cancle">ยกเลิก</Button></NavLink>
                    {/* </Form> */}
                </Card.Body>

            </Card></div>
        );
    }
}

export default register;