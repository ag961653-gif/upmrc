// One-off script to seed real default Quick Links, the 2026 Indian gazetted
// holiday calendar, and placeholder news clippings.
// Safe to re-run: skips anything that already exists (matched by title).
// Usage: node seedDefaults.js
require('dotenv').config();
const mongoose = require('mongoose');
const QuickLink = require('./models/QuickLink');
const Holiday = require('./models/Holiday');
const NewsClipping = require('./models/NewsClipping');
const Circular = require('./models/Circular');
const Highlight = require('./models/Highlight');

// All verified via web search against upmetrorail.com and its subdomains.
const QUICK_LINKS = [
  { title: 'Official Website', url: 'https://upmetrorail.com', order: 1 },
  { title: 'Employee HRMS Portal', url: 'https://unif.upmrc-hrms.com/', order: 2 },
  { title: 'Careers / Recruitment', url: 'https://upmetrorail.com/careers/new-recruitments', order: 3 },
  { title: 'Tenders', url: 'https://upmetrorail.com/tenders', order: 4 },
  { title: 'Lucknow Metro', url: 'https://lucknow.upmetrorail.com', order: 5 },
  { title: 'Kanpur Metro', url: 'https://kanpur.upmetrorail.com/pages/project-overview', order: 6 },
  { title: 'Agra Metro', url: 'https://agra.upmetrorail.com', order: 7 },
  { title: 'Meerut Metro', url: 'https://meerutmetro.in', order: 8 },
  { title: 'Facebook', url: 'https://www.facebook.com/OfficialUPMetro/', order: 9 },
  { title: 'X (Twitter)', url: 'https://x.com/officialupmetro', order: 10 },
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

// Real, working placeholder images (picsum.photos) — swap for real clippings via /admin whenever ready.
const DUMMY_NEWS = Array.from({ length: 10 }, (_, i) => ({
  title: `Sample Clipping ${i + 1}`,
  image: `https://picsum.photos/seed/upmrc-news-${i + 1}/600/600`,
  order: i + 1,
}));

const CIRCULARS_DEFAULT = [
  { number: '144-2023', title: 'Fare Chart of Aqua Line Lucknow Metro (w.e.f. 11.09.2023)', publishedDate: '11-Sep-2023', pdf: '#', order: 1 },
  { number: '76-2022', title: 'Holiday List for Employees - Calendar Year 2024', publishedDate: '25-Dec-2023', pdf: '#', order: 2 },
  { number: '65-2022', title: 'Guidelines regarding Employee Leave Management', publishedDate: '02-Aug-2023', pdf: '#', order: 3 },
  { number: '41-2022', title: 'Updated Medical Reimbursement Policy', publishedDate: '15-Jul-2023', pdf: '#', order: 4 },
];

const HIGHLIGHTS_DEFAULT = [
  { title: 'Metro 1', image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600', order: 1 },
  { title: 'Metro 2', image: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=1600', order: 2 },
  { title: 'Metro 3', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600', order: 3 },
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

  for (const clipping of DUMMY_NEWS) {
    await NewsClipping.updateOne({ title: clipping.title }, { $setOnInsert: clipping }, { upsert: true });
  }
  console.log(`Seeded ${DUMMY_NEWS.length} placeholder news clippings (existing ones left untouched).`);

  for (const circular of CIRCULARS_DEFAULT) {
    await Circular.updateOne({ number: circular.number }, { $setOnInsert: circular }, { upsert: true });
  }
  console.log(`Seeded ${CIRCULARS_DEFAULT.length} circulars (existing ones left untouched).`);

  for (const highlight of HIGHLIGHTS_DEFAULT) {
    await Highlight.updateOne({ title: highlight.title }, { $setOnInsert: highlight }, { upsert: true });
  }
  console.log(`Seeded ${HIGHLIGHTS_DEFAULT.length} highlights (existing ones left untouched).`);

  await mongoose.disconnect();
})();
