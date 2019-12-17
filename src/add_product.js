import React, { Component } from 'react'
import { post } from './service/service'
import './App.css'
import swal from 'sweetalert';
import { Tabs, Tab } from 'react-bootstrap'



class FormExampleForm extends Component {
    constructor() {
        super();
        this.state = {
            pro_image: null,
            type_product: null,
            name_product: null,
            code_product: null,
            capital_price_product: null,
            price_product: null,
            stock_product: null,
            date_product: null,
            image_product: null
        }
    }

    add_product = async () => {
        let object = {
            id_product: null,
            name_product: this.state.name_product,
            price_product: this.state.price_product,
            capital_price_product: this.state.capital_price_product,
            type_product: this.state.type_product,
            stock_product: this.state.stock_product,
            code_product: this.state.code_product,
            image_product: this.state.pro_image
        };

        try {
            await post(object, "product/add_product", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("เพิ่มสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_product" }, 1000)

                } else {
                    alert('error ' + result.error_message);
                }
            });
        } catch (error) {
            alert('error :', error);
        }
        // console.log("Signup" + this.state);
    }



    add_product_course = async () => {
        let object = {
            name_product: this.state.name_product,
            price_product: this.state.price_product,
        };
        try {
            await post(object, "product/add_product_course", null).then(result => {
                console.log("product", result);
                if (result.success) {
                    swal("เพิ่มสินค้าเรียบร้อย", "", "success");
                    setTimeout(() => { window.location.href = "/add_product" }, 1000)

                } else {
                    alert('error ' + result.error_message);
                }
            });
        } catch (error) {
            alert('error :', error);
        }
        // console.log("Signup" + this.state);
    }




    uploadpicture = (e) => {

        let reader = new FileReader();
        let file = e.target.files[0];
        if (!file) {

        } else {
            reader.readAsDataURL(file)

            reader.onloadend = () => {
                console.log("img", reader.result)
                this.setState({
                    pro_image: reader.result
                });
            }
        }

    }
    oninput = (event) => {

        this.setState({ [event.target.name]: event.target.value })

    }
    insertproduct = () => {

    }
    ondropdown = (event) => {
        console.log("event", event.target.value)

        this.setState({
            type_product: event.target.value
        })
    }

    ondropdown_c = (event) => {
        console.log("event", event.target.value)

        this.setState({
            name_product: event.target.value
        })
    }
    // onsubmit=()=>{
    //         alert('submit success !!')        
    // }



    render() {

        return (
            <div>
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className='justify-content-center' >
                    <Tab eventKey="1" title="เพิ่มสินค้า">
                        <div className="con">
                            <label style={{ fontSize: 25 }} >ประเภท</label>
                            <select onChange={this.ondropdown} style={{ fontSize: 20 }} >
                                <option value="0" disabled selected hidden>กรุณาเลือกประเภท</option>
                                <option value="1">เครื่องดื่ม</option>
                                <option value="2">อาหาร</option>
                                <option value="3">เวย์โปรตีน</option>
                                <option value="4">อื่นๆ</option>
                            </select>

                            <label style={{ fontSize: 25 }} >รหัสสินค้า</label>
                            <input style={{ fontSize: 20 }} name="code_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกรหัสสินค้า"></input>
                            <label style={{ fontSize: 25 }}>ชื่อสินค้า</label>
                            <input style={{ fontSize: 20 }} name="name_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกชื่อสินค้า"></input>
                            <label style={{ fontSize: 25 }}>ราคาทุน(ทั้งหมด)</label>
                            <input style={{ fontSize: 20 }} name="capital_price_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกราคาทุน"></input>
                            <label style={{ fontSize: 25 }}>ราคาขาย/ชิ้น</label>
                            <input style={{ fontSize: 20 }} name="price_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกราคาขาย"></input>
                            <label style={{ fontSize: 25 }}>จำนวน</label>
                            <input style={{ fontSize: 20 }} name="stock_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกจำนวน"></input>
                            {
                                this.state.pro_image ? <img style={{ width: "150px", height: "150px", display: "block", marginLeft: "auto", marginRight: "auto" }} src={this.state.pro_image} /> : null
                            }
                            <br />
                            <input type="file" onChange={this.uploadpicture} />
                        </div>
                        <div >

                            <button className="btn-group" onClick={this.add_product}>เพิ่มสินค้า</button>
                        </div>
                    </Tab>
                    <Tab eventKey="2" title="เพิ่มคอร์ส">
                        <div className="con">
                            <label style={{ fontSize: 25 }} >ประเภท</label>
                            <select onChange={this.ondropdown_c} style={{ fontSize: 20 }} >
                                <option value="0" disabled selected hidden>กรุณาเลือกประเภท</option>
                                <option value="1">รายครั้ง</option>
                                <option value="2">รายเดือน</option>
                                <option value="3">รายปี</option>

                            </select>
                            <label style={{ fontSize: 25 }}>ราคา</label>
                            <input style={{ fontSize: 20 }} name="price_product" onChange={this.oninput} type="text" placeholder="กรุณากรอกราคา"></input>


                        </div>
                        <div >

                            <button className="btn-group" onClick={() => this.add_product_course()}>เพิ่มคอร์ส</button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
        )
    }
}
export default FormExampleForm;


