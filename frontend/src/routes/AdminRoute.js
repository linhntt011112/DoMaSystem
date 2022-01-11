import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';

const AdminRoute = ({element: Element, ...rest}) => {
    return (
        <Route {...rest} component = {props => (
            <div>
                <Topbar />
                <Sidebar />
                <Component {...props} />
            </div>
        )} />
    );
};

export default AdminRoute;