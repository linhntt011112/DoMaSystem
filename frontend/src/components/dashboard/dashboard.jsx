import React, { Component } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";
import auth from "../login/auth";

function withNavigation(Component) {
  return props => <Component {...props} navigate={useHistory()} />;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  getCurrentUser() {
    axios
      .get("http://127.0.0.1:3009/get_current_user", { withCredentials: true })
      .then(response => {
        console.log(response.data)
      })
  }

  handleLogoutClick() {
    axios
      .get("http://127.0.0.1:3009/logout", { withCredentials: true })
      .then(response => {
        auth.logout(() => {
          this.props.history.push("/");
          console.log("Ok")
        });
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }




  render() {
    this.getCurrentUser();
    return (
      <div className="dashboard">
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </div>
    );
  }
};

export default withNavigation(Dashboard);