import React, { Component } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import "./dashboard.css";

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
          <Topbar/>
          <div className="container">
            <Sidebar />
            <div className="others">
              Other pages
            </div>
          </div>
          <button onClick={() => this.handleLogoutClick()}>Logout</button>
        </div>
      </div>
    );
  }
};

export default withNavigation(Dashboard);