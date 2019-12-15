import React, { Component } from 'react'
// import { Button, Input, Menu, Checkbox, Form,Tab } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Add_product from './add_product'
import Show_product from './show_product'
import Update_product from './update_product'
import Home from './sell/home'
import SingnedInLinks from './layout/SingnedInLinks';
import loginform from './page/loginform';
import member from './page/member';
import add_promotion from './add_promotion';
import Navbar from './Navbar'
import show_promotion from './show_promotion'
import update_promotion from './update_promotion'
import User from './page/user'
import Edit from './page/edit_profile'
import Income from './page/Income'
import Static from './page/StaticService'
import Edit_pass from './page/edit_password'
import homereal from './page/homereal'
import regster from './register'
import show_user from './show_user'
import user_valid from './user_valid'
import update_person from './update_person'
import Location_Gym from './location_gym'
import Add_course from './add_course'
import Add_course_sup from './add_course_sup'
import check_course from './chack_course'
import update_course from './update_course'
import Bill from './sell/bill'
import detail_bill from './sell/detail_bill'
import add_income from './page/add_income'
import check_income from './page/check_income'
import edit_income from './page/edit_income'
import sell_course from './sell/sell_course'
import {user_token} from './support/Constance'
import tap_product from './tap_add_product'
import Test_hc from './page/test_hc'
import Pdf_bill from './pdf/pdf_bill'
import Test_pdf from './pdf/test_pdf'
 


class App extends Component {
  render() {
    return (
      <div>
        {/* <div > */}
          <SingnedInLinks />
        {/* </div> */}
        <Router exact path='/'>
          <Route exact path='/homereal' component={homereal} />
          <Route exact path='/' component={loginform} />
          <Route exact path='/home' component={Home} />
          <Route exact path='/user' component={User} />
          <Route exact path='/add_product' component={Add_product} />
          <Route exact path='/show_product' component={Show_product} />
          <Route exact path='/update_product' component={Update_product} />
          <Route exact path='/update_product/:id_product' component={Update_product} />
          <Route exact path='/member' component={member} />
          <Route exact path='/add_promotion' component={add_promotion} />
          <Route exact path='/show_promotion' component={show_promotion} />
          <Route exact path='/Income' component={Income} />
          <Route exact path='/StaticService' component={Static} />
          <Route exact path='/edit_profile' component={Edit} />
          <Route exact path='/edit_password' component={Edit_pass} />
          <Route exact path='/update_promotion' component={update_promotion}/>
          <Route exact path='/register' component={regster}/>
          <Route exact path='/show_user' component={show_user}/>
          <Route exact path='/user_valid' component={user_valid}/>
          <Route exact path='/update_person' component={update_person}/>
          <Route exact path='/location_gym' component={Location_Gym}/>
          <Route exact path='/add_course' component={Add_course}/>
          <Route exact path='/add_course_sup' component={Add_course_sup}/>
          <Route exact path='/chack_course' component={check_course}/>
          <Route exact path='/update_course' component={update_course}/>
          <Route exact path='/bill' component={Bill}/>
          <Route exact path='/detail_bill' component={detail_bill}/>
          <Route exact path='/add_income' component={add_income}/>
          <Route exact path='/check_income' component={check_income}/>
          <Route exact path='/edit_income' component={edit_income}/>
          <Route exact path='/sell_course' component={sell_course}/>
          <Route exact path='/tap_product' component={tap_product}/>
          <Route exact path='/test_hc' component={Test_hc}/>
        </Router>
      </div>
    )
  }
}

export default App;



