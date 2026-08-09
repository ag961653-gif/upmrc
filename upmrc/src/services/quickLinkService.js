import api from './api';

export const getQuickLinks = async () => {
  const { data } = await api.get('/quicklinks');
  return data;
};

export const addQuickLink = async (linkData) => {
  const { data } = await api.post('/quicklinks', linkData);
  return data;
};

export const updateQuickLink = async (id, linkData) => {
  const { data } = await api.put(`/quicklinks/${id}`, linkData);
  return data;
};

export const deleteQuickLink = async (id) => {
  const { data } = await api.delete(`/quicklinks/${id}`);
  return data;
};
