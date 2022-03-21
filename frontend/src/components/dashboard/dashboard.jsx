import React,  { useContext } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";

import { UserContext } from "../../context/UserContext";
import { useToken } from "../../context/TokenContext";
import * as backend_config from "../../config/backend"
import FeaturedInfo from "../featuredInfo/FeaturedInfo";


axios.defaults.withCredentials = true;

const Dashboard = () => {
  let history = useHistory();
  const {token, setToken} = useToken();
  
  const getCurrentUser = async () => {

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);

    const response = await fetch(backend_config.USER_GET_CURRENT_API, requestOptions);
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

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    // console.log(token);

    const response = await fetch(backend_config.USER_GET_LIST_API, requestOptions);
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

    let id = 1;
    const response = await fetch(backend_config.USER_GET_BY_ID_API.replace('{id}', 1), requestOptions);
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
    setToken(null);
    history.push('/login');
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