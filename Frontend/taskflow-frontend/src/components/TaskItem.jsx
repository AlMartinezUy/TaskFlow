import React, { useState } from 'react';
import { updateTask } from '../services/api';

/*
 * Item individual de tarea
 *
 * - Muestra los detalles de una tarea (titulo, descripcion, fecha, estado)
 * - Permite alternar entre modo lectura y edicion
 * - Actualiza la tarea en el backend y en el estado global
 * - Permite eliminar la tarea a través del callback recibido
 *
 * {Object} task datos de la tarea ({ id, title, description, dueDate, completed })
 * {string} token JWT del usuario autenticado
 * {function} onUpdate callback para notificar actualizacion de la tarea
 * {function} onDelete callback para eliminar la tarea
 */

const TaskItem = ({ task, token, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate || '');
  const [completed, setCompleted] = useState(task.completed || false);

  // Formatea "YYYY-MM-DD" como "DD/MM/YYYY"
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleUpdate = async () => {
    try {
      const updated = await updateTask(
        task.id,
        { title, description, dueDate, completed },
        token
      );
      onUpdate(updated);
      setEditing(false);
    } catch (err) {
      console.error('Error actualizando tarea', err);
    }
  };

  // Estilo inline para el texto tachado cuando esta completada
  const textStyle = {
    textDecoration: completed ? 'line-through' : 'none',
    color: completed ? '#888' : '#000'
  };

  return (
    <li style={{ marginBottom: '8px' }}>
      {editing ? (
        <>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
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
          <label style={{ display: 'block', marginTop: '4px' }}>
            <input
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />{' '}
            Completada
          </label>
          <button onClick={handleUpdate}>Guardar</button>{' '}
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <div>
          <div style={textStyle}>
            <strong>{task.title}</strong>{' '}
            {task.dueDate && <em>(vence: {formatDate(task.dueDate)})</em>}
            : {task.description}
          </div>
          <div style={{ marginTop: '4px' }}>
            {completed ? (
              <span style={{ color: 'green', marginRight: '8px' }}>✅ Completada</span>
            ) : (
              <span style={{ color: 'orange', marginRight: '8px' }}>🕒 Pendiente</span>
            )}
            <button onClick={() => setEditing(true)}>Editar</button>{' '}
            <button onClick={() => onDelete(task.id)}>Eliminar</button>
          </div>
        </div>
      )}
    </li>
  );
};

export default TaskItem;












