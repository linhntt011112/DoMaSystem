import React, { Component } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";

axios.defaults.withCredentials = true;

function withNavigation(Component) {
  return props => <Component {...props} navigate={useHistory()} />;
}

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  getCurrentUser() {
    axios
      .get("http://127.0.0.1:3009/get_current_user", { withCredentials: true })
      .then(response => {
        console.log(response.data.username)
        if (response.data.username === "") {  
          this.props.history.push("/");
        }
      })
  }

  handleLogoutClick() {
    axios
      .post("http://127.0.0.1:3009/logout", { withCredentials: true })
      .then(response => {
          this.props.history.push("/");
          console.log("Ok")
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }




  render() {
    // this.getCurrentUser();
    return (
      <div className="dashboard">
        {this.getCurrentUser()}
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </div>
    );
  }
};

export default withNavigation(Dashboard);