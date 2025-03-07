/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer } from "antd";

const CompareDrawer = ({ onClose, open }: any) => {
  return (
    <Drawer
      className="rounded-b-xl shadow-2xl"
      placement={"top"}
      onClose={() => onClose(false)}
      open={open}
    ></Drawer>
  );
};

export default CompareDrawer;
