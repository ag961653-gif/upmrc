import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "./HeroSlider.css";

import { getHighlights } from "../../services/highlightService";

const HeroSlider = () => {
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHighlights()
      .then(setHighlights)
      .catch(() => setHighlights([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && highlights.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-3">
        <div className="w-full h-[285px] rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 text-sm">
          No highlights added yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-3">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop
        autoplay={{
          delay: 4000,
        }}
        className="hero-swiper rounded-lg"
      >
        {highlights.map((item) => (
          <SwiperSlide key={item._id}>
            <img
              src={item.image}
              alt={item.title || "Highlight"}
              className="w-full h-[285px] object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
