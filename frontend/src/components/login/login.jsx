import React from 'react';
import './login.scss';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import Logo from '../../img/logo_4.png';

const { Component } = React
axios.defaults.withCredentials = true;

function withNavigation(Component) {
  return props => <Component {...props} navigate={useHistory()} />;
}

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      username: "",
      password: "",
      loginErrors: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    const { username, password } = this.state;
    let loginForm = document.getElementById('loginForm');
    let formData = new FormData(loginForm);
    axios({
      method: "post",
      url: "http://127.0.0.1:3009/login",
      data: {
        username: username,
        password: password
        // formData
      },
      // headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true
    })
      .then(response => {
        console.log(response)
        if (response.data.ok) { 
          console.log(this.props);
          this.props.history.push("/dashboard");
        }
      })
      .catch(error => {
        console.log("login error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <section id="login-page"> 
        <form id="loginForm" name='loginForm' onSubmit={this.handleSubmit}>
          <img src={Logo} alt='' className='logo'/>
          <h2>
            Welcome!
          </h2>
          <fieldset>
            <legend>Log In</legend>
            <ul>
              <li>
                <label for="username">Username:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  onChange={this.handleChange}
                  required
                />
              </li>
              <li>
                <label for="password">Password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  onChange={this.handleChange}
                required/>
              </li>
            </ul>
          </fieldset>
          <button type="submit">Login</button>
        </form>
      </section>
    )
  }
}

export default withNavigation(LoginPage);