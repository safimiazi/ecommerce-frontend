/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer, Button } from "antd";
import { MinusOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetSinglecartDataQuery } from "../../redux/api/cartApi/CartApi";
import { useState, useEffect } from "react";

const CartDrawer = ({ open, onClose }: any) => {
    const { data: userCartData } = useGetSinglecartDataQuery();
    const [cartItems, setCartItems] = useState<any[]>([]);

    useEffect(() => {
        if (userCartData?.data?.products) {
            setCartItems(userCartData.data.products.map((item: any) => ({
                id: item.product._id,
                name: item.product.productName,
                image: item.product.productFeatureImage,
                price: item.price,
                originalPrice: item.product.productSellingPrice,
                discount: item.product.productOfferPrice,
                quantity: item.quantity
            })));
        }
    }, [userCartData]);

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

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0);

    return (
        <Drawer
            title={
                <div className="font-bold text-lg">
                    🛒 {cartItems.length} items {" "}
                    <span className="text-blue-500">You saved ৳{totalDiscount}</span>
                </div>
            }
            onClose={onClose}
            open={open}
            width={400}
            bodyStyle={{ paddingBottom: 100 }}
        >
            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center justify-between border-b pb-2">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover" />
                            <div className="flex-1 px-2">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-red-500">
                                    ৳{item.price} {" "}
                                    <span className="line-through text-gray-400">৳{item.originalPrice}</span>
                                </p>
                                <p className="text-blue-500 text-sm">৳{item.discount} off</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button icon={<MinusOutlined />} size="small" onClick={() => updateQuantity(item.id, -1)} />
                                <span className="px-2">{item.quantity}</span>
                                <Button icon={<PlusOutlined />} size="small" onClick={() => updateQuantity(item.id, 1)} />
                                <Button icon={<DeleteOutlined />} size="small" danger onClick={() => removeItem(item.id)} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="pt-4 mt-auto">
                    <p className="text-xl font-semibold">Total: ৳{total}</p>
                    <input type="text" placeholder="Type your coupon code" className="border p-2 w-full mt-2 rounded" />
                    <button className="w-full py-1 px-2 rounded mt-2 bg-red-500">Apply coupon</button>
                </div>
                <button className="w-full py-1 px-2 rounded bg-blue-500 text-black mt-2">Place Order</button>
            </div>
        </Drawer>
    );
};

export default CartDrawer;
