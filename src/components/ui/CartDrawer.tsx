/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { HeartFilled } from "@ant-design/icons";
import { Drawer, Tag, Space, Typography, Image } from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import { ArrowLeft, ArrowRight, Delete, Minus, Plus } from "lucide-react";
import truncateText from "../../utils/truncateText";
import { useRef } from "react";

const { Title } = Typography;
import {
  useCartDeleteMutation,
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../redux/api/cartApi/CartApi";
import Swal from "sweetalert2";

const CartDrawer = ({ open, onClose }) => {
  const { data: userCartData } = useGetSinglecartDataQuery(null);
  const cartProducts = userCartData?.data?.products || [];
  const [cartPost] = useCartPostMutation();
  const [cartRemove] = useCartRemoveMutation();
  const [cartDelete] = useCartDeleteMutation();
  const swiperRefs = useRef([]);
  const handleClose = () => {
    onClose(false);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await cartDelete({ id: productId }).unwrap();
    } catch (error) {
      console.error("Failed to remove product", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };

  const handleAddToCart = async (status: any, product) => {
    try {
      if (status === "addToCart") {
        await cartPost({
          product: product?._id,
          quantity: 1,
          price: product?.productSellingPrice,
        }).unwrap();
      } else if (status === "removeToCart") {
        await cartRemove({
          product: product?._id,
        }).unwrap();
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };
  return (
    <Drawer
      title={
        <Space>
          <HeartFilled style={{ color: "#ff4d4f" }} />
          <Title level={5} style={{ margin: 0 }}>
            Your Cart
          </Title>
          {cartProducts.length > 0 && (
            <Tag color="blue">{cartProducts.length} items</Tag>
          )}
        </Space>
      }
      placement="right"
      onClose={handleClose}
      open={open}
      width={350}
    >
      {cartProducts.length === 0 && <div>No products in your cart</div>}

      <div className="grid grid-cols-1 gap-4">
        {cartProducts.map((cartItem, inx) => {
          const product = cartItem.product;
          if (!swiperRefs.current[inx]) {
            swiperRefs.current[inx] = null;
          }
          return (
            <div
              key={inx}
              className="border hover:shadow transition-shadow duration-300 group flex border-gray-200 rounded-xl p-2 h-full bg-white relative"
            >
              {/* Image Section - Left Side */}
              <div className="flex flex-col items-center mr-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    onSwiper={(swiper) => (swiperRefs.current[inx] = swiper)}
                    spaceBetween={10}
                    slidesPerView={1}
                    loop
                  >
                    {product?.productFeatureImage && (
                      <SwiperSlide>
                        <Image
                          src={product.productFeatureImage}
                          alt="Feature Image"
                          className="w-full h-full object-cover"
                          preview={false}
                        />
                      </SwiperSlide>
                    )}
                    {product?.productImages?.map((img, index) => (
                      <SwiperSlide key={index}>
                        <Image
                          src={img}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-full object-cover"
                          preview={false}
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Navigation Buttons */}
                <div className="mt-1 flex justify-center items-center gap-2">
                  <button
                    onClick={() => swiperRefs.current[inx]?.slidePrev()}
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                  >
                    <ArrowLeft size={14} className="text-gray-500" />
                  </button>
                  <button
                    onClick={() => swiperRefs.current[inx]?.slideNext()}
                    className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                  >
                    <ArrowRight size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Product Info - Right Side */}
              <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-semibold mb-1">
                  {truncateText(product?.productName, 20)}
                </h3>
                <p className="text-xs text-gray-600 mb-1">{product?.skuCode}</p>
                {/* Price Section */}
                <div>
                  <p className="text-sm font-bold">${cartItem?.totalPrice}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddToCart("removeToCart", product)}
                    className="px-1 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    <Minus size={15} />
                  </button>
                  <div>{cartItem?.quantity || 0}</div>
                  <button
                    onClick={() => handleAddToCart("addToCart", product)}
                    className="px-2 py-1 bg-gray-200 rounded cursor-pointer"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>
              {/* Delete Button */}
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="absolute top-2 right-2 cursor-pointer text-red-500"
              >
                <Delete size={25} />
              </button>
            </div>
          );
        })}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
