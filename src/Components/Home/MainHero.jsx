import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Import your images from your assets folder
import HeroBg1 from "../../assets/hero-1.png";
import HeroBg2 from "../../assets/hero-2.png";
import HeroBg3 from "../../assets/hero-3.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const MainHero = () => {
  const slides = [
    {
      title: "Start learning something new today",
      desc: "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
      btnText: "Browse Courses",
      image: HeroBg1,
    },
    {
      title: "Pick up where you left off",
      desc: "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
      btnText: "Start Learning",
      image: HeroBg2,
    },
    {
      title: "Learn together, grow faster",
      desc: "Join our community of students and experts. Collaborative learning helps you master new skills 2x faster than learning alone.",
      btnText: "Learn More",
      image: HeroBg3,
    },
  ];

  return (
    <div className="relative w-full mb-20 group">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        loop={true}
        speed={800}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
        className="rounded-[40px] overflow-hidden shadow-2xl shadow-indigo-100/50"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {/* Background Image Container */}
            <div
              className="relative w-full h-112.5 bg-no-repeat bg-cover bg-center flex items-center px-16 text-white"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Subtle Overlay to make text pop */}
              <div className="absolute inset-0 bg-black/20 z-0" />

              {/* Content */}
              <div className="relative z-10 max-w-2xl">
                <h2 className="text-5xl font-bold mb-4 leading-tight drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-lg text-gray-100 mb-8 max-w-xl opacity-95 leading-relaxed drop-shadow-sm">
                  {slide.desc}
                </p>
                <button className="bg-[#534FFF] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-indigo-600 hover:scale-105 transition-all shadow-lg">
                  {slide.btnText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Arrows */}
        <div className="absolute right-12 bottom-12 z-20 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="hero-prev w-12 h-12 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/20 backdrop-blur-sm transition-all text-white">
            <ChevronLeft size={24} />
          </button>
          <button className="hero-next w-12 h-12 border border-white/40 rounded-full flex items-center justify-center hover:bg-white/20 backdrop-blur-sm transition-all text-white">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Pagination Bars */}
        <div className="custom-pagination absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3"></div>
      </Swiper>

      {/* Updated Styles for React/Vite compatibility */}
      <style>{`
        .hero-swiper .custom-pagination .swiper-pagination-bullet {
          width: 45px !important;
          height: 6px !important;
          border-radius: 10px !important;
          background: rgba(255, 255, 255, 0.4) !important;
          opacity: 1 !important;
          transition: all 0.4s ease;
          margin: 0 6px !important;
        }
        .hero-swiper .custom-pagination .swiper-pagination-bullet-active {
          background: white !important;
          width: 70px !important;
        }
      `}</style>
    </div>
  );
};

export default MainHero;
