import React, { Component } from 'react';
import '../App.css';
import { Nav, Navbar, DropdownButton, Dropdown } from 'react-bootstrap';
import { user_token } from '../support/Constance';
import { get } from '../service/service';
import { MDBIcon } from "mdbreact"

class SingnedInLinks extends Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            get_user: [],
            isOpan: false
        };
    }

    componentWillMount() {
        this.get_user()
    }

    toggleNavbar() {
        this.setState({
            isOpan: !this.state.collapsed
        });
    }

    get_user = async () => {
        try {
            await get('user/user_valid', user_token).then((result) => {
                if (result.success) {
                    this.setState({
                        get_user: result.result
                    })
                    setTimeout(() => {
                        console.log("get_user", result.result)
                    }, 500)
                } else {

                }
            });
        } catch (error) {
            alert("get_user2" + error);
        }
    }

    render_type = (user_type) => {
        let render_user
        switch (user_type) {
            case "1":
                render_user =
                    <div>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                            <Navbar.Brand href="/homereal">หน้าแรก</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Nav>
                                    <div className="dropdown">
                                        <button className="dropbtn">เพิ่ม<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/location_gym">อัพเดทที่อยู่ร้าน</a>
                                            <a href="/add_course">เพิ่มคอร์สหลัก</a>
                                            <a href="/add_course_sup">เพิ่มคอร์สเสริม</a>
                                            <a href="/chack_course">ตรวจสอบคอร์ส</a>
                                        </div>

                                    </div>
                                    <Nav.Link href="/show_user" >สมาชิก</Nav.Link>
                                    <Nav.Link href="/register">เพิ่มผู้ใช้</Nav.Link>
                                    {/* <Nav.Link href="/add_product">เพิ่มสินค้า</Nav.Link>
                                    <Nav.Link href="/show_product">ตรวจสอบสินค้า</Nav.Link>
                                    <Nav.Link href="/add_promotion">เพิ่มโปรโมชั่น</Nav.Link> */}
                                    <Nav.Link href="/StaticService">การเข้าใช้บริการ</Nav.Link>

                                    <div className="dropdown">
                                        <button className="dropbtn">รายรับ-รายจ่าย<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/bill">ตรวจสอบใบเสร็จ</a>
                                            <a href="/add_income">เพิ่มรายรับ-รายจ่ายเพิ่มเติม</a>
                                            <a href="/check_income">ตรวจสอบรายจ่ายเพิ่มเติม</a>
                                            <a href="/Income">สถิติรายรับ-รายจ่าย</a>
                                        </div>
                                    </div>
                                    <Nav.Link href="/user">ข้อมูลส่วนตัว</Nav.Link>
                                    <Nav.Link href="/loginform" onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                break;

            case "2":
                render_user =
                    <div>
                        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                            <Navbar.Brand href="/homereal">หน้าแรก</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="mr-auto">
                                </Nav>
                                <Nav>
                                    <div className="dropdown">
                                        <button className="dropbtn">เพิ่ม<MDBIcon icon="angle-down" /></button>
                                        <div className="dropdown-content">
                                            <a href="/location_gym">อัพเดทที่อยู่ร้าน</a>
                                            <a href="/add_course">เพิ่มคอร์สหลัก</a>
                                            <a href="/add_course_sup">เพิ่มคอร์สเสริม</a>
                                            <a href="/chack_course">ตรวจสอบคอร์ส</a>
                                        </div>

                                    </div>
                                    <Nav.Link href="/show_user" >สมาชิก</Nav.Link>
                                    <Nav.Link href="/register">เพิ่มผู้ใช้</Nav.Link>
                                    {/* <Nav.Link href="/add_product">เพิ่มสินค้า</Nav.Link>
                                    <Nav.Link href="/show_product">ตรวจสอบสินค้า</Nav.Link>
                                    <Nav.Link href="/add_promotion">เพิ่มโปรโมชั่น</Nav.Link> */}
                                
                                    <Nav.Link href="/user">ข้อมูลส่วนตัว</Nav.Link>
                                    <Nav.Link href="/loginform" onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>

                break;

            default:
                render_user =
                    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" >
                        <Navbar.Brand href="/homereal">หน้าแรก</Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                            </Nav>
                            <Nav>
                                <Nav.Link href="/loginform" onClick={this.logOut.bind(this)}>ออกจากระบบ</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                break;
        }
        return render_user
    }


    logOut = (e) => {
        e.preventDefault()
        localStorage.removeItem('user_token')
        window.location.href = "/";
    }
    render() {

        // 1. หน้าล็อกอินเเล้ว

        const loginUser = (
            <div>
                {this.state.get_user ?

                    this.state.get_user.map((e, index) => {
                        return (
                            <div>
                                {this.render_type(e.user_type)}
                            </div>
                        )
                    }
                    )

                    : null}
            </div>

        )
        // 2. หน้าที่ยังไม่ได้ล็อกอิน

        const unloginUser = (
            <div></div>
        )
        return (
            <div>
                {localStorage.user_token ? loginUser : unloginUser}
            </div>

        )
    }
}


export default SingnedInLinks;