import React, { Component } from 'react';
import { BrowserRouter, Route , Switch } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import LoginPage from './components/login/login'
import UserList from './components/pages/userList/UserList';
import AdminRoute from './routes/AdminRoute';

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={LoginPage} />
            <AdminRoute exact path="/dashboard" component={Dashboard} />
            <AdminRoute exact path="/dashboard/users" component={UserList} />
            <Route path="*" component={() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>        
      </div>
    );
  }
  
}

export default App;