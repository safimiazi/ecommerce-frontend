/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "antd";
import "swiper/css/bundle";
import MaxWidth from "../../wrapper/MaxWidth";

export const Carousel = () => {
  const images = [
    "https://anyasreviews.com/wp-content/uploads/2024/07/freet-pace-best-barefoot-running-shoe.jpg",
    "https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1181472/pexels-photo-1181472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  ];

  return (
    <MaxWidth>
      <div className="-z-20">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          className="rounded-2xl shadow-lg -z-20"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full  max-h-80 flex items-center justify-center bg-gray-100 rounded-2xl overflow-hidden">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover -z-20"
                  preview={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </MaxWidth>
  );
};
