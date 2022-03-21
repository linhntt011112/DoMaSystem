import React, { createContext, useEffect, useState } from "react";


export const UserContext = createContext();

const localStorageToken = "DMSToken";
export const UserProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem(localStorageToken));

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const requestOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token,
  //       },
  //     };

  //     const response = await fetch("http://127.0.0.1:3009/users/me", requestOptions);

  //     if (!response.ok) {
  //       setToken(null);
  //     }
  //     localStorage.setItem(localStorageToken, token);
  //   };
  //   fetchUser();
  // }, [token]);

  return (
    <UserContext.Provider value={[token, setToken]}>
      {props.children}
    </UserContext.Provider>
  );
};