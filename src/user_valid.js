import React, { Component } from 'react';
import { user_token } from './support/Constance';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, CardGroup } from 'react-bootstrap';
import queryString from 'query-string';
import { get, ip, post } from './service/service';

class user_valid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            user: '',
            name: '',
            user_type: '',
            last_name: '',
            email: '',
            address: '',
            phone_number: '',
            user_id: null,
            delete_id: null,
            index_delete: null,
            default_user_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2S47oPrtWI_lK68iwye6EW3Q9GMRPoCQPw4vlObBssUl355pLMg"
        }
    }

    user_valid = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'user/user_person', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        data: result.result
                    })
                    setTimeout(() => {
                        console.log("data", result.result)
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

    componentWillMount() {
        this.user_valid()
    }


    


    render() {
        return (

            <Card className="text-center" style={{ width: '50rem', }}>
                <Card.Img variant="top" src="https://react.semantic-ui.com/images/avatar/large/daniel.jpg" />

                {/* {this.state.data.map((element, index) => {
                    return ( */}
                <Card.Body >
                    <Card.Title>ชื่อผู้ใช้: {this.state.data.user}</Card.Title>
                    <Card.Text>ชื่อ-สกุล: {this.state.data.name} {this.state.data.last_name}</Card.Text>
                    <Card.Text>อีเมล: {this.state.data.email}</Card.Text>
                    <Card.Text>ที่อยู่: {this.state.data.address}</Card.Text>
                    <Card.Text>เบอร์โทร: {this.state.data.phone_number}</Card.Text>
                    <Card.Text>ประเภทผู้ใช้: {this.state.data.user_type}</Card.Text>
                    
                    <NavLink to={"update_person?user_id=" + this.state.data.user_id}><Button variant="primary">แก้ไขข้อมูล</Button></NavLink>
                    <NavLink to="/show_user"><Button variant="primary" type="cancle">ยกเลิก</Button></NavLink>
                </Card.Body>
                {/* )
                })} */}

            </Card>

        );
    }
}

export default user_valid;