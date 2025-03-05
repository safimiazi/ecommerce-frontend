/* eslint-disable @typescript-eslint/no-explicit-any */
import {  Drawer } from 'antd';


const CartDrawer = ({open,  onClose}: any) => {

    return (
        <>
       
        <Drawer title="Basic Drawer" onClose={onClose} open={open}>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
};

export default CartDrawer;