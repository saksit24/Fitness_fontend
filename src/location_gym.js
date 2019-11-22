import React, { Component } from 'react';
import './App.css';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
import { post } from './service/service';



class location_gym extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_gym: '',
            name_gym: null,
            address_gym: null,
            phone_1: null,
            phone_2: null,
            fb_gym: null,
            email_gym: null,

        }
        //    this.handleInputChange = this.handleInputChange.bind(this);
    }
    // componentWillMount() {
    //     this.get_gym_update();
    // }

    // get_gym_update = async () => {
    //     let url = this.props.location.search
    //     let params = queryString.parse(url)
    //    // console.log('par', params)
    //     try {
    //         await post(params, 'app/add_gym', null).then((result) => {
    //             if (result.success) {
    //                 this.setState({
    //                     data_product: result.result
    //                 })

    //                 setTimeout(() => {
    //                  //   console.log("get_gym_update", result.result)
    //                 }, 500)
    //             } else {
    //                 window.location.href = "/";
    //                 //alert("user1"+result.error_message);
    //             }
    //         });
    //     } catch (error) {
    //         alert(error);
    //     }
    // }

    edit = async () => {
       // if (this.state.name_gym != null&&this.state.address_gym != null&&this.state.phone_1 != null&& this.state.phone_2 != null&& this.state.fb_gym != null&& this.state.email_gym != null) {

           let object = {
                name_gym: this.state.name_gym,
                address_gym: this.state.address_gym,
                phone_1: this.state.phone_1,
                phone_2: this.state.phone_2,
                fb_gym: this.state.fb_gym,
                email_gym: this.state.email_gym,

            };
      //  } else {
        //    swal("กรุณากรอกข้อมูลให้ครบถ้วน", "", "error");
    //}

        console.log('ss', object)
        try {

            await post(object, "app/add_gym", null).then(res => {
                // console.log("edit1", res);
                if (res.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/" }, 1500)
                } else {
                    swal(res.error_message, "", "error");
                    // alert("edit_alert : " + res.error_message);

                }
            });
        } catch (error) {
            alert(error);

        }
        //  console.log("edit2", object);
    }
    oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }

    handleInputChange(e, a) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        let data_gym = this.state.data_gym
        data_gym[name] = value
        this.setState({
            data_gym: data_gym
        });
    }


    render() {
        return (
            <div className="con">

                <div >
                    <br />
                    <label>ชื่อร้าน</label>
                    <input
                        value={this.state.data_gym.name_gym}
                        placeholder='กรุณากรอกชือร้าน'
                        type="text" name="name_gym"
                        onChange={this.oninput}
                        width='2'></input>
                    {console.log('check11', this.state.name_gym)}
                    <label>ที่อยู่ร้าน</label>
                    <input
                        value={this.state.data_gym.address_gym}
                        placeholder='กรุณากรอกที่อยู่ร้าน'
                        type="text"
                        name="address_gym"
                        onChange={this.oninput}
                        width={5}></input>
                    <label>เบอร์โทร</label>
                    <input
                        value={this.state.data_gym.phone_1}
                        placeholder='กรุณากรอกเบอร์โทร'
                        type="text" name="phone_1"
                        onChange={this.oninput}
                        width={5}></input>
                    <label>เบอร์โทร</label>
                    <input
                        value={this.state.data_gym.phone_2}
                        placeholder='กรุณากรอกเบอร์โทร'
                        type="text" name="phone_2"
                        onChange={this.oninput}
                        width={5}></input>
                    <label>Facebook</label>
                    <input
                        value={this.state.data_gym.fb_gym}
                        placeholder='กรุณากรอก Facebook'
                        type="text" name="fb_gym"
                        onChange={this.oninput}
                        width={5}></input>
                    <label>Email</label>
                    <input
                        value={this.state.data_gym.email_gym}
                        placeholder='กรุณากรอก Email'
                        type="text" name="email_gym"
                        onChange={this.oninput}
                        width={5}></input>
                </div>


                <td >
                    <button className="btn-update" onClick={() => this.edit()}>อัพเดท</button>

                     <NavLink to="/homereal"><button className="btn-update" >ยกเลิก</button></NavLink>
                </td>
            </div>



        )

    }
}
export default location_gym;