const express = require('express');
const router = express.Router();
const { getHolidays, addHoliday, updateHoliday, deleteHoliday } = require('../controllers/holidayController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(protect, getHolidays)
  .post(protect, adminOnly, addHoliday);

router.route('/:id')
  .put(protect, adminOnly, updateHoliday)
  .delete(protect, adminOnly, deleteHoliday);

module.exports = router;
