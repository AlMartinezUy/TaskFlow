import React, { useState } from 'react';
import { createTask } from '../services/api';

/*
 * Formulario para crear nuevas tareas
 *
 * - Valida que la fecha de vencimiento no sea anterior a hoy
 * - Permite crear una tarea con titulo, descripcion, fecha y estado inicial
 * - Llama a la API con el token JWT y notifica al padre con la nueva tarea creada
 *
 *  {string} token JWT del usuario autenticado
 *  {function} onTaskCreated callback para notificar al padre (TaskList) que se creo una nueva tarea
 */

const TaskForm = ({ token, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [completed, setCompleted] = useState(false); 
  const [dueDateError, setDueDateError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    if (dueDate && dueDate < today) {
      setDueDateError('La fecha no puede ser anterior a hoy');
      return;
    }
    setDueDateError('');
    try {
        const newTask = await createTask(
        { title, description, dueDate, completed },
        token
      );
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setDueDate('');
      setCompleted(false);
    } catch (err) {
      console.error('Error creando tarea', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>
        Fecha de vencimiento:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      {dueDateError && (
        <div style={{ color: 'red', marginTop: '4px' }}>
          {dueDateError}
        </div>
      )}
      <label style={{ display: 'block', marginTop: '8px' }}>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />{' '}
        Completada
      </label>
      <button type="submit" style={{ marginTop: '8px' }}>
        Crear tarea
      </button>
    </form>
  );
};

export default TaskForm;






