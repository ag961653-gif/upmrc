const express = require('express');
const router = express.Router();
const { getQuickLinks, addQuickLink, updateQuickLink, deleteQuickLink } = require('../controllers/quickLinkController');
const { protect, adminOnly } = require('../middleware/auth');

router.route('/')
  .get(protect, getQuickLinks)
  .post(protect, adminOnly, addQuickLink);

router.route('/:id')
  .put(protect, adminOnly, updateQuickLink)
  .delete(protect, adminOnly, deleteQuickLink);

module.exports = router;
