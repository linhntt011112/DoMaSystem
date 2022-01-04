import React, { Component } from 'react';
import { BrowserRouter, Route , Routes } from 'react-router-dom';
import './App.css';

import Dashboard from './components/dashboard/dashboard';
import LoginPage from './components/login/login'

class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>        
      </div>
    );
  }
  
}

export default App;