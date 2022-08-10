import React,  { useContext } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import "./dashboard.css";

import { UserContext } from "../../context/UserContext";
import { useToken } from "../../context/TokenContext";
import * as backend_config from "../../config/backend"
import FeaturedInfo from "../featuredInfo/FeaturedInfo";
import { ToastContainer, toast } from 'react-toastify';


const Dashboard = (props) => {

  return (
    <div className="dashboard">
      <h3 className="pageTitle">Xin chào!</h3>
      <FeaturedInfo {...props}/>
      <ToastContainer/>
    </div>
    );
};

export default Dashboard;