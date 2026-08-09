const Holiday = require('../models/Holiday');

const getHolidays = async (req, res) => {
  try {
    const holidays = await Holiday.find().sort('date');
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.create(req.body);
    res.status(201).json(holiday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.json(holiday);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteHoliday = async (req, res) => {
  try {
    const holiday = await Holiday.findByIdAndDelete(req.params.id);
    if (!holiday) {
      return res.status(404).json({ message: 'Holiday not found' });
    }
    res.json({ message: 'Holiday removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getHolidays, addHoliday, updateHoliday, deleteHoliday };
