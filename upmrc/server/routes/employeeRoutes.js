const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} = require('../controllers/employeeController');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

router.get('/', getEmployees);
router.post('/', addEmployee);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);

module.exports = router;
