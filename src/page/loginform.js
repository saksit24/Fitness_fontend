import React from 'react';
import '../App.css';
import { get, post } from '../service/service';
import swal from 'sweetalert';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      password: null
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signin" + this.state);
  }

  get_users = async () => {
    let object = {
      user: this.state.user,
      password: this.state.password
    };
    try {
      await post(object, "user/user_login", null).then(res => {
        if (res.success) {
          // alert(res.token)
          localStorage.setItem("user_token", res.token);
          window.location.href = "/homereal";
          console.log("Signin" + res.token);
        } else {
          swal(res.error_message,"", "error");
          
        }
      });
    } catch (error) {
      swal(error,"", "error");
      
    }
    console.log("Signin" + this.state);
  }

  render() {
    return (


      <div className="App">
        <section className="section container">
          <div className="columns is-centered">
            <div className="column is-half">

              <form onSubmit={this.handleSubmit}>
                <div className="field">

                  <div className="control">
                    <input className="input" placeholder="Username" type="user" name="user" onChange={this.handleChange} />
                    {console.log('check',this.state.user)}
                    {console.log('check',this.state.password)}
                  </div>
                </div>


                <div className="field">

                  <div className="control">
                    <input className="input" placeholder="Password" type="password" p_name="password" name="password" onChange={this.handleChange}/>
                  </div>
                </div>

                <div className="field is-grouped">

                  <div className="control">
                    <button onClick={() => this.get_users(this.state.user, this.state.password)} className="buttonlog">LOG IN</button>


                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

    )
  }
}


export default LoginForm