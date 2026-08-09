// One-off script to seed real default Quick Links + 2026 Indian gazetted holidays.
// Safe to re-run: skips anything that already exists (matched by title).
// Usage: node seedDefaults.js
require('dotenv').config();
const mongoose = require('mongoose');
const QuickLink = require('./models/QuickLink');
const Holiday = require('./models/Holiday');

const QUICK_LINKS = [
  { title: 'Official Website', url: 'https://upmetrorail.com', order: 1 },
  { title: 'Employee HRMS Portal', url: 'https://unif.upmrc-hrms.com/', order: 2 },
  { title: 'Careers / Recruitment', url: 'https://upmetrorail.com/careers/new-recruitments', order: 3 },
  { title: 'Lucknow Metro Info', url: 'https://lucknow.upmetrorail.com', order: 4 },
];

const HOLIDAYS_2026 = [
  { title: 'Republic Day', date: '2026-01-26' },
  { title: 'Holi', date: '2026-03-04' },
  { title: 'Ram Navami', date: '2026-03-26' },
  { title: 'Mahavir Jayanti', date: '2026-03-31' },
  { title: 'Good Friday', date: '2026-04-03' },
  { title: 'Buddha Purnima', date: '2026-05-01' },
  { title: 'Independence Day', date: '2026-08-15' },
  { title: 'Janmashtami', date: '2026-09-04' },
  { title: 'Mahatma Gandhi Jayanti', date: '2026-10-02' },
  { title: 'Dussehra', date: '2026-10-20' },
  { title: 'Diwali', date: '2026-11-08' },
  { title: 'Guru Nanak Jayanti', date: '2026-11-24' },
  { title: 'Christmas Day', date: '2026-12-25' },
];

(async () => {
  await mongoose.connect(process.env.MONGO_URI);

  for (const link of QUICK_LINKS) {
    await QuickLink.updateOne({ title: link.title }, { $setOnInsert: link }, { upsert: true });
  }
  console.log(`Seeded ${QUICK_LINKS.length} quick links (existing ones left untouched).`);

  for (const holiday of HOLIDAYS_2026) {
    await Holiday.updateOne({ title: holiday.title }, { $setOnInsert: holiday }, { upsert: true });
  }
  console.log(`Seeded ${HOLIDAYS_2026.length} holidays (existing ones left untouched).`);

  await mongoose.disconnect();
})();
