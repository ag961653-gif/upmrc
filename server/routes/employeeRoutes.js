const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee, getTodaysBirthdays } = require('../controllers/employeeController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/birthdays/today', protect, getTodaysBirthdays);

router.route('/')
  .get(protect, getEmployees)
  .post(protect, adminOnly, addEmployee);

router.route('/:id')
  .put(protect, adminOnly, updateEmployee)
  .delete(protect, adminOnly, deleteEmployee);

module.exports = router;
