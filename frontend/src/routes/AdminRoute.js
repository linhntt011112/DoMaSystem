import {React} from 'react';
import { Route, useHistory } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import { useToken } from '../context/TokenContext';
import './AdminRoute.css'

const AdminRoute = ({component: Component, ...rest}) => {
    const {userPermission, setUserPermission} = useToken();
    let history = useHistory();

    const allUserPermissions = new Set(['user', 'admin']);
    // if(!userPermission || !allUserPermissions.has(userPermission)) {
    //     history.push('/login');
    // }

    return (
        <Route {...rest} component = {props => {
            return (
                <div>
                    <Topbar/>
                    <div className="adminContainer">
                        <Sidebar />
                        <Component {...props} />
                    </div>
                </div>
            );
        }}/>
    );
};

export default AdminRoute;