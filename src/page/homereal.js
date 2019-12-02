import React, { Component } from 'react'
import Background from '../image/bghome-1.jpg'
import '../App.css'
import { NavLink } from 'react-router-dom';




export class realhome extends Component {
    render() {
        return (
            <section >            
                <img className='bgimg' src={Background} />               
                {/* <button type="button" class="btn btn-white00" >เพิ่มสินค้า</button> */}
                <NavLink to="/home"><button type="button" class="btn btn-white"><i class="fas fa-cash-register fa-4x"></i>ซื้อขายสินค้า</button></NavLink>
                <NavLink to="/sell_course"><button type="button" class="btn btn-white"><i class="fas fa-cash-register fa-4x"></i>ซื้อขายคอร์ส</button></NavLink>
                <NavLink to="/add_product"><button type="button" class="btn btn-white"><i class="fas fa-cart-plus fa-3x" ></i>เพิ่มสินค้า</button></NavLink>
                <NavLink to="/show_product"><button type="button" class="btn btn-white"><i class="fas fa-search fa-3x"></i>ตรวจสอบสินค้า</button></NavLink>
                {/* <NavLink to="/add_promotion"><button type="button" class="btn btn-white"><i class="fab fa-adversal fa-3x"></i>เพิ่มโปรโมชั่น</button></NavLink> */}
                <NavLink to="/show_promotion"><button type="button" class="btn btn-white"><i class="fas fa-search fa-3x" ></i>ตรวจสอบโปรโมชั่น</button></NavLink>
            </section>
        )
    }
}

export default realhome