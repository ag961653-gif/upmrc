const Highlight = require('../models/Highlight');

const getHighlights = async (req, res) => {
  try {
    const highlights = await Highlight.find().sort('order createdAt');
    res.json(highlights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.create(req.body);
    res.status(201).json(highlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    res.json(highlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHighlight = async (req, res) => {
  try {
    const highlight = await Highlight.findByIdAndDelete(req.params.id);
    if (!highlight) {
      return res.status(404).json({ message: 'Highlight not found' });
    }
    res.json({ message: 'Highlight removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHighlights, addHighlight, updateHighlight, deleteHighlight };
