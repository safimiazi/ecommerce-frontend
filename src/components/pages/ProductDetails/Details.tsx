/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useRef, useState } from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/react"; // ✅ Import SwiperType correctly
import "swiper/css/bundle";

import LeftNavigationButton from "../../ui/LeftNavigationButton";
import RightNavigartionButton from "../../ui/RightNavigartionButton";
import ImageZoom from "../../ui/ImageZoom";

const Details = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const swiperRef = useRef<SwiperType | null>(null);

  const product = {
    name: "Apple iMac 27",
    description:
      "Apple M3 Octa Core, 23.8inch, RAM 8GB, SSD 256GB, macOS Sonoma",
    price: "$1199",
    colors: ["black", "blue", "pink", "green"],
    image: [
      "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://images.pexels.com/photos/5846133/pexels-photo-5846133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      "https://cdn2.arogga.com/eyJidWNrZXQiOiJhcm9nZ2EiLCJrZXkiOiJQcm9kdWN0LXBfaW1hZ2VzXC83Njc0MVwvNzY3NDEtMTAwLWVzc2VuY2UtZWF1LWRlLXBhcmZ1bS0xMDBtbC1lYXUtZGUtcGFyZnVtLWxhLW11c2UtbWVuLW9yaWdpbmFsLWltYWdoMmV6emg1ZG54OHktbTg0ejllLmpwZWciLCJlZGl0cyI6W119",
    ],
  };

  return (
    <div className="flex gap-4 p-4 items-start justify-center md:flex-row flex-col">
      {/* Product Image Section */}
      <div className="flex-1 flex flex-col gap-4 justify-center items-center  max-w-[500px]">
        {/* Image Zoom */}
        <div className="h-96 cursor-move w-96 border border-gray-200 flex items-center justify-center">
          <ImageZoom image={currentImage ? currentImage : product.image[0]} />
        </div>

        {/* Thumbnail Slider */}
        <div className="relative  w-2/3">
          <LeftNavigationButton swiperRef={swiperRef} />
          <RightNavigartionButton swiperRef={swiperRef} />

          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={3}
          >
            {product.image.map((img, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => setCurrentImage(img)}
                  className=" cursor-pointer h-20 border border-gray-200"
                >
                  <img
                    src={img}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="flex-1 border border-gray-200 rounded p-6">
        <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
        <p className="text-lg text-gray-600 mt-2">{product.description}</p>
        <p className="text-xl font-semibold text-green-600 mt-4">
          {product.price}
        </p>

        {/* Color Options */}
        <div className="mt-4">
          <h3 className="text-gray-700 font-semibold mb-2">Choose a Color:</h3>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <span
                key={index}
                className={`w-8 h-8 rounded-full border-2 border-gray-300 cursor-pointer transition hover:border-blue-500`}
                style={{ backgroundColor: color }}
              ></span>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Details;
