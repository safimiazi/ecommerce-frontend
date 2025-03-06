/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import {
  ArrowLeft,
  ArrowRight,
  Heart,
  ShoppingCart,
  Eye,
  Scale,
} from "lucide-react";
import truncateText from "../../utils/truncateText";
import { Tooltip, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { useRef, useState } from "react";
import ProductQuickView from "./ProductQuickView";

const ProductCard = ({ product }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
  <div>
      <div className="border hover:shadow transition-shadow duration-300 group flex flex-col border-gray-200 rounded-xl p-4 h-full">
      {/* Image Section with Hover Effects */}
      <div className="relative w-full h-40 rounded-2xl flex items-center justify-center mb-4 overflow-hidden group">
        <Swiper
          modules={[Navigation, Pagination]}
          onSwiper={(swiper: any) => (swiperRef.current = swiper)}
          spaceBetween={10}
          slidesPerView={1}
          loop
        >
          {product.image.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="w-full h-full flex items-center justify-center bg-gray-100 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  preview={false}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Compare & Quick View Icons */}
        <div className="absolute z-50 bottom-2 left-1/2 transform -translate-x-1/2 translate-y-4 flex gap-4 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          <Tooltip title="Quick View">
            <div onClick={() => setModalOpen(true)} className="p-2 rounded-full  bg-blue-500 cursor-pointer">
              <Eye className="text-white" size={15} />
            </div>
          </Tooltip>
          <Tooltip title="Compare">
            <div className="p-2 rounded-full  bg-blue-500 cursor-pointer">
              <Scale className="text-white" size={15} />
            </div>
          </Tooltip>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mb-2 w-full relative flex justify-center items-center gap-5">
        <div
          onClick={() => swiperRef.current?.slidePrev()}
          className="z-50 cursor-pointer transition"
        >
          <ArrowLeft className="text-gray-500" />
        </div>
        <div
          onClick={() => swiperRef.current?.slideNext()}
          className="z-50 cursor-pointer transition"
        >
          <ArrowRight className="text-gray-500" />
        </div>
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">
          {truncateText(product.name, 20)}
        </h3>
        <p className="text-sm text-gray-600">
          {truncateText(product.description, 50)}
        </p>
        <p className="text-lg font-bold mt-2">{product.price}</p>

        {/* Color Options */}
        <div className="flex gap-2 mt-2">
          {product.colors.map((color: string, index: number) => (
            <span
              key={index}
              className="w-5 h-5 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex justify-between items-center pt-4">
          <Tooltip title="Wishlist">
            <Heart
              className="text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </Tooltip>
          <Tooltip title="Add to Cart">
            <ShoppingCart
              className="text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </Tooltip>
        </div>
      </div>
    </div>
    <ProductQuickView isOpen={modalOpen} onClose={() => setModalOpen(false)} product={product} />

  </div>
  );
};

export default ProductCard;
