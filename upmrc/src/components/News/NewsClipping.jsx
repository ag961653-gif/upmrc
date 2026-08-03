import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { HiNewspaper } from "react-icons/hi2";

import "swiper/css";
import "swiper/css/pagination";

import { newsData } from "./newsData";

const NewsClipping = () => {
	return (
		<div className=" max-h-[285px] overflow-hidden rounded-xl bg-white shadow-md">
			{/* Header */}
			<div className="flex items-center gap-3 bg-[#1565C0] px-5 py-4 text-white">
				<HiNewspaper className="text-3xl" />
				<h2 className="text-xl font-semibold">News Clipping</h2>
			</div>

			{/* Slider */}
			<Swiper
				modules={[Autoplay, Pagination]}
				slidesPerView={1}
				loop={true}
				speed={800}
				autoplay={{
					delay: 3500,
					disableOnInteraction: false,
				}}
				pagination={{
					clickable: true,
				}}
			>
				{newsData.map((item) => (
					<SwiperSlide key={item.id}>
						<div className="p-3">
							<img
								src={item.image}
								alt="News Clipping"
								className="w-full aspect-square object-contain rounded-lg bg-white"
							/>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default NewsClipping;
