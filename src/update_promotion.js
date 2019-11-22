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
            data_promotion: '',
            id_promotion: null,
            name_promotion: null,
            image_promotion: null,
            detail_promotion: null,
            date_promotion: null,
        
         
          
            open_up: false,
            edit_image: false,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount() {
        this.get_promotion_update();
    }

    get_promotion_update = async () => {
        let url = this.props.location.search
        let params = queryString.parse(url)
        console.log('par', params)
        try {
            await post(params, 'promotion/get_promotion_update', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_promotion: result.result
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

    // update=()=> {
    //     this.setState({
    //         name_promotion: this.state.data_promotion.name_promotion,
    //         detail_promotion: this.state.data_promotion.detail_promotion,
    //         type_product: this.state.data_promotion.type_product,
    //         price_product: this.state.data_promotion.price_product,
    //         capital_price_product: this.state.data_promotion.capital_price_product,
    //         stock_product: this.state.data_promotion.stock_product,

    //     });
    //     if (this.state.data_promotion.image_promotion) {
    //         this.setState({
    //             default_user_image: ip + this.state.data_promotion.image_promotion
    //         })
    //     }
    // }


    // onSubmit(e) {
    //     const new_product = {
    //         name_promotion: this.refs.name_promotion.value,
    //         detail_promotion: this.refs.state.detail_promotion.value,
    //         type_product: this.refs.state.type_product.value,
    //         price_product: this.refs.state.price_product.value,
    //         capital_price_product: this.refs.state.capital_price_product.value,
    //         stock_product: this.refs.state.stock_product.value,
    //     }
    //     this.edit(new_product);
    //     e.preventDefault();
    // }

    edit = async () => {
        // if(this.state.edit_image){
        //     var image_promotion = this.state.default_user_image
        // }
        // else{
        //     var image_promotion = 0
        // }
        // if (this.state.open_up){
        let object = {
            id_promotion: this.state.data_promotion.id_promotion,
            name_promotion: this.state.data_promotion.name_promotion,
            detail_promotion: this.state.data_promotion.detail_promotion,
            image_promotion: this.state.data_promotion.image_promotion
        };
        console.log('ss', object)

        try {
            await post(object, "promotion/update_promotion", null).then(res => {
                console.log("edit1", res);
                if (res.success) {
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    setTimeout(()=>{window.location.href = "/show_promotion";},1500)
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


        let data_promotion = this.state.data_promotion
        data_promotion[name] = value
        this.setState({
            data_promotion: data_promotion
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
                let data_promotion = this.state.data_promotion
                data_promotion.image_promotion = reader.result
                this.setState({
                    data_promotion: data_promotion
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
                {this.state.data_promotion.image_promotion ? <Image size='small' src={this.onrenderimage(this.state.data_promotion.image_promotion)} />
                    : <Image size='small' src={this.state.default_user_image} />}
                <input width={5} type="file" onChange={this.uploadpicture} />
                <div >
                    <br />
                    <label>ชื่อโปรโมชั่น</label>
                    <input
                        value={this.state.data_promotion.name_promotion}
                        placeholder='กรุณากรอกชื่อโปรโมชั่น'
                        type="text" id="name_promotion"
                        name="name_promotion"
                        onChange={this.handleInputChange}
                        width={5}></input>
                    <label>รายละเอียดโปรโมชั่น</label>
                    <textarea
                        value={this.state.data_promotion.detail_promotion}
                        placeholder='กรุณากรอกรายละเอียดโปรโมชั่น'
                        type="text" id="detail_promotion" name="detail_promotion"
                        onChange={this.handleInputChange}
                        width='2'></textarea>
                    {console.log('check11', this.state.data_promotion.detail_promotion)}
                   

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