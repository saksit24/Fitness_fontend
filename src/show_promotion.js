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



class get_promotoion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_promotion: [],
      search_promotion: [],
      name_promotion: '',
      delete_id: null,
      index_delete: null,
      image_promotion: null,
      date_promotion: '',
      detail_promotion:'',
      get_promotion: null,
      default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
    };
  }

  // show = (id, index) => this.setState({ open: true, delete_id: id, index: index })
  // handleCancel = () => this.setState({ result: 'cancelled', open: false })

  filterProduct = (event) => {

    var updatedList = this.state.data_promotion;
    updatedList = updatedList.filter(function (item) {
      return item.name_promotion.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    console.log(updatedList)
    this.setState({
      search_promotion: updatedList,
    });
  }

  get_promotion = async () => {
    try {
      await get('promotion/get_promotion', null).then((result) => {
        if (result.success) {
          this.setState({
            data_promotion: result.result,
            search_promotion: result.result

          })
          setTimeout(() => {
            console.log("get_promotion", result.result)
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
    let promotion_data_array = this.state.data_promotion

    let index = promotion_data_array.findIndex((element) => {
      return element.id_promotion === delete_id
    })

    promotion_data_array.splice(index, 1)
    this.setState({ data_promotion: promotion_data_array })
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
          
          swal("ลบโปรโมชันเรียบร้อย!", {
            icon: "success",
          });
          setTimeout(()=>{window.location.reload()},1000)
        } else {
          //swal("ยกเลิกการลบโปรโมชัน!");
        }
      });

  }

  delete = async (delete_id) => {
    let object = {
      id_promotion: delete_id

    }
    try {
      await post(object, 'promotion/delete_promotion', null).then((res) => {
        if (res.success) {
          //swal("ลบโปรโมชั่นเรียบร้อย", "", "success");
          // window.location.href = "/product";
          this.delete_array(delete_id)
          // this.get_promotion()
        } else {
          console.log(res.error_message)
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
  //   delete_product = async (id_product) => {
  //     let object = {
  //       id_product: id_product
  //     }
  //     try {
  //         await post(object, 'product/delete_product', null).then((result) => {
  //             if (result.success) {
  //                 alert(result.message)
  //                 // window.location.href = "/delete_product";
  //             }
  //             else {
  //                 window.location.href = "/";
  //                 alert(result.error_message)
  //             }
  //         })
  //     }
  //     catch (error) {
  //         // alert("delete_cart_product_tarde" + error);
  //     }
  // }
  onalert = () => {
    alert('แก้ไขข้อมูลแล้ววววววววววว')
  }

  componentWillMount() {
    this.get_promotion()
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
            name='search_promotion'
            onChange={this.filterProduct}
            placeholder='ค้นหาโปรโมชั่น...' />
        </div>
        <table style={{ border: "1px solid #ccc" }} >
          <tr style={{ border: "1px solid #ccc" }} >
            <th>ลำดับ</th>
            <th>รูปภาพ</th>
            <th>วันที่เพิ่ม</th>
            <th>ชื่อโปรโมชั่น</th>
            <th>รายละเอียด</th>
            <th>ลบ/แก้ไข</th>
          </tr>
          {
            this.state.search_promotion ?
              this.state.search_promotion.map((element, index) => {
                return (

                  <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                    <td>{element.image_promotion ? <img style={{ width: "150px", height: "200px" }} src={ip + element.image_promotion} />
                      : <img style={{ width: "150px", height: "150px" }} src={element.default_user_image} />}</td>
                      <td>{moment(element.date_promotion).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td style={{ textAlign: "left" }}>{element.name_promotion}</td>
                    
                    <td>{element.detail_promotion}</td>    
                    <td>
                      <button className="btn-show" onClick={() => this.check_sure(element.id_promotion, index)} ><MDBIcon icon="trash-alt" /></button>
                      <NavLink to={"update_promotion?id_promotion=" + element.id_promotion}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink></td>
                    {/* <Confirm open={this.state.open} content='Are you sure to "Delete"' onCancel={this.handleCancel} onConfirm={() => this.delete()} /> */}
                  </tr>

                )
              })
              :
              this.state.data_promotion.map((element, index) => {
                return (
                  <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                    <td>{element.image_promotion ? <img style={{ width: "150px", height: "200px" }} src={ip + element.image_promotion} />
                      : <img style={{ width: "150px", height: "150px" }} src={element.default_user_image} />}</td>
                        <td>{moment(element.date_promotion).format('DD/MM/YYYY HH:mm:ss')}</td>
                    <td style={{ textAlign: "left" }}>{element.name_promotion}</td>
                    <td>{element.detail_promotion}</td>    
                    <td>
                      <button className="btn-show" onClick={() => this.check_sure(element.id_promotion, index)} ><MDBIcon icon="trash-alt" /></button>
                      <NavLink to={"update_promotion?id_promotion=" + element.id_promotion}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink></td>
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
export default get_promotoion;