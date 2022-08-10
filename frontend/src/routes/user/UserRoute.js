import {React} from 'react';
import { Route, useLocation, Redirect } from 'react-router-dom';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { useToken, useUserInfo } from '../../context/TokenContext';
import './AdminRoute.css'



const UserRoute = ({component: Component, ...rest}) => {
    const {token, setToken, user, userPermission, updateSidebar} = rest;

    let location = useLocation();
    // const {userPermission, user} = useUserInfo();
    // console.log(userPermission, 'in user route');

    const allUserPermissions = new Set(['user', 'admin']);
    // console.log(location, !userPermission, !allUserPermissions.has(userPermission))
    if(!userPermission || !allUserPermissions.has(userPermission)) {
        // history.push('/login');
        return <Redirect to='/login' state ={{from : location}}/>;
    }

    return (
        <Route {...rest} 
        component = {props => {
            return (
                <div>
                    {/* <Topbar user={user} token={token} /> */}
                    <div className="adminContainer">
                        <Sidebar updateSidebar={updateSidebar} user={user} userPermission={userPermission} setToken={setToken} token={token} />
                        <Component {...props} token={token} userPermission={userPermission} {...rest} />
                    </div>
                </div>
            )
        }}
        />
    );
};

export default UserRoute;