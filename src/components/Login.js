// Login.js
import React, { useState, useEffect } from "react";
import authService from "../services/auth-service";
import "../styles/login.css";
import alertService from "../helpers/sweet-alert";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = authService.getTokenFromLocalStorage();
    if (storedToken) {
    }
  });

  const handleLogin = async () => {
    try {
      const token = await authService.login(username, password);
      authService.saveTokenToLocalStorage(token);
      navigate('/user/index');
    } catch (error) {
      alertService.error('Favor de validar los datos ingresados')
    }
  };

  return (
    <div className="contentWrapper">
      <div className="container">
        <forms>
          <h1>Iniciar Sesión</h1>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="E-mail"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
          />

          <button type="button" className="mb-2 mt-2" onClick={handleLogin}>
            Iniciar sesión
          </button>
          
        </forms>
      </div>
    </div>
  );
};

export default Login;
