import React,  { useContext } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";

import { UserContext } from "../../context/UserContext";
import { useToken } from "../../context/TokenContext";
import * as backend_config from "../../config/backend"
import FeaturedInfo from "../featuredInfo/FeaturedInfo";


axios.defaults.withCredentials = true;

const Dashboard = (props) => {
  let history = useHistory();
  const token = props.token;
  
  const getCurrentUser = async () => {

    const response = await backend_config.makeRequest("GET", backend_config.USER_GET_CURRENT_API, token);
    const data = await response.json();
    console.log(data);
  };

  const getUserList = async () => {

    const response = await backend_config.makeRequest("GET", backend_config.USER_GET_LIST_API, token);
    const data = await response.json();
    console.log(data);
  };

  const getUserById = async () => {

    const response = await backend_config.makeRequest("GET", backend_config.USER_GET_BY_ID_API.replace('{id}', 1), token);
    const data = await response.json();
    console.log(data);

  };



  return (
    <div className="dashboard">
      <h3 className="pageTitle">Welcome Admin!</h3>
      <FeaturedInfo />
      <button onClick={getCurrentUser}>getCurrentUser</button>
      <button onClick={getUserList}>getUserList</button>
      <button onClick={getUserById}>getUserById</button>
    </div>
    );
};

export default Dashboard;