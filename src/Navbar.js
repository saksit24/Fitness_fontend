import React, { Component } from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import './navbar.css'
// import SingnedInLinks from './SingnedInLinks'

class Navbar extends Component {




// // import SingnedOutLinks from './SingedOutLink'
// export class Navbar extends Component {
//     render() {
//         return (
//             <nav className="nav-wrapper grey darken-3">
//             <div className="container">
//                 <Link to ='/' className="brand-logo">System.</Link>
//                 <SingnedInLinks/>
//             </div>
//         </nav>
//         )
//     }
// }

// export default Navbar


    render() {
        return (
            <div>
                <ul>
                    <li><NavLink exact to="/" >หน้าแรก</NavLink></li>
                    <li><NavLink exact to="/add_product">เพิ่มสินค้า</NavLink></li>
                    <li><NavLink exact to="/show_product">แสดงรายการสินค้า</NavLink></li>
                </ul>
            </div>

            // <div className="App">
            //     <div className="Navbar">
            //         <NavLink exact to="/"  >Home</NavLink>
            //         <NavLink exact to="/add_product">add_product</NavLink>
            //         <NavLink exact to="/show_product">show_product</NavLink>
            //     </div >
            // </div>

        )
    }
}
export default withRouter(Navbar);