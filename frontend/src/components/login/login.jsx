import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

// import ErrorMessage from "./ErrorMessage";
import { UserContext } from "../../context/UserContext";
import { useToken } from "../../context/TokenContext";
import * as backend_config from "../../config/backend"

import './login.scss';
import Logo from '../../img/logo_4.png';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");
  let history = useHistory();

  // const [, setToken] = useContext(UserContext);
  const {setToken} = useToken();

  const submitLogin = async () => {
    let form = new FormData();
    form.append("username", username);
    form.append("password", password);

    const requestOptions = {
      method: "POST",
      headers: { 
        // "Content-Type": "application/www-form-urlencoded"
       },
      body: form,
      // body: JSON.stringify(
      //   `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
      // ),
    };

    const response = await fetch(backend_config.BACKEND_URL_TOKEN, requestOptions);
    const data = await response.json();

    if (response.ok) {
      setToken(data.access_token);
      history.push("/dashboard");
      // console.log('ok');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitLogin();
  };

  return (
    <section id="login-page"> 
      <form id="loginForm" name='loginForm' onSubmit={handleSubmit}>
        <img src={Logo} alt='' className='logo'/>
        <h2>
          Welcome!
        </h2>
        <fieldset>
          <legend>Log In</legend>
          <ul>
            <li>
              <label for="username">Username:</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </li>
            <li>
              <label for="password">Password:</label>
              <input 
                type="password" 
                id="password" 
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              required/>
            </li>
          </ul>
        </fieldset>
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
