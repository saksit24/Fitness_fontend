import React, { Component } from 'react';
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl } from 'react-bootstrap';
import swal from 'sweetalert';
import { post, get, ip } from './service/service'
import { user_token } from './support/Constance';
import { NavLink } from 'react-router-dom';

class show_user extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_user: [],
            search_user: [],
            search_user1: [],
            user: '',
            name: '',
            user_type: '',
            last_name: '',

            delete_id: null,
            index_delete: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
    }

    filterProduct = (event) => {

        var updatedList = this.state.data_user;
        updatedList = updatedList.filter(function (item) {
            return item.name.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;
        });
        console.log('sa', updatedList)
        this.setState({
            search_user: updatedList,
        });
    }

    filterProduct1 = (event) => {

        var updatedList = this.state.search_user;
        updatedList = updatedList.filter(function (item) {
            return item.user_type.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;

        });
        console.log(updatedList)
        this.setState({
            search_user: updatedList,

        });

        console.log('s0s', updatedList)
    }



    get_user = async () => {
        try {
            await get('user/show_user', null).then((result) => {
                if (result.success) {
                    this.setState({
                        data_user: result.result,
                        search_user: result.result

                    })
                    setTimeout(() => {
                        console.log("ss", result.result)
                    }, 500)
                } else {
                    window.location.href = "/show_user";
                }
            });
        } catch (error) {
            swal(error, "", "success");

        }
    }

    componentWillMount() {
        this.get_user()
    }

    onsearchinput = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }


    render() {
        return (
            <Form>
                <br />
                <Form.Row style={{ justifyContent: "center" }} >
                    {/* <Form.Control as="select" style={{ width:'200px'}} name='search_user1' onChange={this.filterProduct1} >
                    <option  value="0" disabled selected hidden>กรุณาเลือกประเภทผู้ใช้งาน</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </Form.Control> */}

                    <FormControl style={{ width: '20rem' }} name='search_user' onChange={this.filterProduct} placeholder='กรอกชื่อเพื่อค้นหา' icon='search' />
                </Form.Row>
                {this.state.search_user ?
                    this.state.search_user.map((element, index) => {
                        console.log(ip + element.image_profile)
                        return (
                            <Card style={{ width: '18rem' }}>
                                {element.image_profile ? <Card.Img style={{width:200,height:220}} variant="top" src={ip + element.image_profile} />
                                    :
                                    <Card.Img variant="top" style={{width:200,height:220}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg" />
                                }
                                 <Card.Body>
                                    <Card.Title>ประเภท: {element.user_type}</Card.Title>
                                    <Card.Text>username: {element.user}</Card.Text>
                                    <Card.Text>ชื่อ: {element.name} {element.last_name}</Card.Text>
                                    {/* <Button variant="primary" onClick={console.log("1212",  element.user_id)}>ตรวจสอบ</Button> */}
                                    <NavLink to={"user_valid?user_id=" + element.user_id}><Button variant="primary">ตรวจสอบ</Button></NavLink>
                                    {console.log("eee", element.user_id)}
                                </Card.Body>
                            </Card>

                        )
                    })
                    :
                    this.state.data_user.map((element, index) => {
                        return (
                            <Card style={{ width: '18rem' }}>
                                {element.image_profile ? <Card.Img style={{width:200,height:220}} variant="top" src={ip + element.image_profile} />
                                    :
                                    <Card.Img variant="top" style={{width:200,height:220}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg" />
                                }

                                <Card.Body>
                                    <Card.Title>ประเภท: {element.user_type}</Card.Title>
                                    <Card.Text>username: {element.user}</Card.Text>
                                    <Card.Text>ชื่อ: {element.name} {element.last_name}}</Card.Text>
                                    {/* <Button variant="primary" onClick={console.log("1212",  element.user_id)}>ตรวจสอบ</Button> */}
                                    <NavLink to={"user_valid?user_id=" + element.user_id}><Button variant="primary">ตรวจสอบ</Button></NavLink>
                                    {console.log("eee", element.user_id)}
                                </Card.Body>
                            </Card>

                        )
                    })}
            </Form>
        );
    }
}

export default show_user;