import { useState, useEffect } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CalendarWidget.css";
import { getHolidays } from "../../services/holidayService";

function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function CalendarWidget() {
	const [date, setDate] = useState(new Date());
	const [holidays, setHolidays] = useState([]);

	useEffect(() => {
		getHolidays()
			.then(setHolidays)
			.catch(() => setHolidays([]));
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
