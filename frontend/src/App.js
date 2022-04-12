import React from 'react';

import { BrowserRouter, Route , Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import Login from './components/login/login';
import UserList from './components/pages/userList/UserList';
import AdminRoute from './routes/admin/AdminRoute';
import User from './components/pages/user/User';
import LoaicongvanList from "./components/pages/loaicongvanList/LoaicongvanList";
import CongvandiList from './components/pages/congvandiList/CongvandiList';
import CongVanDiChiTiet from './components/pages/congvandiChitiet/CongVanDiChiTiet';
import CongVanDenList from './components/pages/congvandenList/CongVanDenList';

const App = () => {

  return (
    <>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <AdminRoute exact path="/" component={Dashboard} />
            <AdminRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/dashboard/users" component={UserList} />
            <AdminRoute path="/dashboard/user/:userId" component={User} />
            <AdminRoute exact path="/dashboard/loai-cong-van/" component={LoaicongvanList}/>
            <AdminRoute exact path="/dashboard/cong-van-di/" component={CongvandiList}/>
            <AdminRoute exact path="/dashboard/cong-van-di/:soCongVanDi" component={CongVanDiChiTiet}/>
            <AdminRoute exact path="/dashboard/cong-van-den/" component={CongVanDenList}/>
          </Switch>
        </BrowserRouter>        
      </div>
    </>
  );
  }
  

export default App;