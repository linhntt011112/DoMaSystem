import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

// import ErrorMessage from "./ErrorMessage";
// import { UserContext } from "../../context/UserContext";
import { useToken } from "../../context/TokenContext";
import * as backend_config from "../../config/backend"

import './login.scss';
import Logo from '../../img/logo_4.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  const {token, setToken} = useToken();
  // const {context} = useContext(UserContext);
  // const {token, setToken} = context.userToken;

  // const [responseData, setResponseData] = useState({});
  // const {token, saveToken} = useContext(UserTokenContext);
  // const setToken = saveToken;

  useEffect(() => {
    return () => {};
  }, []);

  const submitLogin = async () => {
    let form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: { 
       },
      body: form,
    };
    const response = await fetch(backend_config.BACKEND_URL_TOKEN, requestOptions);
    const data = await response.json();
    // setResponseData(data);


    if (response.ok) {
      // console.log(data);
      setToken(data.access_token);
      // console.log(token);
      history.push("/");
    }
    else{
      alert("Tên người dùng hoặc mật khẩu sai!")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  }

  return (
    <section id="login-page"> 
      <form id="loginForm" className='loginForm' onSubmit={handleSubmit}>
        <img src={Logo} alt='' className='logo'/>
        <h2>
          Welcome!
        </h2>
        <fieldset>
          <legend>Đăng nhập</legend>
          <ul>
            <li>
              <label for="username">Tên tài khoản</label>
              <input 
                type="text" 
                id="username" 
                className="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </li>
            <li>
              <label for="password">Mật khẩu</label>
              <input 
                type="password" 
                id="password" 
                className="password"
                onChange={(e) => setPassword(e.target.value)}
                required/>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Đăng nhập</button>
      </form>
      <ToastContainer/>
    </section>
  );
};

export default Login;
