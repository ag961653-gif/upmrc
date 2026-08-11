import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import { FaRegCalendarCheck, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";

import "react-calendar/dist/Calendar.css";
import "./CalendarWidget.css";
import { getHolidays, updateHoliday, deleteHoliday } from "../../services/holidayService";
import { useAuth } from "../../context/AuthContext";

function isSameDay(a, b) {
	return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

const inputClass = "w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500";

export default function CalendarWidget() {
	const { isAdmin } = useAuth();
	const [date, setDate] = useState(new Date());
	const [holidays, setHolidays] = useState([]);
	const [selectedHoliday, setSelectedHoliday] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [editForm, setEditForm] = useState({ title: "", description: "" });

	const fetchHolidays = () => {
		getHolidays()
			.then(setHolidays)
			.catch(() => setHolidays([]));
	};

	useEffect(() => {
		fetchHolidays();
	}, []);

	const holidayOnDate = (tileDate) => holidays.find((h) => isSameDay(new Date(h.date), tileDate));

	const resetSelection = () => {
		setIsEditing(false);
		setIsDeleting(false);
	};

	const handleDayClick = (clickedDate) => {
		setDate(clickedDate);
		setSelectedDate(clickedDate);
		setSelectedHoliday(holidayOnDate(clickedDate) || null);
		resetSelection();
	};

	const openEdit = () => {
		setEditForm({ title: selectedHoliday.title, description: selectedHoliday.description || "" });
		setIsEditing(true);
	};

	const handleEditSubmit = async (e) => {
		e.preventDefault();
		const updated = await updateHoliday(selectedHoliday._id, editForm);
		setSelectedHoliday(updated);
		setHolidays((prev) => prev.map((h) => (h._id === updated._id ? updated : h)));
		setIsEditing(false);
	};

	const handleDeleteConfirm = async () => {
		await deleteHoliday(selectedHoliday._id);
		setHolidays((prev) => prev.filter((h) => h._id !== selectedHoliday._id));
		setSelectedHoliday(null);
		setIsDeleting(false);
	};

	const upcoming = holidays
		.filter((h) => new Date(h.date) >= new Date(new Date().toDateString()))
		.sort((a, b) => new Date(a.date) - new Date(b.date))
		.slice(0, 3);

	return (
		<div className="bg-white rounded-lg shadow-sm p-2">
			<Calendar
				value={date}
				onChange={setDate}
				onClickDay={handleDayClick}
				prev2Label={null}
				next2Label={null}
				tileClassName={({ date: tileDate }) => (holidayOnDate(tileDate) ? "upmrc-holiday-tile" : null)}
			/>

			{selectedDate && (
				<div className="px-2 py-2 mt-1 border-t border-gray-100 text-sm">
					<div className="flex items-center justify-between">
						<span className="font-medium text-gray-700">
							{selectedDate.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
						</span>
						{isAdmin && selectedHoliday && !isEditing && !isDeleting && (
							<div className="flex items-center gap-1">
								<button onClick={openEdit} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md" title="Edit holiday">
									<FaEdit className="text-xs" />
								</button>
								<button onClick={() => setIsDeleting(true)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-md" title="Remove holiday">
									<FaTrash className="text-xs" />
								</button>
							</div>
						)}
					</div>

					{isEditing ? (
						<form onSubmit={handleEditSubmit} className="mt-2 space-y-2">
							<input
								className={inputClass}
								required
								value={editForm.title}
								onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
								placeholder="Holiday name"
							/>
							<input
								className={inputClass}
								value={editForm.description}
								onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
								placeholder="Description (optional)"
							/>
							<div className="flex gap-2">
								<button type="submit" className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg">
									<FaCheck className="text-xs" /> Save
								</button>
								<button type="button" onClick={() => setIsEditing(false)} className="flex items-center gap-1 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-lg">
									<FaTimes className="text-xs" /> Cancel
								</button>
							</div>
						</form>
					) : isDeleting ? (
						<div className="mt-2 flex items-center justify-between bg-red-50 border border-red-100 rounded-lg px-3 py-2">
							<span className="text-red-700 text-xs">Remove <b>{selectedHoliday.title}</b> from the holiday list?</span>
							<div className="flex gap-1.5 flex-shrink-0 ml-2">
								<button onClick={handleDeleteConfirm} className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-md">Remove</button>
								<button onClick={() => setIsDeleting(false)} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 text-xs font-medium rounded-md">Cancel</button>
							</div>
						</div>
					) : selectedHoliday ? (
						<p className="text-red-600 mt-0.5 flex items-start gap-1.5">
							<FaRegCalendarCheck className="mt-0.5 flex-shrink-0" />
							<span>
								This is a holiday — <b>{selectedHoliday.title}</b>
								{selectedHoliday.description ? `: ${selectedHoliday.description}` : ""}
							</span>
						</p>
					) : (
						<p className="text-gray-400 mt-0.5">Not a holiday.</p>
					)}
				</div>
			)}

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
