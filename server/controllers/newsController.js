const NewsClipping = require('../models/NewsClipping');

const getNewsClippings = async (req, res) => {
  try {
    const clippings = await NewsClipping.find().sort('order createdAt');
    res.json(clippings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addNewsClipping = async (req, res) => {
  try {
    const clipping = await NewsClipping.create(req.body);
    res.status(201).json(clipping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateNewsClipping = async (req, res) => {
  try {
    const clipping = await NewsClipping.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!clipping) {
      return res.status(404).json({ message: 'News clipping not found' });
    }
    res.json(clipping);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteNewsClipping = async (req, res) => {
  try {
    const clipping = await NewsClipping.findByIdAndDelete(req.params.id);
    if (!clipping) {
      return res.status(404).json({ message: 'News clipping not found' });
    }
    res.json({ message: 'News clipping removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNewsClippings, addNewsClipping, updateNewsClipping, deleteNewsClipping };
