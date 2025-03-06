/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import MaxWidth from "../../common/MaxWidth";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef } from "react";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import LeftNavigationButton from "../../ui/LeftNavigationButton";
const products = [
  {
    id: 1,
    name: "Smart Watch",
    price: "$99",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: "$149",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$79",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: "$129",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    name: "4K Monitor",
    price: "$399",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 5,
    name: "4K Monitor",
    price: "$399",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 6,
    name: "4K Monitor",
    price: "$399",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    id: 7,
    name: "4K Monitor",
    price: "$399",
    image:
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function BestSellingSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <MaxWidth>
      <div className="relative">
       <LeftNavigationButton swiperRef={swiperRef}/>
        <RightNavigartionButton swiperRef={swiperRef}/>
       
      <Swiper
        modules={[Navigation, Pagination]}
        onSwiper={(swiper: any) => (swiperRef.current = swiper)}
        spaceBetween={30}
        autoHeight={false}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 5 },
        }}
        loop
        className="rounded-2xl shadow-lg w-full h-full"
      >
        {products.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-gray-100">
              <img
                className="object-cover w-full h-full"
                src={img.image}
                alt={img.name}
              />
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-gray-300 to-gray-900 opacity-75 flex items-center justify-center">
                <p className="text-white text-xs font-medium">{img.price}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </MaxWidth>
  );
}
