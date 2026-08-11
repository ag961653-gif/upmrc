const express = require('express');
const router = express.Router();
const { getCirculars, addCircular, updateCircular, deleteCircular } = require('../controllers/circularController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(protect, getCirculars)
  .post(protect, adminOnly, addCircular);

router.route('/:id')
  .put(protect, adminOnly, updateCircular)
  .delete(protect, adminOnly, deleteCircular);

module.exports = router;
