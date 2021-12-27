import React from 'react';
import './login.scss';

const { Component } = React

class LoginPage extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentView: "logIn"
    }
  }

  changeView = (view) => {
    this.setState({
      currentView: view
    })
  }

  currentView = () => {
    switch(this.state.currentView) {
      case "logIn":
        return (
          <form>
            <h2>Welcome!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label for="username">Username:</label>
                  <input type="text" id="username" required/>
                </li>
                <li>
                  <label for="password">Password:</label>
                  <input type="password" id="password" required/>
                </li>
              </ul>
            </fieldset>
            <button>Login</button>
          </form>
        )
        break
      default:
        break
    }
  }

  render() {
    return (
      <section id="login-page">
        {this.currentView()}
      </section>
    )
  }
}

export default LoginPage;