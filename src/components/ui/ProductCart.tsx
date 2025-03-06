/* eslint-disable @typescript-eslint/no-explicit-any */

import { Heart, ShoppingCart } from "lucide-react";
import truncateText from "../../utils/truncateText";
import { Tooltip } from "antd";

const ProductCard = ({ product }: any) => {
  return (
    <div className="border flex flex-col border-gray-200  h-full rounded-xl p-4 ">
      <div className="h-40 bg-gray-200 flex items-center justify-center mb-4">
        <span className="text-gray-500">Image Placeholder</span>
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600 flex-1">
        {truncateText(product.description, 50)}
      </p>
      <p className="text-lg font-bold mt-2">{product.price}</p>
      <div className="flex gap-2 mt-2">
        {product.colors.map((color: string, index: number) => (
          <span
            key={index}
            className={`w-5 h-5 rounded-full bg-${color}-500`}
          ></span>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          <Tooltip title="Wishlist">
            <Heart
              className=" text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </Tooltip>
        </div>
        <div>
          <Tooltip title="Add to Cart">
            <ShoppingCart
              className=" text-blue-500 transition duration-300 cursor-pointer"
              size={24}
            />
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
