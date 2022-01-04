import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function withNavigation(Component) {
  return props => <Component {...props} navigate={useNavigate()} />;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLogoutClick() {
    axios
      .get("http://127.0.0.1:3009/logout", { withCredentials: true })
      .then(response => {
        // this.props.handleLogout();
        this.props.navigate("/");
        console.log("Ok")
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }


  render() {
    return (
      <div>
        <div>
          <h1>Dashboard</h1>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </div>
      </div>
    );
  }
};

export default withNavigation(Dashboard);