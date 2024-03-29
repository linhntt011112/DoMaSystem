import {React} from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useToken, useUserInfo } from '../../context/TokenContext';
import './AdminRoute.css'



const AdminRoute = ({component: Component, ...rest}) => {
    const {token, setToken, user, userPermission, updateSidebar} = rest;
    let location = useLocation();
    // const {userPermission, user} = useUserInfo();
    // console.log(userPermission, 'in user route');

    const allUserPermissions = new Set(['admin']);
    // console.log(userPermission, !allUserPermissions.has(userPermission), user, token);
    if(!userPermission || !allUserPermissions.has(userPermission)) {
        // history.push('/login');
        return <Redirect to='/dashboard' state ={{from : location}}/>;
    }

    return (
        <Route {...rest} 
        component = {props => {
            return (
                <div>
                    {/* <Topbar user={user} token={token} /> */}
                    <div className="adminContainer">
                        <Sidebar updateSidebar={updateSidebar} user={user} setToken={setToken} token={token} userPermission={userPermission}/>
                        <Component {...props} token={token}/>
                    </div>
                </div>
            )
        }}
        />
    );
};

export default AdminRoute;