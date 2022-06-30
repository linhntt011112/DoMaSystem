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
import CongVanDenChiTiet from './components/pages/congvandenChitiet/CongVanDenChiTiet';
import DMSCalendar from './components/pages/calendar/DMSCalendar';
import MyProfile from './components/pages/MyProfile/MyProfile';
import ChangePassword from './components/pages/ChangePassword/ChangePassword';
import UserRoute from './routes/user/UserRoute';
import PhongBanList from './components/pages/PhongBanList/PhongBanList';

const App = () => {

  return (
    <>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <UserRoute exact path="/" component={Dashboard} />
            <UserRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/management/users" component={UserList} />
            <AdminRoute exact path="/management/user/:userId" component={User} />
            <AdminRoute exact path="/management/loai-cong-van/" component={LoaicongvanList}/>
            <AdminRoute exact path="/management/phong-ban/" component={PhongBanList}/>
            <UserRoute exact path="/cong-van-di/" component={CongvandiList}/>
            <UserRoute exact path="/cong-van-di/:cong_vanId" component={CongVanDiChiTiet}/>
            <UserRoute exact path="/cong-van-den/" component={CongVanDenList}/>
            <UserRoute exact path="/cong-van-den/:socongvan" component={CongVanDenChiTiet}/>
            <UserRoute exact path="/calendar" component={DMSCalendar}/>
            <UserRoute exact path="/my-profile" component={MyProfile}/>
            <UserRoute exact path="/change-password" component={ChangePassword}/>
          </Switch>
        </BrowserRouter>        
      </div>
    </>
  );
  }
  

export default App;