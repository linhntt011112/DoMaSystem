import React from 'react';
import './login.scss';
import axios from "axios";
import { useHistory } from 'react-router-dom';
import auth from "./auth";
import Cookies from 'js-cookie';

const { Component } = React

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
    axios
      .post(
        "http://127.0.0.1:3009/login",
        {
            username: username,
            password: password
        },
        { withCredentials: true }
      )
      .then(response => {
        console.log(response)
        if (response.data.ok) { 
          if(response.status === 200){
            Cookies.set('session', response.headers['session'])
          }
          auth.login(() => {
            console.log(this.props);
            this.props.history.push("/dashboard");
          });
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
        <form onSubmit={this.handleSubmit}>
          <h2>Welcome!</h2>
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