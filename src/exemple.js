import React, { Component } from 'react';
import '../App.css';
import { post } from '../service/service';
import { user_token } from '../support/Constance';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';
import { MDBInput } from "mdbreact";



class Edit_password extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: null,
            new_password: null,
            c_new_password: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = () => {
        // perform all neccassary validations
        if (this.state.new_password !== this.state.c_new_password) {
            alert("รหัสผ่านไม่ตรงกัน");
        } else {
            this.edit();
            // this.setState ({ _password : this.state.new_password })
            // this.edit();
            // console.log("edit_submit : " + this.state.password + "   edit : " + this.state.new_password + "   edit : " + this.state._password);
        }

    }

    edit = async () => {
        let object = {
            password: this.state.password,
            new_password: this.state.new_password
        };
        console.log("obj_pass : " + object.password + "   obj_newpass : " + object.new_password + "   obj__pass : " + object._password)
        try {
            await post(object, "user/update_password", user_token)
                .then(res => {
                    console.log("res", res)
                    if (res.success) {
                        swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                        setTimeout(() => { window.location.href = "/user" }, 1000)
                    } else {
                        alert("error 2 : " + res.error_message);
                    }
                });
        } catch (error) {
            alert("error3" + error);
        }
    }


    render() {
        return (
            <div>
                <h1> เปลี่ยนรหัสผ่าน </h1>
                <div onSubmit={this.handleSubmit}>
                    <div >
                        <MDBInput label="รหัสผ่านเก่า" icon="lock-open"  id="password"  onChange={this.handleChange} />
                        {/* <input
                            style={{ color: '#f4511e' }}
                            
                            

                            placeholder="Enter your password"
                            
                            
                        /> */}
                    </div>
                    <div>
                        <MDBInput label="รหัสผ่านใหม่" icon="key"  id="new_password" onChange={this.handleChange} />
                        {/* <input
                            style={{ color: '#f4511e' }}
                            
                            

                            placeholder="Enter your new password"
                            
                            onChange={this.handleChange}
                        /> */}
                    </div>

                    <div>
                        <MDBInput label="ยืนยันรหัสผ่าน" icon="unlock"  id="c_new_password" onChange={this.handleChange} />
                        {/* <input
                            style={{ color: '#f4511e' }}
                            
                            

                            placeholder="Enter your new password agian"
                            
                            onChange={this.handleChange}

                        /> */}
                    </div>
                </div>
                <button className="btn-group" color="danger" outline color="success"
                    onClick={
                        () => this.handleSubmit(
                            this.state.password,
                            this.state.new_password,
                            this.state.c_new_password
                        )
                    }>ยืนยัน

                </button>
                
                <NavLink to="/user"><button className="btn-group" color="danger">ยกเลิก</button></NavLink>
            </div>
        );
    }
}

export default Edit_password;