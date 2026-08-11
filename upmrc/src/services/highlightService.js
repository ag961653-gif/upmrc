import api from './api';

export const getHighlights = async () => {
  const { data } = await api.get('/highlights');
  return data;
};

export const addHighlight = async (highlightData) => {
  const { data } = await api.post('/highlights', highlightData);
  return data;
};

export const updateHighlight = async (id, highlightData) => {
  const { data } = await api.put(`/highlights/${id}`, highlightData);
  return data;
};

export const deleteHighlight = async (id) => {
  const { data } = await api.delete(`/highlights/${id}`);
  return data;
};
