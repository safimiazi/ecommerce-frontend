/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import MaxWidth from "../../../wrapper/MaxWidth";
import { 
  Image, 
  Input, 
  Card, 
  Button, 
  Radio, 
  Space, 
  Divider, 
  Typography, 
  Row, 
  Col,
  Spin,
  message 
} from "antd";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { ArrowLeft, ArrowRight, Delete, Minus, Plus } from "lucide-react";
import { useRef } from "react";
import {
  useCartDeleteMutation,
  useCartPostMutation,
  useCartRemoveMutation,
  useGetSinglecartDataQuery,
} from "../../../redux/api/cartApi/CartApi";
import Swal from "sweetalert2";
import truncateText from "../../../utils/truncateText";

const { Title, Text } = Typography;

const CheckOut = () => {
  const { data: userCartData, isLoading } = useGetSinglecartDataQuery(null);
  const cartProducts = userCartData?.data?.products || [];
  const [cartPost, { isLoading: posting }] = useCartPostMutation();
  const [cartRemove, { isLoading: removing }] = useCartRemoveMutation();
  const [cartDelete] = useCartDeleteMutation();
console.log("removing", removing)
  const swiperRefs = useRef([]);
  
  const handleDeleteProduct = async (productId) => {
    try {
      await cartDelete({ id: productId }).unwrap();
      message.success('Product removed from cart');
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
        message.success('Added to cart');
      } else if (status === "removeToCart") {
        await cartRemove({
          product: product?._id,
        }).unwrap();
        message.success('Removed from cart');
      }
    } catch (error) {
      console.error("Failed to add to cart", error);
      Swal.fire("Warning!", `${error?.data?.message}`, "warning");
    }
  };

  if (isLoading) {
    return (
      <MaxWidth>
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      </MaxWidth>
    );
  }

  return (
    <MaxWidth>
      <div className="p-6">
        <Title level={2} className="mb-6">Checkout</Title>
        
        <Row gutter={24}>
          {/* Order Summary */}
          <Col xs={24} lg={10}>
            <Card 
              title="Order Summary" 
              bordered={false}
              headStyle={{ border: 'none' }}
              className="mb-6"
            >
              {cartProducts.length === 0 ? (
                <div className="text-center py-8">
                  <Text type="secondary">Your cart is empty</Text>
                </div>
              ) : (
                <Space direction="vertical" size="middle" className="w-full">
                  {cartProducts.map((cartItem, inx) => {
                    const product = cartItem.product;
                    if (!swiperRefs.current[inx]) {
                      swiperRefs.current[inx] = null;
                    }
                    return (
                      <Card 
                        key={inx}
                        hoverable
                        className="relative"
                        bodyStyle={{ padding: 12 }}
                      >
                        <div className="flex">
                          {/* Image Section */}
                          <div className="flex flex-col items-center mr-4">
                            <div className="relative w-20 h-20 rounded-lg overflow-hidden">
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
                            <div className="mt-2 flex justify-center items-center gap-2">
                              <Button 
                                size="small" 
                                icon={<ArrowLeft size={14} />} 
                                onClick={() => swiperRefs.current[inx]?.slidePrev()}
                              />
                              <Button 
                                size="small" 
                                icon={<ArrowRight size={14} />} 
                                onClick={() => swiperRefs.current[inx]?.slideNext()}
                              />
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="flex-grow">
                            <Text strong className="block mb-1">
                              {truncateText(product?.productName, 30)}
                            </Text>
                            <Text type="secondary" className="block mb-2 text-xs">
                              {product?.skuCode}
                            </Text>
                            
                            <Text strong className="block mb-2">
                              ${cartItem?.totalPrice}
                            </Text>

                            <Space>
                              <Button 
                                size="small" 
                                icon={<Minus size={15} />} 
                                onClick={() => handleAddToCart("removeToCart", product)}
                                loading={removing}
                              />
                              <Text>{cartItem?.quantity || 0}</Text>
                              <Button 
                                size="small" 
                                icon={<Plus size={15} />} 
                                onClick={() => handleAddToCart("addToCart", product)}
                                loading={posting}
                              />
                            </Space>
                          </div>
                        </div>
                        
                        <Button 
                          danger
                          type="text" 
                          icon={<Delete size={18} />} 
                          onClick={() => handleDeleteProduct(product._id)}
                          className="absolute top-2 right-2"
                        />
                      </Card>
                    );
                  })}
                </Space>
              )}
            </Card>
          </Col>

          {/* Right Column */}
          <Col xs={24} lg={14}>
            <Row gutter={[24, 24]}>
              {/* Discount Section */}
              <Col span={24}>
                <Card title="Discount Options" bordered={false}>
                  <Radio.Group defaultValue="coupon" className="w-full mb-4">
                    <Space direction="vertical" className="w-full">
                      <Radio value="coupon">Apply Coupon</Radio>
                      <Input placeholder="Enter Coupon Code" />
                      
                      <Radio value="giftcard">Apply Gift Card</Radio>
                      <Input placeholder="Enter Gift Card Code" />
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>

              {/* Delivery Section */}
              <Col span={24}>
                <Card title="Delivery Options" bordered={false}>
                  <Radio.Group defaultValue="standard" className="w-full">
                    <Space direction="vertical" className="w-full">
                      <Radio value="standard">Standard Delivery (3-5 business days)</Radio>
                      <Radio value="express">Express Delivery (1-2 business days)</Radio>
                    </Space>
                  </Radio.Group>
                </Card>
              </Col>

              {/* Payment Section */}
              <Col span={24}>
                <Card title="Payment Details" bordered={false}>
                  <Space direction="vertical" className="w-full">
                    <div className="flex justify-between">
                      <Text>Subtotal</Text>
                      <Text>${cartProducts.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}</Text>
                    </div>
                    <div className="flex justify-between">
                      <Text>Shipping</Text>
                      <Text>$20.00</Text>
                    </div>
                    <Divider className="my-2" />
                    <div className="flex justify-between">
                      <Text strong>Total</Text>
                      <Text strong>${(cartProducts.reduce((sum, item) => sum + item.totalPrice, 0) + 20).toFixed(2)}</Text>
                    </div>
                  </Space>
                </Card>
              </Col>

              {/* Customer Information */}
              <Col span={24}>
                <Card title="Customer Information" bordered={false}>
                  <Space direction="vertical" className="w-full" size="middle">
                    <Input placeholder="Full Name" />
                    <Input placeholder="Email" />
                    <Input placeholder="Phone Number" />
                    <Input.TextArea placeholder="Shipping Address" rows={3} />
                    
                    <Divider orientation="left">Payment Method</Divider>
                    
                    <Radio.Group defaultValue="cod" className="w-full">
                      <Space direction="vertical" className="w-full">
                        <Radio value="cod">Cash on Delivery</Radio>
                        <Radio value="card">Credit/Debit Card</Radio>
                        <Radio value="mobile">Mobile Payment</Radio>
                      </Space>
                    </Radio.Group>
                  </Space>
                </Card>
              </Col>

              {/* Proceed to Payment */}
              <Col span={24}>
                <Button 
                  type="primary" 
                  size="large" 
                  block
                  className="h-12 bg-orange-500 hover:bg-orange-600"
                >
                  Proceed to Payment
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </MaxWidth>
  );
};

export default CheckOut;