import api from './api';

export const getHolidays = async () => {
  const { data } = await api.get('/holidays');
  return data;
};

export const addHoliday = async (holidayData) => {
  const { data } = await api.post('/holidays', holidayData);
  return data;
};

export const updateHoliday = async (id, holidayData) => {
  const { data } = await api.put(`/holidays/${id}`, holidayData);
  return data;
};

export const deleteHoliday = async (id) => {
  const { data } = await api.delete(`/holidays/${id}`);
  return data;
};
