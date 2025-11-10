import React, { useEffect, useState } from 'react';
import { getTasksByUser, deleteTask } from '../services/api';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';

/*
 * Lista de tareas del usuario autenticado
 *
 * - Obtiene las tareas desde la API usando el token JWT
 * - Permite crear, actualizar y eliminar tareas
 * - Muestra errores si ocurre un problema con la API
 *
 * {string} token JWT del usuario autenticado
 * {function} onLogout callback para cerrar sesion
 */

const TaskList = ({ token, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  const loadTasks = async () => {
    try {
      const fetched = await getTasksByUser(token);
      setTasks(fetched);
    } catch (err) {
      console.error(err);
      setError('Error al cargar tareas');
    }
  };

  useEffect(() => {
    loadTasks();
  }, [token]);

  const handleCreated = (newTask) => setTasks((prev) => [...prev, newTask]);
  const handleUpdated = (updated) =>
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  const handleDeleted = async (id) => {
    try {
      await deleteTask(id, token);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setError('Error al eliminar tarea');
    }
  };

  return (
    <div>
      <h2>Mis Tareas</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button
        onClick={onLogout}
        style={{ maxWidth: '600px', margin: '1.5rem auto', display: 'block' }}
      >
        Cerrar sesión
      </button>
      <TaskForm token={token} onTaskCreated={handleCreated} />
      <ul>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            token={token}
            onUpdate={handleUpdated}
            onDelete={handleDeleted}
          />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;






