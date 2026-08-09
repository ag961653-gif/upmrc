const express = require('express');
const router = express.Router();
const { getEmployees, addEmployee, updateEmployee, deleteEmployee, getTodaysBirthdays } = require('../controllers/employeeController');
const { protect } = require('../middleware/auth');

router.get('/birthdays/today', protect, getTodaysBirthdays);

router.route('/')
  .get(protect, getEmployees)
  .post(protect, addEmployee);

router.route('/:id')
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
