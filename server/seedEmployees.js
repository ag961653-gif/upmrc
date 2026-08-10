// One-off script to seed 10 dummy employees (varied dates of birth, including
// one that matches today so the birthday feature has something to show).
// Usage: node seedEmployees.js <owner-email>
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Employee = require('./models/Employee');

const email = process.argv[2];

if (!email) {
  console.error('Usage: node seedEmployees.js <owner-email>');
  process.exit(1);
}

function todayShiftedYears(yearsAgo) {
  const d = new Date();
  d.setFullYear(d.getFullYear() - yearsAgo);
  return d.toISOString().slice(0, 10);
}

const EMPLOYEES = [
  { name: 'Pawan Chahar', role: 'Sr Maintainer', email: 'pawan.chahar@upmrc.com', phone: '+91 9800000001', dateOfBirth: todayShiftedYears(29) },
  { name: 'Harish Kumar Madhyesia', role: 'SCTO', email: 'harish.kumar@upmrc.com', phone: '+91 9800000002', dateOfBirth: '1990-01-15' },
  { name: 'Neha Sharma', role: 'HR Executive', email: 'neha.sharma@upmrc.com', phone: '+91 9800000003', dateOfBirth: '1994-03-22' },
  { name: 'Ravi Verma', role: 'Station Controller', email: 'ravi.verma@upmrc.com', phone: '+91 9800000004', dateOfBirth: '1988-05-09' },
  { name: 'Anjali Gupta', role: 'Finance Officer', email: 'anjali.gupta@upmrc.com', phone: '+91 9800000005', dateOfBirth: '1992-06-30' },
  { name: 'Suresh Yadav', role: 'Train Operator', email: 'suresh.yadav@upmrc.com', phone: '+91 9800000006', dateOfBirth: '1985-07-18' },
  { name: 'Priya Singh', role: 'Signal Engineer', email: 'priya.singh@upmrc.com', phone: '+91 9800000007', dateOfBirth: '1996-09-05' },
  { name: 'Amit Tiwari', role: 'Maintenance Engineer', email: 'amit.tiwari@upmrc.com', phone: '+91 9800000008', dateOfBirth: '1991-10-12' },
  { name: 'Kavita Rao', role: 'Customer Relations', email: 'kavita.rao@upmrc.com', phone: '+91 9800000009', dateOfBirth: '1993-11-27' },
  { name: 'Deepak Mishra', role: 'Security Officer', email: 'deepak.mishra@upmrc.com', phone: '+91 9800000010', dateOfBirth: '1987-12-03' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const owner = await User.findOne({ email });
  if (!owner) {
    console.error(`No user found with email ${email}`);
    process.exit(1);
  }

  for (const emp of EMPLOYEES) {
    await Employee.updateOne(
      { email: emp.email },
      { $setOnInsert: { ...emp, createdBy: owner._id } },
      { upsert: true }
    );
  }
  console.log(`Seeded ${EMPLOYEES.length} employees under ${owner.email} (existing ones left untouched).`);

  await mongoose.disconnect();
})();
