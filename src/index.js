// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';  // Ajusta las importaciones según las necesidades
import './index.css';
import App from './App';
import Login from './components/Login';
import ApplicationRecordsView from './components/ApplicationRecordsView/ApplicationRecordsView';
import Navbar from './components/Shared/Navbar';
import reportWebVitals from './reportWebVitals';
import authService from './services/auth-service';
import setAuthTokenInterceptor from './helpers/token-interceptor';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from './components/User/UserList';


const token = authService.getTokenFromLocalStorage();
setAuthTokenInterceptor(token);

const Root = () => {
  if (!token) {
    return <Navigate to="/auth/sigin" />;
  }

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

const startApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/auth/sigin" element={<Login />} />
        <Route path="/log/index" element={<ApplicationRecordsView />} />
        <Route path="/user/index" element={<UserList />} />

      </Routes>
    </Router>
  );
};

startApp();
reportWebVitals();
