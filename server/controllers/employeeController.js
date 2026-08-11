const Employee = require('../models/Employee');

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort('-createdAt');
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addEmployee = async (req, res) => {
  try {
    const employee = await Employee.create({
      ...req.body,
      createdBy: req.user._id,
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedEmployee);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.deleteOne();
    res.json({ message: 'Employee removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTodaysBirthdays = async (req, res) => {
  try {
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const employees = await Employee.aggregate([
      { $match: { dateOfBirth: { $exists: true, $ne: null } } },
      {
        $addFields: {
          bMonth: { $month: '$dateOfBirth' },
          bDay: { $dayOfMonth: '$dateOfBirth' },
        },
      },
      { $match: { bMonth: month, bDay: day } },
      { $project: { bMonth: 0, bDay: 0 } },
    ]);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee, getTodaysBirthdays };
