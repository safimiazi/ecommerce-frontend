/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { useRef } from "react";
import { Modal, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

const ProductQuickView = ({ isOpen, onClose, product }: any) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const discountPrice = product?.productOfferPrice
    ? product?.productSellingPrice - product?.productOfferPrice
    : null;

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null} centered>
      <div className="flex flex-col border-gray-200 rounded-xl p-4 h-full">
        {/* Image Section */}
        <div className="relative w-full h-60 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            spaceBetween={10}
            slidesPerView={1}
            loop
            navigation
          >
            {product?.productImages?.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
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
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{product?.productName}</h3>
          <p className="text-sm text-gray-600">{product?.productDescription}</p>
          
          {/* SKU and Category */}
          <p className="text-sm text-gray-500">SKU: {product?.skuCode}</p>
          <p className="text-sm text-gray-500">Category: {product?.productCategory?.name}</p>

          {/* Brand */}
          <div className="flex items-center gap-2 mt-2">
            {product?.productBrand?.image && (
              <img
                src={product?.productBrand?.image}
                alt="Brand"
                className="w-6 h-6 rounded-full"
              />
            )}
            <p className="text-sm text-gray-500">{product?.productBrand?.name}</p>
          </div>

          {/* Price Section */}
          <div className="mt-2 flex items-center gap-2">
            {discountPrice ? (
              <>
                <p className="text-lg font-bold text-blue-500">${discountPrice}</p>
                <p className="text-sm line-through text-gray-500">
                  ${product?.productSellingPrice}
                </p>
              </>
            ) : (
              <p className="text-lg font-bold">${product?.productSellingPrice}</p>
            )}
          </div>

          {/* Stock & Purchase Point */}
          <p className="text-sm text-gray-500">Stock: {product?.productStock} {product?.productUnit?.name}</p>
          <p className="text-sm text-gray-500">Purchase Point: {product?.productPurchasePoint}</p>

          {/* Color Options */}
          {product?.variantcolor?.length > 0 && (
            <div className="flex gap-2 mt-2">
              <p className="text-sm text-gray-500">Available Colors:</p>
              {product?.variantcolor?.map((color, index) => (
                <span
                  key={index}
                  className="w-5 h-5 rounded-full border"
                  style={{ backgroundColor: color?.colorCode }}
                ></span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex justify-between items-center">
            <button className="py-2 px-4 rounded border text-blue-500">Wishlist</button>
            <button className="py-2 px-4 rounded bg-blue-500 text-white">Add to Cart</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductQuickView;
