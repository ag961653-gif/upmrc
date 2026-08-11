import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaBirthdayCake } from "react-icons/fa";

import "swiper/css";

import SectionHeader from "./SectionHeader";
import { getTodaysBirthdays } from "../../services/employeeService";

const BirthdayCarousel = () => {
	const [birthdays, setBirthdays] = useState([]);

	useEffect(() => {
		getTodaysBirthdays()
			.then(setBirthdays)
			.catch(() => setBirthdays([]));
	}, []);

	if (birthdays.length === 0) return null;

	return (
		<div className="mt-3">
			<SectionHeader title="Today's Birthdays" />

			<Swiper
				modules={[Autoplay]}
				slidesPerView={1}
				loop
				autoplay={{
					delay: 3500,
				}}
				className="mt-3"
			>
				{birthdays.map((person) => (
					<SwiperSlide key={person._id}>
						<BirthdayCard person={person} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

function BirthdayCard({ person }) {
	return (
		<div className="relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-cyan-600 to-teal-700 px-4 py-5 text-center text-white shadow-md">
			<div className="text-3xl flex justify-center"><FaBirthdayCake /></div>

			<h2 className="mt-1 text-lg font-bold tracking-wide" style={{ fontFamily: "Georgia" }}>
				Happy Birthday
			</h2>

			<div className="mx-auto mt-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/70 bg-white/15">
				<span className="text-2xl font-bold">{person.name?.[0]}</span>
			</div>

			<h3 className="mt-3 truncate text-base font-semibold" title={person.name}>
				{person.name}
			</h3>

			<p className="text-sm text-white/80">{person.role}</p>

			<p className="mt-1 text-xs text-white/70">
				{new Date(person.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
			</p>
		</div>
	);
}

export default BirthdayCarousel;
