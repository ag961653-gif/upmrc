import api from './api';

export const getCirculars = async () => {
  const { data } = await api.get('/circulars');
  return data;
};

export const addCircular = async (circularData) => {
  const { data } = await api.post('/circulars', circularData);
  return data;
};

export const updateCircular = async (id, circularData) => {
  const { data } = await api.put(`/circulars/${id}`, circularData);
  return data;
};

export const deleteCircular = async (id) => {
  const { data } = await api.delete(`/circulars/${id}`);
  return data;
};
