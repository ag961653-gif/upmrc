const QuickLink = require('../models/QuickLink');

const getQuickLinks = async (req, res) => {
  try {
    const links = await QuickLink.find().sort('order createdAt');
    res.json(links);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addQuickLink = async (req, res) => {
  try {
    const link = await QuickLink.create(req.body);
    res.status(201).json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateQuickLink = async (req, res) => {
  try {
    const link = await QuickLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!link) {
      return res.status(404).json({ message: 'Quick link not found' });
    }
    res.json(link);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteQuickLink = async (req, res) => {
  try {
    const link = await QuickLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return res.status(404).json({ message: 'Quick link not found' });
    }
    res.json({ message: 'Quick link removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuickLinks, addQuickLink, updateQuickLink, deleteQuickLink };
