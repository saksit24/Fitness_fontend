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
            data_product: '',
            id_product: null,
            name_product: null,
            image_product: null,
            code_product: null,
            date_product: null,
            type_product: null,
            capital_price_product: null,
            price_product: null,
            stock_product: null,
            open_up: false,
            edit_image: false,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount() {
        this.get_product_update();
    }

    get_product_update = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'product/get_product_update', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_product: result.result
                    })

                    setTimeout(() => {
                        console.log("get_product_update", result.result)
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
            id_product: this.state.data_product.id_product,
            name_product: this.state.data_product.name_product,
            code_product: this.state.data_product.code_product,
            type_product: this.state.data_product.type_product,
            price_product: this.state.data_product.price_product,
            capital_price_product: this.state.data_product.capital_price_product,
            stock_product: this.state.data_product.stock_product,
            image_product: this.state.data_product.image_product
        };
        console.log('ss', object)
        try {
           
            await post(object, "product/update_product", null).then(res => {
                console.log("edit1", res);
                if (res.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(()=>{window.location.href = "/show_product"},1500)
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


        let data_product = this.state.data_product
        data_product[name] = value
        this.setState({
            data_product: data_product
        });
    }
    uploadpicture = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {
        } else {
            reader.readAsDataURL(file)
            reader.onloadend = () => {
                console.log("img", reader.result)
                let data_product = this.state.data_product
                data_product.image_product = reader.result
                this.setState({
                    data_product: data_product
                });
            }
        }
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



    render() {
        return (
            <div className="con">
                {this.state.data_product.image_product ? <Image size='small' src={this.onrenderimage(this.state.data_product.image_product)} />
                    : <Image size='small' src={this.state.default_user_image} />}
                <input width={5} type="file" onChange={this.uploadpicture} />
                <div >
                    <br />
                    <label>รหัสสินค้า</label>
                    <input
                        value={this.state.data_product.code_product}
                        placeholder='กรุณากรอกรหัสสินค้า'
                        type="text" id="code_product" name="code_product"
                        onChange={this.handleInputChange}
                        width='2'></input>
                    {console.log('check11', this.state.data_product.code_product)}
                    <label>ชื่อสินค้า</label>
                    <input
                        value={this.state.data_product.name_product}
                        placeholder='กรุณากรอกชื่อสินค้า'
                        type="text" id="name_product"
                        name="name_product"
                        onChange={this.handleInputChange}
                        width={5}></input>

                    <label>ชนิดสินค้า</label>
                    {/* <input
                        value={this.state.data_product.type_product}
                        placeholder='กรุณากรอกชนิดสินค้า'
                        type="text" id="type_product" name="type_product"
                        onChange={this.handleInputChange}
                        width={5}></input> */}
                    <select onChange={this.handleInputChange} id="type_product" name="type_product" style={{ fontSize: 15 }} >
                        <option value="0" disabled selected hidden>{this.state.data_product.type_product}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>

                    </select>
                    <label>จำนวนสินค้า</label>
                    <input
                        value={this.state.data_product.stock_product}
                        placeholder='กรุณากรอกจำนวนสินค้า'
                        type="text" id="stock_product" name="stock_product"
                        onChange={this.handleInputChange}
                        width={5}></input>
                    <label>ราคาทุน</label>
                    <input
                        value={this.state.data_product.capital_price_product}
                        placeholder='กรุณากรอกราคาทุน'
                        type="text" id="capital_price_product" name="capital_price_product"
                        onChange={this.handleInputChange}
                        width={5}></input>
                    <label>ราคาขาย</label>
                    <input
                        value={this.state.data_product.price_product}
                        placeholder='กรุณากรอกราคาขาย'
                        type="text" id="price_product" name="price_product"
                        onChange={this.handleInputChange}
                        width={5}></input>
                </div>


                <td >
                    <button className="btn-update" onClick={() => this.edit()} >บันทึก</button>

                    <NavLink to="/show_product"><button className="btn-update" >ยกเลิก</button></NavLink>
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



