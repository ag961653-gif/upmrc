const express = require('express');
const router = express.Router();
const { getHighlights, addHighlight, updateHighlight, deleteHighlight } = require('../controllers/highlightController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(protect, getHighlights)
  .post(protect, adminOnly, addHighlight);

router.route('/:id')
  .put(protect, adminOnly, updateHighlight)
  .delete(protect, adminOnly, deleteHighlight);

module.exports = router;
