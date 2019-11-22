import React, { Component } from 'react';
import { user_token } from './support/Constance';
import { NavLink } from 'react-router-dom';
import { Tabs, Tab, Form, Col, Button, Card, InputGroup, DropdownButton, Dropdown, FormControl, CardGroup } from 'react-bootstrap';
import queryString from 'query-string';
import { get, ip, post } from './service/service';
import swal from 'sweetalert';

class update_person extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data_user:'',
            user: null,
            name: null,
            last_name: null,
            phone_number: null,
            email: null,
            address: null,
            user_type: null,
           
           
         }
         this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillMount() {
        this.get_user_update();
    }

    get_user_update = async () => {
        let url = this.props.location.search
        let param = queryString.parse(url)
        console.log('par', param)
        try {
            await post(param, 'user/get_user_update', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        data_user: result.result
                    })
                    setTimeout(() => {
                        console.log("data", result.result)
                    }, 500)
                } else {
                    // window.location.href = "/";
                    //alert("user1"+result.error_message);
                }
            });
        } catch (error) {
            alert('สวัสดีเออเรอร์โชว์ยูสเซอร์',error);
        }
    }

    edit = async () => {
       
        let object = {
            user_id: this.state.data_user.user_id,
            user: this.state.data_user.user,
            name: this.state.data_user.name,
            last_name: this.state.data_user.last_name,
            phone_number: this.state.data_user.phone_number,
            email: this.state.data_user.email,
            address: this.state.data_user.address,
            user_type: this.state.data_user.user_type,
            
        };
        console.log('op', object)

        try {
            await post(object, "user/update_user_person", user_token).then(res => {
                if (res.success) {
                 console.log("dataResss", res.res)
                    swal("บันทึกข้อมูลเรียบร้อย", "", "success");
                    window.location.href = "user_valid?user_id=" + this.state.data_user.user_id;
                    // setTimeout(()=>{window.location.href ="user_valid?user_id=" + this.state.data_user.user_id;},1500) 
                    
                } else {
                    swal(res.error_message, "", "error");
                    // alert("edit_alert : " + res.error_message);
                    
                }
            });
        } catch (error) {
            alert('สวัสดีเออเรอร์ของedit(>catch)',error);
            console.log('error',error)

        }
        console.log("edit2", object);
    }

    handleInputChange(e, a) {
        const target = e.target;
        const value = target.value;
        const name = target.name;


        let data_user = this.state.data_user
        data_user[name] = value
        this.setState({
            data_user: data_user
        });
    }

    






    render() { 
        return ( 
            <Card style={{ display:'box', width: '50rem',}}>
                <Card.Body>
                    <Card.Title style={{fontSize:30}}>สมัครสมาชิก</Card.Title>
                    <Form>     
                    <Form.Group >
                            <Form.Label style={{float:'left'}}>ชื่อผู้ใช้</Form.Label>
                            <Form.Control  
                            placeholder="กรุณากรอกชื่อผู้ใช้" 
                            value={this.state.data_user.user} 
                            type="text"
                            id="user" 
                            name="user"
                            onChange={this.handleInputChange}
                            />{console.log('id_ch',this.state.data_user.user_id)}
                            {console.log('check',this.state.data_user.user)}
                            
                            
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label style={{float:'left'}}>ชื่อ</Form.Label>
                                <Form.Control  
                                name="name"  
                                placeholder="กรุณากรอกชื่อ"
                                type="text"
                                value={this.state.data_user.name} 
                                id="name" 
                                onChange={this.handleInputChange} />
                                 {console.log('check2',this.state.data_user.name)}
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label style={{float:'left'}}>นามสกุล</Form.Label>
                                <Form.Control  
                                name="last_name"  
                                onChange={this.handleInputChange}  
                                placeholder="กรุณากรอกนามสกุล"
                                value={this.state.data_user.last_name} 
                                id="last_name" 
                                type="text" />
                                 {console.log('check3',this.state.data_user.last_name)}
                            </Form.Group>
                        </Form.Row>
                        <Form.Group >
                            <Form.Label style={{float:'left'}}>ที่อยู่</Form.Label>
                            <Form.Control  
                            name="address" 
                            onChange={this.handleInputChange} 
                            placeholder="กรุณากรอกที่อยู่" 
                            id="address"
                            type="text"
                            value={this.state.data_user.address}/>
                             {console.log('check4',this.state.data_user.address)}
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} >
                                <Form.Label style={{float:'left'}}>อีเมล</Form.Label>
                                <Form.Control  
                                name="email"  
                                type="text"
                                onChange={this.handleInputChange} 
                                placeholder="example@example.com" 
                                id="email"
                                value={this.state.data_user.email} />
                                 {console.log('check5',this.state.data_user.email)}
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label style={{float:'left'}}>ประเภท</Form.Label>
                                <Form.Control onChange={this.handleInputChange} id="user_type"  name="user_type" as="select">
                                <option  value="0" disabled selected hidden>{this.state.data_user.user_type}</option>
                                    <option  value="1">1</option>
                                    <option  value="2">2</option>
                                    <option  value="3">3</option>
                                    <option  value="4">4</option>
                                    {console.log('check6',this.state.data_user.user_type)}
                                </Form.Control>
                             
                            </Form.Group>

                            <Form.Group as={Col} >
                                <Form.Label style={{float:'left'}}>เบอร์โทรศัพท์</Form.Label>
                                <Form.Control  
                                name="phone_number" 
                                onChange={this.handleInputChange} 
                                placeholder="กรุณากรอกเบอร์โทรศัพท์" 
                                id="phone_number"
                                type="text"
                                value={this.state.data_user.phone_number} />
                                 {console.log('check7',this.state.data_user.phone_number)}
                            </Form.Group>
                        </Form.Row>

                        
                        
                  
                        <Button variant="primary" type="submit" onClick={() => this.edit()}>ยืนยัน</Button>
                        <NavLink to={"user_valid?user_id=" + this.state.data_user.user_id}><Button variant="primary" type="cancle">ยกเลิก</Button></NavLink>
        
                    </Form>
                </Card.Body>

            </Card>
         );
    }
}
 
export default update_person;