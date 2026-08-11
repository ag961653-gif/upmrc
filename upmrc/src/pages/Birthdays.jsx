import { useState, useEffect } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import PortalLayout from '../components/Layout/PortalLayout';
import * as employeeService from '../services/employeeService';

export default function Birthdays() {
  const [todaysBirthdays, setTodaysBirthdays] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const [today, all] = await Promise.all([
          employeeService.getTodaysBirthdays(),
          employeeService.getEmployees(),
        ]);
        setTodaysBirthdays(today);

        const now = new Date();
        const withUpcoming = all
          .filter((e) => e.dateOfBirth)
          .map((e) => {
            const dob = new Date(e.dateOfBirth);
            const next = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
            if (next < new Date(now.toDateString())) next.setFullYear(now.getFullYear() + 1);
            return { ...e, nextBirthday: next };
          })
          .filter((e) => e.nextBirthday > new Date(now.toDateString()))
          .sort((a, b) => a.nextBirthday - b.nextBirthday)
          .slice(0, 10);
        setUpcoming(withUpcoming);
      } catch (error) {
        console.error('Failed to load birthdays:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PortalLayout>
      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <FaBirthdayCake className="text-pink-500" /> Birthdays
          </h2>
          <p className="text-slate-500 mt-1">Pulled live from each employee's date of birth — no fixed list to maintain.</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-pink-500"></div>
          </div>
        ) : (
          <>
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Today</h3>
              {todaysBirthdays.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                  No one on the team has a birthday today.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {todaysBirthdays.map((person) => (
                    <div key={person._id} className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-5 shadow-sm">
                      <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center mb-3">
                        <span className="text-2xl font-bold text-pink-600">{person.name?.[0]}</span>
                      </div>
                      <div className="font-semibold text-slate-900">{person.name}</div>
                      <div className="text-sm text-slate-500">{person.role}</div>
                      <div className="text-xs text-pink-600 font-medium mt-2 flex items-center gap-1">
                        <FaBirthdayCake /> Happy Birthday!
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Upcoming</h3>
              {upcoming.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center text-slate-500">
                  No upcoming birthdays on record.
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                  {upcoming.map((person) => (
                    <div key={person._id} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <div className="font-medium text-slate-900">{person.name}</div>
                        <div className="text-sm text-slate-500">{person.role}</div>
                      </div>
                      <div className="text-sm text-slate-500">
                        {person.nextBirthday.toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </PortalLayout>
  );
}
