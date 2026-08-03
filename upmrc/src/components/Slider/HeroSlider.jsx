import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { sliderData } from "./sliderData";

const HeroSlider = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-3">

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{
          delay: 4000,
        }}
        className="rounded-lg overflow-hidden"
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[285px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
};

export default HeroSlider;