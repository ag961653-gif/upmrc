import { useState } from "react";
import Calendar from "react-calendar";

import "react-calendar/dist/Calendar.css";
import "./CalendarWidget.css";

export default function CalendarWidget() {
	const [date, setDate] = useState(new Date());

	return (
		<div className="bg-white rounded-lg shadow-sm p-2">
			<Calendar value={date} onChange={setDate} prev2Label={null} next2Label={null} />
		</div>
	);
}
