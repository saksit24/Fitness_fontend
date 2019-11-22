import React, { Component } from 'react';
import '../App.css';
import SingnedInLinks from '../layout/SingnedInLinks';


// import SingnedOutLinks from './SingedOutLink'
export class Navbar extends Component {
    render() {
        return (
            <div>
                <SingnedInLinks/>
            </div>
            
        )
    }
}

export default Navbar