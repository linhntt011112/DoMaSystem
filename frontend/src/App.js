import {React, useEffect, useState} from 'react';

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
import CongVanList from './components/pages/SLTCongVanList/CongVanList';
import AddCVDi from './components/pages/AddCvDi/AddCVDi';
import CongVanDiVersion from './components/pages/congvandiVersions/congVanDiVersion';

import * as backend_config from './config/backend'
import SLTcongVanChiTiet from './components/pages/SLTcongvanChitiet/SLTCongVanChiTiet';

import { useUserInfo } from './context/TokenContext';
import { useToken } from './context/TokenContext';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import './routes/admin/AdminRoute.css'
import PageNotFound from './components/pages/404Page/404Page';

const App = () => {

  const {token, setToken} = useToken();
  const {userPermission, user} = useUserInfo();
//   const {isLogin, setIsLogin} = useState(false)

//   useEffect(() => {
//     // getUnreadNotifications()
//     console.log("22222")
//     // setIsInit(true);
// }, []);

  const allUserPermissions = new Set(['admin', 'user']);
  if(!userPermission || !allUserPermissions.has(userPermission)) {
    // history.push('/login');
    window.history.replaceState(null, "Login to Domasy", "/login")
    return (
      <div><Login /></div>
    )
  }
  else return (
    <>
      <div>
        <BrowserRouter>
        <Topbar user={user} token={token} />
          {/* <div className="adminContainer">
          <Sidebar user={user} setToken={setToken} userPermission={userPermission}/> */}
            <Switch>
              <Route exact path="/login" component={Login} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/" component={Dashboard} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/dashboard" component={Dashboard} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/users" component={UserList} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/user/:userId" component={User} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/loai-cong-van/" component={LoaicongvanList} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/phong-ban/" component={PhongBanList} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/chuc-vu/" component={ChucVuList} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/so-luu-tru/" component={CongVanList} cong_van_di_get_list_url={backend_config.CONG_VAN_LUU_TRU_GET_LIST} title="đã lưu trữ" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <AdminRoute exact path="/management/so-luu-tru/:cong_vanId" component={SLTcongVanChiTiet} user={user} token={token} setToken={setToken} userPermission={userPermission}/>

              <UserRoute exact path="/cong-van-di/add_cvdi" component={AddCVDi} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-di/cho_duyet" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHO_DUYET} title="đi chờ duyệt" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-di/chua_duyet" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHUA_DUYET} title="đi chưa duyệt" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-di/cho_xu_ly" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHO_XU_LY} title="đi chờ xử lý" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-di/da_hoan_tat" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DI_GET_LIST_DA_HOAN_TAT} title="đi đã hoàn tất" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-di/:cong_vanId" component={CongVanChiTiet} user={user} token={token} setToken={setToken} userPermission={userPermission}/>

              <UserRoute exact path="/cong-van-den/chua_xu_ly" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_GET_LIST_CHUA_XU_LY} title="đến chưa xử lý" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-den/da_hoan_tat" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DEN_GET_LIST_DA_HOAN_TAT} title="đến đã hoàn tất" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-den/" component={CongVanDenList} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van-den/:socongvan" component={CongVanDenChiTiet} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              
              <UserRoute exact path="/cong-van/dang_theo_doi" component={CongvandiList} cong_van_di_get_list_url={backend_config.CONG_VAN_DEN_GET_LIST_DANG_THEO_DOI} title="đang theo dõi" user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/cong-van/:cong_vanId/versions/" component={CongVanDiVersion} user={user} token={token} setToken={setToken} userPermission={userPermission}/>

              <UserRoute exact path="/calendar" component={DMSCalendar} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/my-profile" component={MyProfile} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <UserRoute exact path="/change-password" component={ChangePassword} user={user} token={token} setToken={setToken} userPermission={userPermission}/>
              <Route path='*' component={PageNotFound}/>
            </Switch>
          {/* </div> */}
        </BrowserRouter>        
      </div>
    </>
  );
  }
  

export default App;