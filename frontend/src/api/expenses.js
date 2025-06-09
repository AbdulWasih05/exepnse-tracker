import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getExpenses = (filters = {}) => {
  return API.get('/expenses', { params: filters });
};

export const createExpense = (expense) => {
  return API.post('/expenses', expense);
};

export const updateExpense = (id, expense) => {
  return API.put(`/expenses/${id}`, expense);
};

export const deleteExpense = (id) => {
  return API.delete(`/expenses/${id}`);
};
