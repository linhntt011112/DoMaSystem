import React from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import './AdminRoute.css'

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component = {props => (
            <div>
                <Topbar/>
                <div className="container">
                    <Sidebar />
                    <Component {...props} />
                </div>
                
            </div>
        )} />
    );
};

export default AdminRoute;