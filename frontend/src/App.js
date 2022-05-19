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
const App = () => {

  return (
    <>
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <UserRoute exact path="/" component={Dashboard} />
            <UserRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/dashboard/users" component={UserList} />
            <AdminRoute path="/dashboard/user/:userId" component={User} />
            <AdminRoute exact path="/dashboard/loai-cong-van/" component={LoaicongvanList}/>
            <AdminRoute exact path="/dashboard/cong-van-di/" component={CongvandiList}/>
            <AdminRoute exact path="/dashboard/cong-van-di/:soCongVanDi" component={CongVanDiChiTiet}/>
            <AdminRoute exact path="/dashboard/cong-van-den/" component={CongVanDenList}/>
            <AdminRoute exact path="/dashboard/cong-van-den/:socongvan" component={CongVanDenChiTiet}/>
            <AdminRoute exact path="/dashboard/calendar" component={DMSCalendar}/>
            <AdminRoute exact path="/dashboard/my-profile" component={MyProfile}/>
            <AdminRoute exact path="/dashboard/change-password" component={ChangePassword}/>
          </Switch>
        </BrowserRouter>        
      </div>
    </>
  );
  }
  

export default App;