import React, { Component } from 'react';
import './App.css';
// import { Input, Image, Table, Card, Button, Confirm, Form } from 'semantic-ui-react'
import { Image, Button, Form } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import swal from 'sweetalert';
// import moment from 'moment'
import queryString from 'query-string';
import { get, ip, post } from './service/service';
import { updateLocale } from 'moment';
import { th } from 'date-fns/locale';


class UpdateProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: [],
            name_main: '',
            detail_main: '',
            price_main: null,
            get_course: null,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount() {
        this.get_main_update();
    }

    get_main_update = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'course/get_main_update', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result
                    })

                    setTimeout(() => {
                        console.log("get_main_update", result.result)
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
    edit = async () => {

        let object = {
            name_main: this.state.data.name_main,
            price_main: this.state.data.price_main,
            detail_main: this.state.data.detail_main,
            id_main:this.state.data.id_main
        };
        console.log('ss', object)
        try {

            await post(object, "course/update_main", null).then(res => {
                console.log("edit1", res);
                if (res.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/chack_course" }, 1500)
                } else {
                    swal(res.error_message, "", "error");
                    // alert("edit_alert : " + res.error_message);

                }
            });
        } catch (error) {
            alert(error);

        }
        console.log("edit2", object);
    }




    handleInputChange(e, a) {
        const target = e.target;
        const value = target.value;
        const name = target.name;


        let data = this.state.data
        data[name] = value
        this.setState({
            data: data
        });
    }



    render() {
        return (
            <div className="con">
                <div >
                    <br />
                    <label style={{ fontSize: 25 }}>ชื่อคอร์ส</label>
                    <input style={{ fontSize: 20 }}
                        name="name_main"
                        value={this.state.data.name_main}
                        onChange={this.handleInputChange}
                        type="text"
                        placeholder="กรุณากรอกชื่อคอร์ส"></input>
                  

                    <label style={{ fontSize: 25 }}>ราคา</label>
                    <input style={{ fontSize: 20 }}  value={this.state.data.price_main} name="price_main" onChange={this.handleInputChange} type="text" placeholder="กรุณากรอกราคา" />
                    <label style={{ fontSize: 25 }}>รายละเอียด</label>
                    <textarea style={{ fontSize: 20 }} value={this.state.data.detail_main} name="detail_main" onChange={this.handleInputChange} type="text" placeholder="กรุณากรอกรายละเอียด" />

                </div>


                <td >
                    <button className="btn-update" onClick={() => this.edit()} >บันทึก</button>

                    <NavLink to="/chack_course"><button className="btn-update" >ยกเลิก</button></NavLink>
                </td>
            </div>



        )

    }
}
export default UpdateProduct;

const formStyle = {
    marginLeft: 300,
    marginTop: 100,
    marginRight: 300
}



