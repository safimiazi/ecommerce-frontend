/* eslint-disable @typescript-eslint/no-explicit-any */
import { Drawer } from 'antd';

const WishlistDrawer = ({onClose, open}: any) => {
    return (
        <Drawer
        placement={"left"}
        onClose={()=> onClose(false)}
        open={open}
     
      >

      </Drawer>
    );
};

export default WishlistDrawer;