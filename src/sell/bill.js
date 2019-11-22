import React, { Component } from 'react';
import '../App.css'
import { post, get } from '../service/service';
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import { MDBIcon } from "mdbreact"
import swal from 'sweetalert';
// import { element } from 'prop-types';
import { NavLink } from 'react-router-dom';


class check_slip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            order_id: '',
            date: '',
        }
    }

    componentWillMount() {
        this.get_slip()
    }


    get_slip = async () => {
        try {
            await get('product/get_slip', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result,
                    })
                    setTimeout(() => {
                        console.log("data_slip", result.result)
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

    render() {
        return (
            <table style={{ border: "1px solid #000" }}>
                <tr style={{ border: "1px solid #000" }}>
                    <th >ลำดับ</th>
                    <th >หมายเลข</th>
                    <th >วันที่/เวลา</th>
                    <th >ตรวจสอบ</th>
                </tr>
                {this.state.data.map((element, index) => {
                    return (
                        <tr style={{ border: "1px solid #000" }}>
                            <td >{index + 1}</td>
                            <td >{element.order_id}</td>
                            <td >{moment(element.date).format('D/M/Y เวลา HH:mm')}</td>
                            <td>
                                <NavLink to={"detail_bill?order_id=" + element.order_id}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink>
                            </td>
                        </tr>
                    )

                })}
            </table>
        );
    }
}

export default check_slip;