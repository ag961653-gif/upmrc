import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

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
		<div
			className="relative h-96 w-10/12 overflow-hidden"
			style={{
				backgroundImage:
					"url('https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800')",
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			<div className="absolute inset-0 bg-white/30"></div>

			<div className="relative flex flex-col items-center pt-8">
				<div className="text-5xl">🎂</div>

				<h2
					className="text-[#7E170D] text-5xl mt-3 font-bold"
					style={{ fontFamily: "Georgia" }}
				>
					Happy Birthday
				</h2>

				<div className="w-48 h-48 rounded-full border-[5px] border-cyan-700 bg-white/70 mt-8 flex items-center justify-center">
					<span className="text-6xl font-bold text-cyan-800">{person.name?.[0]}</span>
				</div>

				<h3 className="mt-5 text-4xl text-gray-700" style={{ fontFamily: "Georgia" }}>
					{person.name}
				</h3>

				<p className="text-2xl mt-2">{person.role}</p>

				<p className="text-3xl mt-4">
					{new Date(person.dateOfBirth).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}
				</p>
			</div>
		</div>
	);
}

export default BirthdayCarousel;
