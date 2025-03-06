/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import MaxWidth from "../../../wrapper/MaxWidth";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef } from "react";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import LeftNavigationButton from "../../ui/LeftNavigationButton";
import SectionPadding from "../../../wrapper/SectionPadding";
import ProductCard from "../../ui/ProductCart";
// const products = [
//   {
//     id: 1,
//     name: "Smart Watch",
//     price: "$99",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 2,
//     name: "Wireless Headphones",
//     price: "$149",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 3,
//     name: "Gaming Mouse",
//     price: "$79",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 4,
//     name: "Mechanical Keyboard",
//     price: "$129",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 5,
//     name: "4K Monitor",
//     price: "$399",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 5,
//     name: "4K Monitor",
//     price: "$399",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 6,
//     name: "4K Monitor",
//     price: "$399",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
//   {
//     id: 7,
//     name: "4K Monitor",
//     price: "$399",
//     image:
//       "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//   },
// ];

const products = [
    {
      name: "Apple iMac 27\"",
      description: "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
      price: "$1199",
      colors: ["black", "blue", "pink", "green"],
    },
    {
      name: "PlayStation 5 Slim Console",
      description: "Up to 120fps with 120Hz output, 1TB HDD, 2 Controllers, Ray Tracing.",
      price: "$499",
      colors: ["black", "blue", "gray"],
    },
    {
      name: "iPad Pro 13-Inch (M4): XDR Display",
      description: "Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera/12MP.",
      price: "$1199",
      colors: ["black", "pink", "gray"],
    },
    {
      name: "Apple iMac 27\"",
      description: "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
      price: "$1199",
      colors: ["black", "blue", "pink", "green"],
    },
    {
      name: "PlayStation 5 Slim Console",
      description: "Up to 120fps with 120Hz output, 1TB HDD, 2 Controllers, Ray Tracing.",
      price: "$499",
      colors: ["black", "blue", "gray"],
    },
    {
      name: "iPad Pro 13-Inch (M4): XDR Display",
      description: "Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera/12MP.",
      price: "$1199",
      colors: ["black", "pink", "gray"],
    },
    {
      name: "Apple iMac 27\"",
      description: "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
      price: "$1199",
      colors: ["black", "blue", "pink", "green"],
    },
    {
      name: "PlayStation 5 Slim Console",
      description: "Up to 120fps with 120Hz output, 1TB HDD, 2 Controllers, Ray Tracing.",
      price: "$499",
      colors: ["black", "blue", "gray"],
    },
    {
      name: "iPad Pro 13-Inch (M4): XDR Display",
      description: "Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera/12MP.",
      price: "$1199",
      colors: ["black", "pink", "gray"],
    },
    {
      name: "Apple iMac 27\"",
      description: "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
      price: "$1199",
      colors: ["black", "blue", "pink", "green"],
    },
    {
      name: "PlayStation 5 Slim Console",
      description: "Up to 120fps with 120Hz output, 1TB HDD, 2 Controllers, Ray Tracing.",
      price: "$499",
      colors: ["black", "blue", "gray"],
    },
    {
      name: "iPad Pro 13-Inch (M4): XDR Display",
      description: "Ultra Retina XDR Display, 256GB, Landscape 12MP Front Camera/12MP.",
      price: "$1199",
      colors: ["black", "pink", "gray"],
    },
  ];
export default function BestSellingSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <SectionPadding>
      <MaxWidth>
        <div className="relative">
          <LeftNavigationButton swiperRef={swiperRef} />
          <RightNavigartionButton swiperRef={swiperRef} />

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
            className="w-full h-full"
          >
            {products.map((product, index) => (
              <SwiperSlide key={index}>
                      <ProductCard key={index} product={product} />

              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </MaxWidth>
    </SectionPadding>
  );
}
