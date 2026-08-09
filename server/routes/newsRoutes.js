const express = require('express');
const router = express.Router();
const { getNewsClippings, addNewsClipping, updateNewsClipping, deleteNewsClipping } = require('../controllers/newsController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(protect, getNewsClippings)
  .post(protect, adminOnly, addNewsClipping);

router.route('/:id')
  .put(protect, adminOnly, updateNewsClipping)
  .delete(protect, adminOnly, deleteNewsClipping);

module.exports = router;
