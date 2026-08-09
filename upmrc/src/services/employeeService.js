import api from './api';

export const getEmployees = async () => {
  const { data } = await api.get('/employees');
  return data;
};

export const addEmployee = async (employeeData) => {
  const { data } = await api.post('/employees', employeeData);
  return data;
};

export const updateEmployee = async (id, employeeData) => {
  const { data } = await api.put(`/employees/${id}`, employeeData);
  return data;
};

export const deleteEmployee = async (id) => {
  const { data } = await api.delete(`/employees/${id}`);
  return data;
};

export const getTodaysBirthdays = async () => {
  const { data } = await api.get('/employees/birthdays/today');
  return data;
};
