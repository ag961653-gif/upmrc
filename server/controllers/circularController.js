const Circular = require('../models/Circular');

const getCirculars = async (req, res) => {
  try {
    const circulars = await Circular.find().sort('order createdAt');
    res.json(circulars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCircular = async (req, res) => {
  try {
    const circular = await Circular.create(req.body);
    res.status(201).json(circular);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateCircular = async (req, res) => {
  try {
    const circular = await Circular.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!circular) {
      return res.status(404).json({ message: 'Circular not found' });
    }
    res.json(circular);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCircular = async (req, res) => {
  try {
    const circular = await Circular.findByIdAndDelete(req.params.id);
    if (!circular) {
      return res.status(404).json({ message: 'Circular not found' });
    }
    res.json({ message: 'Circular removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getCirculars, addCircular, updateCircular, deleteCircular };
