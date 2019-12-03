import React, { Component } from 'react';
import '../App.css'
import { post, get } from '../service/service';
import moment from 'moment'
// import { importDeclaration } from '@babel/types';
// import { Input, Image, Table, Card, Button, Confirm, Form, FormGroup, Popup, Label } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import { MDBIcon } from "mdbreact"
import swal from 'sweetalert';
import { user_token } from '../support/Constance';


const value_product = [];
const value_product_ = []

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      get_product: null,
      isInEdit: false,
      // get_quantity:"",
      default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
    };
  }

  deleteproduct = (index) => {

    this.setState(
      this.state.show_addtocart.splice(index, 1),
      // get_quantity: this.state.get_quantity-1
    )


    // swal("ลบสินค้าเรียบร้อย", "", "success");
  }

  sum_data = (data) => {
    let sum = 0
    data.map((data_element) => {
      sum = (data_element.price_product * data_element.get_quantity) + sum
    })
    return sum;
  }

  get_money = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  // addproduct = (add) => {
  //   this.setState({
  //     add: this.state.add + this.state.quantity
  //   })
  // }

  // getquantity = (get_quantity) => {
  //   this.setState({
  //     get_quantity: this.state.get_quantity + this.state.quantity
  //   })
  // }

  // getquantity = (e) => {
  //   this.setState({
  //     get_quantity:e.target.value
  //   })
  // }

  get_product = async () => {
    try {
      await get('product/get_product_sell', null).then((result) => {
        if (result.success) {
          this.setState({
            data_product: result.result

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

  // handleChange = (e, a) => {
  //   this.setState({
  //     [e.target.id]: e.target.value,

  //   })
  // }

  slip_product = async () => {
    let object = {
      order: this.state.show_addtocart,
      sum_price_product: this.sum_data(this.state.show_addtocart),
      get_price_product: this.state.getmoney,
      change_price_product: this.state.getmoney - this.sum_data(this.state.show_addtocart)
    };
    console.log("product", object);
    try {
      await post(object, "product/slip_product", user_token).then(result => {
        // console.log("product", result);

        if (result.success) {

          setTimeout(() => { window.location.href = "/home" }, 1000)
          swal("บันทึกเรียบร้อย", "", "success");
        } else {
          alert('error ' + result.error_message);
        }
      });
    } catch (error) {
      alert('error', error);
    }
    console.log("Signup" + this.state);
  }


  handleChange_quantity = (event) => {
    let show_addtocart = this.state.show_addtocart
    show_addtocart[event.target.name].get_quantity = parseInt(event.target.value)
    this.setState({
      show_addtocart: show_addtocart,

    })
  }




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
  componentWillMount() {
    this.get_product()
  }

  onsave = () => {
    if (this.state.getmoney < this.sum_data(this.state.show_addtocart) || this.state.getmoney === 0) {
      swal("กรุณากรอกจำนวนให้เงินเพียงพอ", "", "error");
    }
    else {
      this.slip_product()
    }
  }

  onprint = () => {

    swal("บันทึกแและพิมพ์เรียบร้อย", "", "success");
    setTimeout(() => { window.location.href = "/home" }, 1500)
  }


  render() {
    return (
      <div>
        <br />
        <div>
          {
            this.state.data_product.map((element) => {
              return (
                <div>
                  <div className="gallery button">

                    <div><button onClick={() => { this.addproducttocart(element) }}>
                      <div className="desc">{element.name_product}</div>
                      <div className="money"> ราคา : {element.price_product} บาท</div>
                    </button>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>


        <div>
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
              <th style={{ border: "1px solid #000" }}>หมายเหตุ</th>
            </tr>

            {
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
            }
          </table>

        </div>
        <br />
        <div>
          <table style={{ border: "1px solid #000" }}>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>ราคารวมสินค้าทั้งหมด</th>
              <th style={{ border: "1px solid #000" }}> {this.sum_data(this.state.show_addtocart)}   บาท</th>

            </tr>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>จำนวนเงินที่รับ</th>
              <th style={{ border: "1px solid #000" }}><input type="number" name="getmoney" min='0' id="getmoney" onChange={this.get_money} /></th>
            </tr>
            <tr style={{ border: "1px solid #000" }}>
              <th style={{ border: "1px solid #000" }}>จำนวนเงินทอน</th>
              <th style={{ border: "1px solid #000" }}>{this.state.getmoney - this.sum_data(this.state.show_addtocart) >= 0 ? this.state.getmoney - this.sum_data(this.state.show_addtocart) : "จำนวนเงินไม่เพียงพอ"} บาท</th>
            </tr>
          </table>
        </div>
        <br />
        <div style={fromstyle}>
          <Button type='submit' onClick={this.onsave} >บันทึก</Button>
          <Button type='submit' onClick={this.onprint} >บันทึกคอร์ส</Button>
        </div>
        <br />
      </div>


    );
  }
}
export default Home;

const fromstyle = {
  marginLeft: 750,

}