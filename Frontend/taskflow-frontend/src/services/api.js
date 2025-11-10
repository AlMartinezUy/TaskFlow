const API_BASE = 'http://localhost:8080/api';

/*
 * Maneja errores de autenticacion
 * - Si la API devuelve 401 o 403, borra el token y redirige al login.
 */

// Manejo de errores de autenticacion
function handleAuthError(res) {
  if (res.status === 401 || res.status === 403) {
    localStorage.removeItem('token');
    window.location.href = '/';
    throw new Error('Token inválido o expirado');
  }
}

// AUTENTICACION
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error('Login fallido');
  return res.json(); // → { token: '...' }
}

export async function registerUser(data) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Registro fallido');
}

// TAREAS
export async function getTasksByUser(token) {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) handleAuthError(res);
  return res.json();
}

export async function getTaskById(taskId, token) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) handleAuthError(res);
  return res.json();
}

export async function createTask(task, token) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) handleAuthError(res);
  return res.json();
}

export async function updateTask(taskId, task, token) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });
  if (!res.ok) handleAuthError(res);
  return res.json();
}

export async function deleteTask(taskId, token) {
  const res = await fetch(`${API_BASE}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  if (!res.ok) handleAuthError(res);
}





