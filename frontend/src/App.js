import React from 'react';

import { BrowserRouter, Route , Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import UserList from './components/pages/userList/UserList';
import AdminRoute from './routes/AdminRoute';
import User from './components/pages/user/User';
import LoaicongvanList from "./components/pages/loaicongvanList/LoaicongvanList";
import CongvandiList from './components/pages/congvandiList/CongvandiList';

const App = () => {

  return (
    <>
      {/* <Header title={message} /> */}
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <AdminRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/dashboard/users" component={UserList} />
            <AdminRoute path="/dashboard/user/:userId" component={User} />
            <AdminRoute exact path="/dashboard/loai-cong-van/" component={LoaicongvanList}/>
            <AdminRoute exact path="/dashboard/cong-van-di/" component={CongvandiList}/>
          </Switch>
        </BrowserRouter>        
      </div>
    </>
  );
  }
  

export default App;