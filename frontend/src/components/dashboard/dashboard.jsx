import React, { Component } from "react";
import axios from "axios";
import { useNavigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Topbar from "../topbar/Topbar";
import Sidebar from "../sidebar/Sidebar";
import "./dashboard.css";
import UserList from "../pages/userList/UserList";

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
      <Router>
        <Topbar/>
        <div className="container">
          <Sidebar />
          <Routes>
            <Route path="/users">
              <UserList />
            </Route>
          </Routes>
        </div>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
      </Router>
    );
  }
};

export default withNavigation(Dashboard);