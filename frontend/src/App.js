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
import CongVanChiTiet from './components/pages/congvandiChitiet/CongVanDiChiTiet';
import CongVanDenList from './components/pages/congvandenList/CongVanDenList';
import CongVanDenChiTiet from './components/pages/congvandenChitiet/CongVanDenChiTiet';
import DMSCalendar from './components/pages/calendar/DMSCalendar';
import MyProfile from './components/pages/MyProfile/MyProfile';
import ChangePassword from './components/pages/ChangePassword/ChangePassword';
import UserRoute from './routes/user/UserRoute';
import PhongBanList from './components/pages/PhongBanList/PhongBanList';
import ChucVuList from './components/pages/ChucVuList/ChucVuList';
import CongVanList from './components/pages/CongVanList/CongVanList';
import AddCVDi from './components/pages/AddCvDi/AddCVDi';

import * as backend_config from './config/backend'

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
            <AdminRoute exact path="/management/chuc-vu/" component={ChucVuList}/>
            <AdminRoute exact path="/management/so-luu-tru/" component={CongVanList} cong_van_di_get_list_url={backend_config.CONG_VAN_LUU_TRU_GET_LIST} title="đã lưu trữ"/>

            <UserRoute exact path="/cong-van-di/add_cvdi" component={AddCVDi} />
            <UserRoute exact path="/cong-van-di/cho_duyet" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHO_DUYET} title="đi chờ duyệt"/>
            <UserRoute exact path="/cong-van-di/chua_duyet" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHUA_DUYET} title="đi chưa duyệt"/>
            <UserRoute exact path="/cong-van-di/cho_xu_ly" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHO_XU_LY} title="đi chờ xử lý"/>
            <UserRoute exact path="/cong-van-di/da_hoan_tat" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DI_GET_LIST_DA_HOAN_TAT} title="đi đã hoàn tất"/>
            <UserRoute exact path="/cong-van-di/:cong_vanId" component={CongVanChiTiet}/>

            <UserRoute exact path="/cong-van-den/chua_xu_ly" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHUA_XU_LY} title="đến chưa xử lý"/>
            <UserRoute exact path="/cong-van-den/da_hoan_tat" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DEN_GET_LIST_DA_HOAN_TAT} title="đến đã hoàn tất"/>
            <UserRoute exact path="/cong-van-den/" component={CongVanDenList}/>
            <UserRoute exact path="/cong-van-den/:socongvan" component={CongVanDenChiTiet}/>
            
            <UserRoute exact path="/cong-van/dang_theo_doi" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DEN_GET_LIST_DANG_THEO_DOI} title="đang theo dõi"/>

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