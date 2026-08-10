// Runs once per boot, after the DB connects. Self-disabling and idempotent:
// safe to run on every deploy. Exists so a fresh database ends up with an
// admin account and real starter content without needing shell/DB access.
const User = require('./models/User');
const Employee = require('./models/Employee');
const QuickLink = require('./models/QuickLink');
const Holiday = require('./models/Holiday');
const NewsClipping = require('./models/NewsClipping');

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

const DUMMY_NEWS = Array.from({ length: 10 }, (_, i) => ({
  title: `Sample Clipping ${i + 1}`,
  image: `https://picsum.photos/seed/upmrc-news-${i + 1}/600/600`,
  order: i + 1,
}));

const DUMMY_EMPLOYEES = [
  { name: 'Pawan Chahar', role: 'Sr Maintainer', email: 'pawan.chahar@upmrc.com', phone: '+91 9800000001', dateOfBirth: '1996-08-10' },
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

async function runBootstrap() {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    let admin = null;

    if (adminCount === 0) {
      // Earliest real signup becomes admin. Excludes throwaway QA/test accounts.
      admin = await User.findOne({ email: { $not: /^qa-test-/i } }).sort('createdAt');
      if (admin) {
        admin.role = 'admin';
        await admin.save();
        console.log(`[bootstrap] Promoted ${admin.email} to admin.`);
      }
    } else {
      admin = await User.findOne({ role: 'admin' }).sort('createdAt');
    }

    for (const link of QUICK_LINKS) {
      await QuickLink.updateOne({ title: link.title }, { $setOnInsert: link }, { upsert: true });
    }
    for (const holiday of HOLIDAYS_2026) {
      await Holiday.updateOne({ title: holiday.title }, { $setOnInsert: holiday }, { upsert: true });
    }
    for (const clipping of DUMMY_NEWS) {
      await NewsClipping.updateOne({ title: clipping.title }, { $setOnInsert: clipping }, { upsert: true });
    }

    if (admin) {
      const employeeCount = await Employee.countDocuments();
      if (employeeCount === 0) {
        for (const emp of DUMMY_EMPLOYEES) {
          await Employee.updateOne(
            { email: emp.email },
            { $setOnInsert: { ...emp, createdBy: admin._id } },
            { upsert: true }
          );
        }
        console.log(`[bootstrap] Seeded ${DUMMY_EMPLOYEES.length} demo employees under ${admin.email}.`);
      }
    }

    console.log('[bootstrap] Startup data check complete.');
  } catch (error) {
    console.error('[bootstrap] Failed:', error.message);
  }
}

module.exports = runBootstrap;
