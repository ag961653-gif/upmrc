import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CalendarWidget.css";
import { getHolidays } from "../../services/holidayService";

function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

// Shown until an admin adds holidays from /admin — 2026 Indian gazetted holidays.
const DEFAULT_HOLIDAYS = [
	{ _id: "default-1", title: "Republic Day", date: "2026-01-26" },
	{ _id: "default-2", title: "Holi", date: "2026-03-04" },
	{ _id: "default-3", title: "Ram Navami", date: "2026-03-26" },
	{ _id: "default-4", title: "Mahavir Jayanti", date: "2026-03-31" },
	{ _id: "default-5", title: "Good Friday", date: "2026-04-03" },
	{ _id: "default-6", title: "Buddha Purnima", date: "2026-05-01" },
	{ _id: "default-7", title: "Independence Day", date: "2026-08-15" },
	{ _id: "default-8", title: "Janmashtami", date: "2026-09-04" },
	{ _id: "default-9", title: "Mahatma Gandhi Jayanti", date: "2026-10-02" },
	{ _id: "default-10", title: "Dussehra", date: "2026-10-20" },
	{ _id: "default-11", title: "Diwali", date: "2026-11-08" },
	{ _id: "default-12", title: "Guru Nanak Jayanti", date: "2026-11-24" },
	{ _id: "default-13", title: "Christmas Day", date: "2026-12-25" },
];

export default function CalendarWidget() {
	const [date, setDate] = useState(new Date());
	const [holidays, setHolidays] = useState(DEFAULT_HOLIDAYS);

	useEffect(() => {
		getHolidays()
			.then((data) => setHolidays(data.length > 0 ? data : DEFAULT_HOLIDAYS))
			.catch(() => setHolidays(DEFAULT_HOLIDAYS));
	}, []);

	const holidayOnDate = (tileDate) => holidays.find((h) => isSameDay(new Date(h.date), tileDate));

	const upcoming = holidays
		.filter((h) => new Date(h.date) >= new Date(new Date().toDateString()))
		.slice(0, 3);

	return (
		<div className="bg-white rounded-lg shadow-sm p-2">
			<Calendar
				value={date}
				onChange={setDate}
				prev2Label={null}
				next2Label={null}
				tileClassName={({ date: tileDate }) => (holidayOnDate(tileDate) ? "upmrc-holiday-tile" : null)}
				tileContent={({ date: tileDate }) => {
					const holiday = holidayOnDate(tileDate);
					return holiday ? <span className="upmrc-holiday-dot" title={holiday.title} /> : null;
				}}
			/>
			{upcoming.length > 0 && (
				<div className="px-2 pb-2 pt-1 border-t border-gray-100 mt-1">
					<p className="text-xs font-semibold text-gray-500 uppercase mb-1">Upcoming Holidays</p>
					{upcoming.map((h) => (
						<div key={h._id} className="flex justify-between text-sm py-0.5">
							<span className="text-gray-700">{h.title}</span>
							<span className="text-gray-400">
								{new Date(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
							</span>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
