/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight } from "lucide-react";

const RightNavigartionButton = ({ swiperRef }: any) => {
  return (
    <div
      onClick={() => swiperRef.current?.slideNext()}
      className="p-2 border border-gray-200  bg-white  z-50  absolute -right-4  top-1/2   transform -translate-y-1/2 rounded-full transition"
    >
      <ArrowRight className="text-blue-500" />
    </div>
  );
};

export default RightNavigartionButton;
