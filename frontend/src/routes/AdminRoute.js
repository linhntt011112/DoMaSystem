import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import Topbar from '../components/topbar/Topbar';
import './AdminRoute.css'
import auth from '../components/login/auth';

const AdminRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} component = {props => {
            if (auth.isAuthenticated()) {
                return (
                    <div>
                        <Topbar/>
                        <div className="container">
                            <Sidebar />
                            <Component {...props} />
                        </div>
                    </div>
                );
            } else {
                return (
                    <Redirect to={{
                        pathname: "/",
                        state: {
                            from: props.location
                    }}}/>
                );
            }
        }}/>
    );
};

export default AdminRoute;