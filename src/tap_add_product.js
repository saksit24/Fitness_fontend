import React, { Component } from 'react';
import { Tab, Tabs } from 'react-bootstrap'
import add_product from './add_product';

class tap_product extends Component {
    render() {
        return (
            <div>
                <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className='justify-content-center' >
                    <Tab eventKey="1" title="เพิ่มสินค้า">

                        <add_product />

                    </Tab>
                    <Tab eventKey="2" title="เพิ่มคอร์ส">
                        aasxasx
                </Tab>
                </Tabs>
            </div>
        );
    }
}

export default tap_product;