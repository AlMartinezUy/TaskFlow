import React, { useState } from 'react';
import { registerUser } from '../services/api';

/*
 * Formulario de registro de nuevos usuarios
 *
 * - Permite ingresar username, email y password
 * - Envia los datos al backend mediante la API
 * - Muestra un mensaje de exito o error segun la respuesta
 */

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      setMessage('Usuario registrado correctamente. ¡Ahora podés iniciar sesión!');
    } catch (err) {
      setMessage('Error al registrar el usuario.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro</h3>
      <input
        type="text"
        name="username"
        placeholder="Nombre de usuario"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Correo"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
      />
      {message && <div>{message}</div>}
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterForm;

