import React, { Component } from 'react';
import '../App.css';
import { get, post, ip } from '../service/service';
import { user_token } from '../support/Constance';
import { Image, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { NavLink } from 'react-router-dom';



class edit_profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            name: null,
            gender: null,
            name_eng: null,
            personal_id: null,
            last_name: null,
            email: null,
            phone_number: null,
            address: null,
            data_user: '',
            isInEdit: false,
            image_profile: null,
            default_image_profile: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    componentWillMount() {
        this.get_user();
    }

    get_user = async () => {
        try {
            await get('user/user_valid', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        data_user: result.result[0]
                    })
                    setTimeout(() => {
                        console.log("data_user111", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    edit = async () => {
        let object = {
            user: this.state.data_user.user,
            email: this.state.data_user.email,
            name: this.state.data_user.name,
            gender: this.state.data_user.gender,
            name_eng: this.state.data_user.name_eng,
            personal_id: this.state.data_user.personal_id,
           // last_name: this.state.data_user.last_name,
            phone_number: this.state.data_user.phone_number,
            address: this.state.data_user.address,
            image_profile: this.state.data_user.image_profile

        };
        console.log("edit2",object);

        try {
            await post(object, "user/update_user", user_token).then(res => {
                    console.log('ssssss',res)
                    if (res.success) {
                        swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                        setTimeout(() => { window.location.href = "/user" }, 1000)
                    } else {
                        alert("edit_alert : " + res.error_message);
                    }
                });
        } catch (error) {
            alert(error);
        }
        // console.log("edit2" + this.state);
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;


        let data_user = this.state.data_user
        data_user[name] = value
        this.setState({
            data_user: data_user
        });
    }

    onrenderimage = (image_url) => {

        let url = image_url
        var index = image_url.indexOf('data:image/');
        if (index === -1) {
            url = ip + image_url
        } else {
        }
        return url
    }


    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                let data_user = this.state.data_user
                data_user.image_profile = reader.result
                this.setState({
                    data_user: data_user
                });
            }
        }
    }
    // uploadpicture = (e) => {
    //     let reader = new FileReader();
    //     let file = e.target.files[0];
    //     if (!file) {

    //     } else {
    //         reader.readAsDataURL(file)

    //         reader.onloadend = () => {
    //             // console.log("img", reader.result)
    //             this.setState({
    //                 image_profile: reader.result
    //             });
    //         }
    //     }

    // }

    render() {
        return (
            <div>

                <h1> เปลี่ยนข้อมูลผู้ใช้ </h1>
                <div className="con">

                    <div >
                        <div>
                            {this.state.data_user.image_profile ? <Image size='small' src={this.onrenderimage(this.state.data_user.image_profile)} />
                                : <Image size='small' src={this.state.default_user_image} />}
                            <input width={5} type="file" onChange={this.uploadpicture} />
                            <div >
                                <label> ชื่อผู้ใช้ </label>
                                <input
                                  value={this.state.data_user.user}
                                    type="text"
                                    // id="user"
                                    placeholder="กรุณากรอกชื่อผู้ใช้งานใหม่"
                                    name="user"
                                    onChange={this.handleInputChange} />

                            </div>
                            {console.log("edit1", this.state.data_user.user)}

                            <div  >
                                <label > ชื่อ </label>
                                <input
                                    value={this.state.data_user.name}
                                    type="text"
                                    // id="name"
                                    placeholder="กรุณากรอกชื่อใหม่"
                                    name="name"
                                    onChange={this.handleInputChange} />
                            </div>

                            <div  >
                                <label > ชื่อภาษาอังกฤษ </label>
                                <input
                                    value={this.state.data_user.name_eng}
                                    type="text"
                                    placeholder="กรุณากรอกชื่อภาษาอังกฤษใหม่"
                                    name="name_eng"
                                    onChange={this.handleInputChange} />
                            </div>

                            <div  >
                                <label > เลขประจำตัวประชาชน </label>
                                <input
                                    value={this.state.data_user.personal_id}
                                    type="text"
                                    placeholder="กรุณากรอกเลขประจำตัวประชาชนใหม่"
                                    name="personal_id"
                                    onChange={this.handleInputChange} />
                            </div>

                            <div  >
                                <label > เพศ </label>
                                <input
                                    value={this.state.data_user.gender}
                                    type="text"
                                    placeholder="กรุณากรอกเลขประจำตัวประชาชนใหม่"
                                    name="gender"
                                    onChange={this.handleInputChange} />
                            </div>

                            {/* <div >
                                <label > นามสกุล </label>
                                <input
                                    value={this.state.data_user.last_name}
                                    type="text" id="last_name"
                                    placeholder="กรุณากรอกนามสกุลใหม่"
                                    name="last_name"
                                    onChange={this.handleInputChange} />
                            </div> */}

                            <div >
                                <label> E-mail </label>
                                <input
                                    value={this.state.data_user.email}
                                    type="text"
                                    // id="email"
                                    placeholder="กรุณากรอกอีเมล์ใหม่"
                                    name="email"
                                    onChange={this.handleInputChange} />
                            </div>

                            <div >
                                <label  > เบอร์โทรศัพท์ </label>
                                <input
                                    value={this.state.data_user.phone_number}
                                    type="text"
                                    // id="phone_number"
                                    placeholder="กรุณากรอกเบอร์โทรศัพท์ใหม่"
                                    name="phone_number"
                                    onChange={this.handleInputChange} />
                            </div>

                            <div >
                                <label > ที่อยู่ </label>
                                <input
                                    value={this.state.data_user.address}
                                    type="text"
                                    // id="address"
                                    placeholder="กรุณากรอกที่อยู่ใหม่"
                                    name="address"
                                    onChange={this.handleInputChange} />
                            </div>

                        </div>
                        {/* <div>
                            <label>รูปผู้ใช้</label>
                            <input type="file"
                                // value={this.state.image_profile ? <Image size='small' src={this.onrenderimage(this.state.image_profile)} />
                                //     : <Image size='small' src={this.state.default_user_image} />}
                                onChange={(e) => this.uploadpicture(e)} />

                        </div>

                        {
                            this.state.image_profile ?
                                <Image src={ip + this.state.image_profile} />
                                : <Image src={this.state.image_profile} />
                        } */}

                    </div>

                </div>

                <div >
                    <button className="btn-group" onClick={ () => this.edit() } color="success"> บันทึก</button>

                    <NavLink to="/user"><button className="btn-group" color="danger">ยกเลิก</button></NavLink>


                </div>
            </div>
        )
    }
}
export default edit_profile;