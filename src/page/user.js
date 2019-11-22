import React, { Component } from 'react';
import { get, ip } from '../service/service';
import '../App.css';
import { user_token } from '../support/Constance';
import { NavLink } from 'react-router-dom';
import { Image, Button, Form } from 'semantic-ui-react';


class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            gender: '',
            name_eng: '',
            personal_id: '',
            name: '',
            last_name: '',
            email: '',
            phone_number: '',
            address: '',
            user_type: '',
            get_user: [],
            user_id: null,
            isInEdit: false,
            image_profile: '',
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        };
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
            case "1":
                render_user = <div > Admin </div>
                break;
            case "2":
                render_user = <div > พนักงาน </div>
                break;
            case "3":
                render_user = <div > ผู้ใช้ทั่วไป  </div>
                break;
            case "4":
                render_user = <div > เทรนเนอร์ </div>
                break;

            default:
                render_user = <div className="FontDanger"> เกิดข้อผิดพลาด </div>
                break;
        }
        return render_user
    }


    get_user = async () => {
        try {
            await get('user/user_valid', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    componentWillMount() {
        this.get_user()
    }

    render() {
        return (
            <div>
                <div>
                    
                    <div className="col-12">
                        <h1>ข้อมูลผู้ใช้งาน</h1>
                    </div>
                </div>

                <div className="Row">
                    <div className="col-3" />
                    <div className="col-6">
                        {
                            this.state.get_user.map((e, index) => {
                                return (
                                   
                                    <div >

{e.image_profile ? <img style={{ width: "150px", height: "200px" }} src={ip + e.image_profile} />
                      : <img style={{ width: "150px", height: "150px" }} src={e.default_user_image} />}
                                    {/* {this.state.image_profile ? <Image size='small' src={ip + this.state.image_profile}/>
                                         :<Image src={"https://react.semantic-ui.com/images/avatar/large/daniel.jpg"} size='medium' circular/>} */}

                                        <table >
                                        <tr>
                                                <th>ชื่อผู้ใช้งาน</th>
                                                <td>{e.user ? e.user : null}</td>

                                            </tr>
                                            <tr >
                                                <th>ชื่อ - นามสกุล</th>
                                                <td>{e.name ? e.name : null} {e.last_name ? e.last_name : null}</td>
                                            </tr>
                                            <tr>
                                                <th>ชื่อภาษาอังกฤษ</th>
                                                <td>{e.name_eng ? e.name_eng : null}</td>
                                            </tr>
                                            <tr>
                                                <th>เลขบัตรประจำตัวประชาชน</th>
                                                <td>{e.personal_id ? e.personal_id : null}</td>
                                            </tr>
                                            <tr>
                                                <th>เพศ</th>
                                                <td>{e.gender ? e.gender : null}</td>
                                            </tr>
                                            <tr>
                                                <th>ประเภทผู้ใช้งาน</th>
                                                <td>{this.render_type(e.user_type)}</td>

                                            </tr>
                                            <tr>
                                                <th>อีเมล์</th>
                                                <td>{e.email}</td>
                                            </tr>
                                            <tr>
                                                <th>เบอร์โทรศัพท์</th>
                                                <td>{e.phone_number ? e.phone_number : null}</td>
                                            </tr>
                                            
                                            <tr>
                                                <th>ที่อยู่</th>
                                                <td>{e.address ? e.address : null}</td>
                                            </tr>
                                            
                                            
                                        </table>

                                        
                                        <NavLink to={"edit_profile?user_id=" + e.user_id}><button className="btn-group">แก้ไขข้อมูลส่วนตัว</button></NavLink>
                                        <NavLink to={"edit_password?user_id=" + e.user_id}><button className="btn-group">แก้ไขรหัสผ่าน</button></NavLink>

                                        {console.log("e=", e.user_id)}
                                    </div>

                                )
                            })
                        }
                    </div>

                    <div className="col-3"></div>



                </div>





            </div>



        )
    }
}

export default User;