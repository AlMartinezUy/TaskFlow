import React, { useState, useEffect } from 'react';
import { loginUser } from '../services/api';

/*
 * Formulario de inicio de sesion
 *
 * - Permite ingresar username y password
 * - Envia las credenciales al backend para obtener un JWT
 * - Maneja errores de autenticacion y sesion expirada
 *
 * {function} onLogin callback que recibe el token JWT en caso de login exitoso
 */

const LoginForm = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('sessionExpired')) {
      setSessionExpired(true);
      localStorage.removeItem('sessionExpired');
    }
  }, []);

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(credentials);
      onLogin(data.token);
    } catch (err) {
      setError('Usuario o contraseña inválidos');
    }
  };

  return (
    <div>
      {sessionExpired && (
        <p style={{ color: 'orange' }}>
          Tu sesión expiró. Por favor, ingresa de nuevo.
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginForm;




