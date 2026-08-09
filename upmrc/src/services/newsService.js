import api from './api';

export const getNewsClippings = async () => {
  const { data } = await api.get('/news');
  return data;
};

export const addNewsClipping = async (newsData) => {
  const { data } = await api.post('/news', newsData);
  return data;
};

export const updateNewsClipping = async (id, newsData) => {
  const { data } = await api.put(`/news/${id}`, newsData);
  return data;
};

export const deleteNewsClipping = async (id) => {
  const { data } = await api.delete(`/news/${id}`);
  return data;
};
