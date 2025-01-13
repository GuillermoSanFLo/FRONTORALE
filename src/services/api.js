import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/ver1';

// Usuarios Service
export const getAllUsuarios = async () => {
  const response = await axios.get(`${BASE_URL}/usuarios`);
  return response.data;
};

export const getUsuarioById = async (id) => {
  const response = await axios.get(`${BASE_URL}/usuarios/${id}`);
  return response.data;
};

export const createUsuario = async (usuario) => {
  const response = await axios.post(`${BASE_URL}/usuarios`, usuario);
  return response.data;
};

export const updateUsuario = async (id, usuario) => {
  const response = await axios.put(`${BASE_URL}/usuarios/${id}`, usuario);
  return response.data;
};

export const deleteUsuario = async (id) => {
  const response = await axios.delete(`${BASE_URL}/usuarios/${id}`);
  return response.data;
};

export const getUsuariosByRol = async (rol) => {
  const response = await axios.get(`${BASE_URL}/usuarios/rol/${rol}`);
  return response.data;
};

export const getUsuarioByEmail = async (email) => {
  const response = await axios.get(`${BASE_URL}/usuarios/email/${email}`);
  return response.data;
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Contraseña incorrecta');
    } else if (error.response && error.response.status === 404) {
      throw new Error('Usuario no encontrado');
    } else {
      throw new Error('Error en el servidor');
    }
  }
};

// Mentorias Service
export const getAllMentorias = async () => {
  const response = await axios.get(`${BASE_URL}/PlataformaMentoria/mentorias`);
  return response.data;
};

export const getMentoriaById = async (id) => {
  const response = await axios.get(`${BASE_URL}/PlataformaMentoria/mentorias/${id}`);
  return response.data;
};
export const crearMentoria = async (mentoria) => {
  try {
    const response = await axios.post(`${BASE_URL}/PlataformaMentoria/mentorias`, mentoria);
    return response.data;
  } catch (error) {
    console.error('Error creando la mentoría:', error);
    throw error;
  }
};
export const createMentoria = async (mentoria) => {
  const response = await axios.post(`${BASE_URL}/PlataformaMentoria/mentorias`, mentoria);
  return response.data;
};

export const updateMentoria = async (id, mentoria) => {
  const response = await axios.put(`${BASE_URL}/PlataformaMentoria/mentorias/${id}`, mentoria);
  return response.data;
};

export const deleteMentoria = async (id) => {
  const response = await axios.delete(`${BASE_URL}/PlataformaMentoria/mentorias/${id}`);
  return response.data;
};

export const getMentoriasByEstado = async (estado) => {
  const response = await axios.get(`${BASE_URL}/PlataformaMentoria/mentorias/estado/${estado}`);
  return response.data;
};

export const getMentoriasByUsuario = async (usuarioId) => {
  const response = await axios.get(`${BASE_URL}/PlataformaMentoria/mentorias/usuario/${usuarioId}`);
  return response.data;
};

// Resenas Service
export const getAllResenas = async () => {
  const response = await axios.get(`${BASE_URL}/resenas`);
  return response.data;
};

export const getResenaById = async (id) => {
  const response = await axios.get(`${BASE_URL}/resenas/${id}`);
  return response.data;
};

export const getResenasByMentoriaId = async (mentoriaId) => {
  const response = await axios.get(`${BASE_URL}/resenas/mentoria/${mentoriaId}`);
  return response.data;
};

export const createResena = async (resena) => {
  const response = await axios.post(`${BASE_URL}/resenas`, resena);
  return response.data;
};

export const updateResena = async (id, resena) => {
  const response = await axios.put(`${BASE_URL}/resenas/${id}`, resena);
  return response.data;
};

export const deleteResena = async (id) => {
  const response = await axios.delete(`${BASE_URL}/resenas/${id}`);
  return response.data;
};

// Habilidades Service
export const getAllHabilidades = async () => {
  const response = await axios.get(`${BASE_URL}/habilidades`);
  return response.data;
};

export const getHabilidadById = async (id) => {
  const response = await axios.get(`${BASE_URL}/habilidades/${id}`);
  return response.data;
};

export const createHabilidad = async (habilidad) => {
  const response = await axios.post(`${BASE_URL}/habilidades`, habilidad);
  return response.data;
};

export const deleteHabilidad = async (id) => {
  const response = await axios.delete(`${BASE_URL}/habilidades/${id}`);
  return response.data;
};

// Mensajes Service
export const getAllMensajes = async () => {
  const response = await axios.get(`${BASE_URL}/mensajes`);
  return response.data;
};

export const getMensajeById = async (id) => {
  const response = await axios.get(`${BASE_URL}/mensajes/${id}`);
  return response.data;
};

export const createMensaje = async (mensaje) => {
  const response = await axios.post(`${BASE_URL}/mensajes`, mensaje);
  return response.data;
};

export const deleteMensaje = async (id) => {
  const response = await axios.delete(`${BASE_URL}/mensajes/${id}`);
  return response.data;
};

export const inscribirAprendiz = async (idMentoria, idAprendiz) => {
  try {
    const response = await axios.put(`${BASE_URL}/PlataformaMentoria/mentorias/${idMentoria}/inscribir/${idAprendiz}`);
    return response.data;
  } catch (error) {
    console.error('Error inscribiendo al aprendiz:', error);
    throw error;
  }
};
export const getConversacionByMentoriaId = async (idMentoria) => {
  try {
    const response = await axios.get(`${BASE_URL}/mensajes/mentoria/${idMentoria}/conversacion`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo la conversación:', error);
    throw error;
  }
};