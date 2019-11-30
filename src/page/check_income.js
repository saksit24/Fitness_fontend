import React, { Component } from 'react';
import { Input, Image, Table, Button, Confirm, Form, Icon, Radio } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import { get, ip, post } from '../service/service'
import swal from 'sweetalert';
import { MDBCloseIcon } from "mdbreact";
import { MDBIcon } from "mdbreact"

class pay_money extends Component {
    constructor(props) {
        super(props);
        this.state = {
            income: [],
            date_income: '',
            detail_income: '',
            price_income: '',
            type_income: '',
            income_get: ''
        }
    }

    componentWillMount() {
        this.get_income()
    }

    get_income = async () => {
        try {
            await get('product/get_income', null).then((result) => {
                if (result.success) {
                    this.setState({
                        income: result.result,
                        // search_promotion: result.result

                    })
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

    income_get = async () => {
        try {
            await get('product/income_get', null).then((result) => {
                if (result.success) {
                    this.setState({
                        income: result.result,
                        // search_promotion: result.result

                    })
                    setTimeout(() => {
                        console.log("income_get", result.result)
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

    income_pay = async () => {
        try {
            await get('product/income_pay', null).then((result) => {
                if (result.success) {
                    this.setState({
                        income: result.result,
                        // search_promotion: result.result

                    })
                    setTimeout(() => {
                        console.log("income_get", result.result)
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
            <div>

                <div style={{
                    display: 'flex',
                    width: "100%",
                    marginTop: 25,
                    justifyContent: "center"
                }} >
                    {/* <Input type="text" icon='search'
                        width="20"
                        name='search_promotion'
                        onChange={this.filterProduct}
                        placeholder='ค้นหาโปรโมชั่น...' /> */}
                </div>
                <table style={{ border: "1px solid #ccc" }} >
                    <tr style={{ border: "1px solid #ccc" }} >
                        <th>ลำดับ</th>
                        <th>วันที่</th>
                        <th>จำนวนราคา</th>
                        {/* <th>รายละเอียด</th> */}
                        <th>ประเภทรายการ</th>
                        <th>ตรวจสอบ</th>
                    </tr>
                    {
                        this.state.income.map((element, index) => {
                            return (
                                <tr style={{ border: "1px solid #ccc" }}>
                                    <td>{index + 1}</td>
                                    <td>{moment(element.date_income).format('l')}</td>
                                    <td style={{ textAlign: "left" }}>{element.price_income}</td>
                                    {/* <td>{element.detail_income}</td>     */}
                                    <td>{element.type_income == '0' ? <i class="fas fa-hand-holding-usd"> รายรับ</i> : <i class="far fa-credit-card"> รายจ่าย</i>}</td>
                                    <td>
                                        {/* <button className="btn-show" onClick={() => this.check_sure(element.id_promotion, index)} ><MDBIcon icon="trash-alt" /></button> */}
                                        <NavLink to={"edit_income?id_income=" + element.id_income}><button className="btn-show" style={{width:55,height:40}}><MDBIcon icon="edit" style={{justifyContent:'center'}} /></button></NavLink></td>
                                </tr>
                            )
                        })
                    }
                </table>
            </div>
        );
    }
}

export default pay_money;