import React,  { useContext } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";

import { UserContext } from "../../context/UserContext";
import FeaturedInfo from "../featuredInfo/FeaturedInfo";


axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [token, setToken] = useContext(UserContext);
  let history = useHistory();
  if (!token){
    history.push("/");
  }
  
  const getCurrentUser = async () => {
    axios
      .get("http://127.0.0.1:3009/get_current_user", { withCredentials: true })
      .then(response => {
        console.log(response.data.username)
        if (response.data.username === "") {  
          this.props.history.push("/");
        }
      })

    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);

    const response = await fetch("http://127.0.0.1:3009/users/me", requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.username === "") {  
        history.push("/");
      }
    }
    else{
      console.log("----------not ok");
      console.log(response);
      history.push("/");
    }
  };

  const getUserList = async () => {
    axios
      .get("http://127.0.0.1:3009/get_current_user", { withCredentials: true })
      .then(response => {
        console.log(response.data.username)
        if (response.data.username === "") {  
          this.props.history.push("/");
        }
      })

    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);

    const response = await fetch("http://127.0.0.1:3009/users/list_users", requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.username === "") {  
        history.push("/");
      }
    }
    else{
      console.log("----------not ok");
      console.log(response);
      history.push("/");
    }
  };

  const getUserById = async () => {

    
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);

    const response = await fetch("http://127.0.0.1:3009/users/id/1", requestOptions);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
    }
    else{
      console.log("----------not ok");
      console.log(response);
      history.push("/");
    }
  };

  const handleLogoutClick = () => {
    axios
      .post("http://127.0.0.1:3009/api/delete_token", { withCredentials: true })
      .then(response => {
          // console.log(token);
          setToken(null);
          history.push("/");
      })
      .catch(error => {
        console.log("logout error", error);
      });
  };

  return (
    <div className="dashboard">
      <h3 className="pageTitle">Welcome Admin!</h3>
      <FeaturedInfo />
      <button onClick={handleLogoutClick}>Logout</button>
      <button onClick={getCurrentUser}>getCurrentUser</button>
      <button onClick={getUserList}>getUserList</button>
      <button onClick={getUserById}>getUserById</button>
    </div>
    );
};

export default Dashboard;