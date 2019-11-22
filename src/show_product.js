import React, { Component } from 'react'
import { Input, Image, Table, Button, Confirm, Form, Icon } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import { get, ip, post } from './service/service'
import './App.css'
import swal from 'sweetalert';
import { MDBCloseIcon } from "mdbreact";
import {MDBIcon} from "mdbreact"
// import * as update from './update_product';



class get_product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_product: [],
      search_product: [],
      name_product: '',
      delete_id: null,
      index_delete: null,
      image_product: null,
      code_product: '',
      date_product: '',
      type_product: '',
      capital_price_product: '',
      price_product: '',
      stock_product: '',
      get_product: null,
      isInEdit: false,
      default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
    };
  }

  // show = (id, index) => this.setState({ open: true, delete_id: id, index: index })
  // handleCancel = () => this.setState({ result: 'cancelled', open: false })

  filterProduct = (event) => {

    var updatedList = this.state.data_product;
    updatedList = updatedList.filter(function (item) {
      return item.name_product.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    console.log(updatedList)
    this.setState({
      search_product: updatedList,
    });
  }

  get_product = async () => {
    try {
      await get('product/get_product', null).then((result) => {
        if (result.success) {
          this.setState({
            data_product: result.result,
            search_product: result.result

          })
          setTimeout(() => {
            console.log("get_product", result.result)
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
  delete_array = (delete_id) => {
    let product_data_array = this.state.data_product

    let index = product_data_array.findIndex((element) => {
      return element.id_product === delete_id
    })

    product_data_array.splice(index, 1)
    this.setState({ data_product: product_data_array })
    // this.setState({ result: 'confirmed', open: false })
  }

  check_sure = (id,index) => {
    swal({
      title: "คุณแน่ใจหรือไม่?",
      // text: "เมื่อลบแล้วจะไม่สามารถกู้คืนได้!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          this.delete(id)
          
          swal("ลบสินค้าเรียบร้อย!", {
            icon: "success",
          });
          setTimeout(()=>{window.location.reload()},1000)
        } else {
          //swal("ยกเลิกการลบสินค้า!");
        }
      });

  }


  delete = async (delete_id) => {
    let object = {
      id_product: delete_id

    }
    try {
      await post(object, 'product/delete_product', null).then((res) => {
        if (res.success) {
          //swal("ลบสินค้าเรียบร้อย", "", "success");
          // window.location.href = "/product";
          this.delete_array(delete_id)
          // window.location.reload()
          console.log(object)
          // this.get_product()
        } else {
          console.log("error",res.error_message)
        }
      })
    } catch (err) {
      console.log(object)
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  onsearchinput = (event) => {

    this.setState({ [event.target.name]: event.target.value })

  }

  onalert = () => {
    alert('แก้ไขข้อมูลแล้ววววววววววว')
  }

  componentWillMount() {
    this.get_product()
  }

  render() {
    // const { open, result } = this.state
    return (
      <div>

        <div style={{
          display: 'flex',
          width: "100%",
          marginTop: 25,
          justifyContent: "center"
        }} >
          <Input type="text" icon='search'
            width="20"
            name='search_product'
            onChange={this.filterProduct}
            placeholder='ค้นหาสินค้า...' />
        </div>
        <table style={{ border: "1px solid #ccc" }} >
          <tr style={{ border: "1px solid #ccc" }} >
            <th>ลำดับ</th>
            <th>รูปภาพ</th>
            <th>รหัส</th>
            <th>ชื่อสินค้า</th>
            <th>วันที่เพิ่ม</th>
            <th>ประเภท</th>
            <th>ราคาทุน</th>
            <th>ราคาขาย</th>
            <th>จำนวนสต็อก</th>
            <th>ลบ/แก้ไข</th>
          </tr>
          {
            this.state.search_product ?
              this.state.search_product.map((element, index) => {
                return (

                  <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                    <td>{element.image_product ? <img style={{ width: "150px", height: "200px" }} src={ip + element.image_product} />
                      : <img style={{ width: "150px", height: "150px" }} src={element.default_user_image} />}</td>
                    <td>{element.code_product}</td>
                    <td style={{ textAlign: "left" }}>{element.name_product}</td>
                    <td>{moment(element.date_product).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td>{element.type_product}</td>
                    <td>{element.capital_price_product}</td>
                    <td>{element.price_product}</td>
                    <td>{element.stock_product}</td>
                    <td>
                      <button className="btn-show" onClick={() => this.check_sure(element.id_product, index)} ><MDBIcon icon="trash-alt" /></button>

                      <NavLink to={"update_product?id_product=" + element.id_product}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink></td>
                    {/* <Confirm open={this.state.open} content='Are you sure to "Delete"' onCancel={this.handleCancel} onConfirm={() => this.delete()} /> */}
                  </tr>

                )
              })
              :
              this.state.data_product.map((element, index) => {
                return (
                  <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                    <td>{element.image_product ? <image style={{ width: "150px", height: "200px" }} src={ip + element.image_product} />
                      : <image style={{ width: "150px", height: "150px" }} src={element.default_user_image} />}</td>
                    <td>{element.code_product}</td>
                    <td>{element.name_product}</td>
                    <td>{moment(element.date_product).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td>{element.type_product}</td>
                    <td>{element.capital_price_product}</td>
                    <td>{element.price_product}</td>
                    <td>{element.stock_product}</td>
                    <td>
                      <button className="btn-show" onClick={() => this.check_sure (element.id_product, index)} ><MDBIcon icon="trash-alt" /></button>
                      <NavLink to={"update_product?id_product=" + element.id_product}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink></td>
                    {/* <Confirm open={this.state.open} content='Are you sure to "Delete"' onCancel={this.handleCancel} onConfirm={() => this.delete()} /> */}
                  </tr>
                )
              })
          }

        </table>

      </div>
    )
  }
}
export default get_product;