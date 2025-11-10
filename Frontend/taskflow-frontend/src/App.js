import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoginForm from './components/LoginForm';
import TaskList from './components/TaskList';

/*
 * Componente principal de la aplicacion
 *
 * - Maneja el estado global del token JWT
 * - Si no hay token → muestra el formulario de login
 * - Si hay token valido → muestra la lista de tareas
 */

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        console.error('Token inválido', error);
        localStorage.removeItem('token');
        setToken(null);
      }
    }
  }, [token]);

  const handleLogin = (jwt) => {
    localStorage.setItem('token', jwt);
    setToken(jwt);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <div className="App">
      {!token ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <TaskList token={token} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;





