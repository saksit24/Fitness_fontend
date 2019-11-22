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



class get_course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: [],
      name_main: '',
      delete_id: null,
      index_delete: null,
      // image_promotion: null,
      date_promotion: '',
      detail_main:'',
      price_main: null,
      get_course: null,
    };
  }

  filterProduct = (event) => {

    var updatedList = this.state.data;
    updatedList = updatedList.filter(function (item) {
      return item.name_main.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    console.log(updatedList)
    this.setState({
      search: updatedList,
    });
  }

  get_course = async () => {
    try {
      await get('course/all_course', null).then((result) => {
        if (result.success) {
          this.setState({
            data: result.result,
            search: result.result

          })
          setTimeout(() => {
            console.log("get_course", result.result)
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
    let course_array = this.state.data

    let index = course_array.findIndex((element) => {
      return element.id_main === delete_id
    })

    course_array.splice(index, 1)
    this.setState({ data: course_array })
    // this.setState({ result: 'confirmed', open: false })
  }

  // check_sure = () => {
  //   swal({
  //     title: "Are you sure?",
  //     text: "Once deleted, you will not be able to recover this imaginary file!",
  //     icon: "warning",
  //     buttons: true,
  //     dangerMode: true,
  //   })
  //     .then((willDelete) => {
  //       if (willDelete) {
  //         this.delete()
  //         swal("Poof! Your imaginary file has been deleted!", {
  //           icon: "success",
  //         });
  //       } else {
  //         swal("Your imaginary file is safe!");
  //       }
  //     });

  // }
  delete = async (delete_id) => {
    let object = {
      id_main: delete_id

    }
    try {
      await post(object,'course/delete_course', null).then((res) => {
        if (res.success) {
          swal("ลบคอร์สเรียบร้อย", "", "success");
          // window.location.href = "/product";
          this.delete_array(delete_id)
          // this.get_course()
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
  onalert = () => {
    alert('แก้ไขข้อมูลแล้ววววววววววว')
  }

  componentWillMount() {
    this.get_course()
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
            placeholder='ค้นหาชื่อคอร์ส...' />
        </div>
        <table style={{ border: "1px solid #ccc" }} >
          <tr style={{ border: "1px solid #ccc" }} >
            <th>ลำดับ</th>
            {/* <th>วันที่เพิ่ม</th> */}
            <th>ชื่อโปรโมชั่น</th>
            <th>รายละเอียด</th>
            <th>ราคาคอร์ส</th>
            <th>ลบ/แก้ไข</th>
          </tr>
          {
            this.state.search ?
              this.state.search.map((element, index) => {
                return (

                  <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                      {/* <td>{moment(element.date_promotion).format('DD/MM/YYYY HH:mm:ss')}</td> */}
                    <td style={{ textAlign: "left" }}>{element.name_main}</td>
                    <td>{element.detail_main}</td>   
                    <td>{element.price_main}</td>  
                    <td>
                      <button className="btn-show" onClick={() => this.delete(element.id_main, index)} ><MDBIcon icon="trash-alt" /></button>
                      <NavLink to={"update_course?id_main=" + element.id_main}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink>
                    </td>
                    
                  </tr>

                )
              })
              :
              
              this.state.data.map((element, index) => {
                return (
                    <tr style={{ border: "1px solid #ccc" }}>
                    <td>{index + 1}</td>
                      {/* <td>{moment(element.date_promotion).format('DD/MM/YYYY HH:mm:ss')}</td> */}
                    <td style={{ textAlign: "left" }}>{element.name_main}</td>
                    <td>{element.detail_main}</td>   
                    <td>{element.price_main}</td>  
                    <td>
                      <button className="btn-show" onClick={() => this.delete(element.id_main, index)} ><MDBIcon icon="trash-alt" /></button>
                      <NavLink to={"update_course?id_main=" + element.id_main}><button className="btn-show"><MDBIcon icon="edit" /></button></NavLink>
                    </td>
                    
                  </tr>
                )
              })
          }

        </table>

      </div>
    )
  }
}
export default get_course;