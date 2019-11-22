import React, { Component } from 'react';
import '../App.css'
import { post, get } from '../service/service';
import moment from 'moment'
import { Button } from 'semantic-ui-react'
import { MDBIcon } from "mdbreact"
import swal from 'sweetalert';
import queryString from 'query-string';

class detal_bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_slip: [],
            data_product: [],
            product: [],
            //
            show_addtocart: [],
            getmoney: 0,
            data_product: [],
            search_product: [],
            name_product: '',
            delete_id: null,
            index_delete: null,
            image_product: null,
            quantity: 1,
            // sum: 0,
            sum_price: [],
            get_quantity: null,
            code_product: '',
            date_product: '',
            type_product: '',
            price_product: '',
            stock_product: '',
            quantity_product: '',
            price_product: '',
            sum_price_product: '',
            get_price_product: '',
            change_price_product: '',
            user:'',
            get_product: null,
            isInEdit: false,
            // get_quantity:"",
        }
    }



    componentWillMount() {
        this.get_detail_slip();
        this.get_slip_product();
        this.get_product();
    }


    get_detail_slip = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'product/get_detail_slip', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_slip: result.result,
                    })
                    setTimeout(() => {
                        console.log("get_detail_slip", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            // alert(error);
        }
    }

    get_slip_product = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'product/get_slip_product', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_product: result.result,
                    })
                    setTimeout(() => {
                        console.log("data_product", result.result)
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


    get_product = async () => {
        try {
            await get('product/get_product', null).then((result) => {
                if (result.success) {
                    this.setState({
                        product: result.result

                    })
                    setTimeout(() => {
                        console.log("get_product", result.result)
                    }, 500)
                } else {
                    window.location.href = "/";
                }
            });
        } catch (error) {
            swal(error, "", "success");

        }
    }

    //รวมเงิน
    sum_data = (data) => {
        let sum = 0
        data.map((data_element) => {
            sum = (data_element.price_product * data_element.get_quantity) + sum
        })
        return sum;
    }
    //รับเงิน
    get_money = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    //จำนวนสินค้า
    handleChange_quantity = (event) => {
        let show_addtocart = this.state.show_addtocart
        show_addtocart[event.target.name].get_quantity = parseInt(event.target.value)
        this.setState({
            show_addtocart: show_addtocart,

        })
    }

    //เพิ่มสินค้าลงตะหร้า
    addproducttocart = (addtocart) => {
        let cart_data = this.state.show_addtocart
        let index = cart_data.findIndex((el) => el.code_product === addtocart.code_product)
        if (index === -1) {
            cart_data.push({
                code_product: addtocart.code_product,
                // date_product: moment().utc(+7).format('L LT'),
                name_product: addtocart.name_product,
                type_product: addtocart.type_product,
                price_product: addtocart.price_product,
                get_quantity: 1,
                stock_product: addtocart.stock_product
            })
        } else {
            cart_data[index].get_quantity = cart_data[index].get_quantity + 1
        }
        this.setState({
            show_addtocart: cart_data
        }

        )
    }

    //บันทึก
    onsave = () => {
        if (this.state.getmoney < this.sum_data(this.state.show_addtocart) || this.state.getmoney === 0) {
            swal("กรุณากรอกจำนวนให้เงินเพียงพอ", "", "error");
        }
        else {
            this.slip_product()
        }
    }


    render() {
        return (
            <div>
                <br />
                <div>
                    <table>
                        <tr>
                            <th>หมายเลขที่</th>
                            <td>{this.state.data_slip.order_id}</td>
                            <th>วันที่/เวลา</th>
                            <td>{moment(this.state.data_slip.date).format('D/M/Y  เวลา  HH:mm')}</td>
                            <th>ยืนยันการขายโดย</th>
                            <td>{this.state.data_slip.user}</td>
                        </tr>
                    </table>
                    <table style={{ border: "1px solid #000" }}>
                        <tr style={{ border: "1px solid #000" }}>
                            <th style={{ border: "1px solid #000" }}>ลำดับ</th>
                            {/* <th style={{ border: "1px solid #000" }}>วันที่</th> */}
                            <th style={{ border: "1px solid #000" }}>รหัสสินค้า</th>
                            <th style={{ border: "1px solid #000" }}>ชื่อสินค้า</th>
                            <th style={{ border: "1px solid #000" }}>ประเภท</th>
                            <th style={{ border: "1px solid #000" }}>จำนวน</th>
                            <th style={{ border: "1px solid #000" }}>ราคา</th>
                            <th style={{ border: "1px solid #000" }}>ราคารวม</th>
                            {/* <th style={{ border: "1px solid #000" }}>หมายเหตุ</th> */}
                        </tr>
                        {/* {
                            this.state.show_addtocart.map((element, index) => {
                                return (

                                    <tr style={{ border: "1px solid #000" }}> {console.log("show_addtocart", this.state.show_addtocart)}
                                        <td style={{ border: "1px solid #000", textAlign: "center" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #000", textAlign: "center" }}>{element.code_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.name_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.type_product}</td>
                                        <td style={{ border: "1px solid #000" }}><input max={element.stock_product} min="1" type="number" name={index} id="quantity" value={element.get_quantity} onChange={this.handleChange_quantity} /></td>
                                        <td style={{ border: "1px solid #000" }}>{element.price_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.price_product * element.get_quantity}</td>
                                        <td style={{ border: "1px solid #000" }}><button type='submit' onClick={() => { this.deleteproduct(index) }}><MDBIcon icon="times-circle" /></button></td>
                                    </tr>
                                )
                            })
                        } */}
                        {
                            this.state.data_product.map((element, index) => {
                                return (
                                    <tr style={{ border: "1px solid #000" }}>
                                        <td style={{ border: "1px solid #000", textAlign: "center" }}>{index + 1}</td>
                                        <td style={{ border: "1px solid #000", textAlign: "center" }}>{element.code_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.name_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.type_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.quantity_product} </td>
                                        <td style={{ border: "1px solid #000" }}>{element.price_product}</td>
                                        <td style={{ border: "1px solid #000" }}>{element.price_product * element.quantity_product}</td>
                                        {/* <td style={{ border: "1px solid #000" }}><button type='submit' onClick={() => { this.deleteproduct(index) }}><MDBIcon icon="times-circle" /></button></td> */}
                                    </tr>
                                )
                            })
                        }
                    </table>

                </div>
                <br />
                <div>
                    <table style={{ border: "1px solid #000" }}>
                        <tr style={{ border: "1px solid #000" }}>
                            <th style={{ border: "1px solid #000" }}>ราคารวมสินค้าทั้งหมด</th>
                            <th style={{ border: "1px solid #000" }}> {this.state.data_slip.sum_price_product}   บาท</th>
                        </tr>
                        <tr style={{ border: "1px solid #000" }}>
                            <th style={{ border: "1px solid #000" }}>จำนวนเงินที่รับ</th>
                            <th style={{ border: "1px solid #000" }}>{this.state.data_slip.get_price_product}</th>
                        </tr>
                        <tr style={{ border: "1px solid #000" }}>
                            <th style={{ border: "1px solid #000" }}>จำนวนเงินทอน</th>
                            <th style={{ border: "1px solid #000" }}>{this.state.data_slip.change_price_product} บาท</th>
                        </tr>

                    </table>
                </div>
                <br />
                <div style={fromstyle}>
                    <Button type='submit'  >บันทึก</Button>
                    <Button type='submit'  >บันทึกคอร์ส</Button>
                </div>
                <br />
            </div >
        );
    }
}

export default detal_bill;


const fromstyle = {
    marginLeft: 750,

}