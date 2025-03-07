/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const CartDrawer = ({ open, onClose }: any) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Radhuni Chicken Masala 100gm",
      price: 75,
      originalPrice: 95,
      discount: 20,
      quantity: 1,
      image:
        "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
    },
    {
      id: 2,
      name: "Radhuni Biryani Masala 40gm",
      price: 60,
      originalPrice: 80,
      discount: 20,
      quantity: 1,
      image:
        "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
    },
    {
      id: 3,
      name: "Teer Fortified Canola Oil 5L",
      price: 898,
      originalPrice: 945,
      discount: 47,
      quantity: 1,
      image:
        "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
    },
    {
      id: 4,
      name: "Teer Fortified Canola Oil 5L",
      price: 898,
      originalPrice: 945,
      discount: 47,
      quantity: 1,
      image:
        "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
    },
    {
      id: 5,
      name: "Teer Fortified Canola Oil 5L",
      price: 898,
      originalPrice: 945,
      discount: 47,
      quantity: 1,
      image:
        "https://walkarfootwear.com/images/thumbnails/435/537/detailed/165/30-2.jpg",
    },
  ]);

  const updateQuantity = (id: any, change: any) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: any) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0);

  return (
    <Drawer
      title={
        <div className="font-bold text-lg">
          🛒 3 items{" "}
          <span className="text-blue-500">You saved ৳{totalDiscount}</span>
        </div>
      }
      onClose={onClose}
      open={open}
      width={400}
      bodyStyle={{ paddingBottom: 100 }}  // Added space for the footer
    >
      <div className="flex flex-col h-full">
        {/* Scrollable section for cart items */}
        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 object-cover"
              />
              <div className="flex-1 px-2">
                <p className="font-medium">{item.name}</p>
                <p className="text-red-500">
                  ৳{item.price}{" "}
                  <span className="line-through text-gray-400">
                    ৳{item.originalPrice}
                  </span>
                </p>
                <p className="text-blue-500 text-sm">৳{item.discount} off</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  icon={<MinusOutlined />}
                  size="small"
                  onClick={() => updateQuantity(item.id, -1)}
                />
                <span className="px-2">{item.quantity}</span>
                <Button
                  icon={<PlusOutlined />}
                  size="small"
                  onClick={() => updateQuantity(item.id, 1)}
                />
                <Button
                  icon={<DeleteOutlined />}
                  size="small"
                  danger
                  onClick={() => removeItem(item.id)}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Fixed footer */}
        <div className=" pt-4 mt-auto">
          <p className="text-xl font-semibold">Total: ৳{total}</p>
          <input
            type="text"
            placeholder="Type your coupon code"
            className="border p-2 w-full mt-2 rounded"
          />
          <button className="w-full py-1 px-2 rounded mt-2 bg-red-500">
            Apply coupon
          </button>
        </div>
        
        <button className="w-full py-1 px-2 rounded bg-blue-500 text-black mt-2">
          Place Order
        </button>
      </div>
    </Drawer>
  );
};

export default CartDrawer;
