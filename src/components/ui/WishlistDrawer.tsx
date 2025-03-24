/* eslint-disable @typescript-eslint/no-explicit-any */
import { HeartFilled, DeleteOutlined } from '@ant-design/icons';
import { Drawer, Button, message, Tag, Space, Typography, List, Image, Popconfirm } from 'antd';

const {  Title } = Typography;
import { useGetSinglewishlistDataQuery, useWishlistDeleteMutation } from '../../redux/api/wishlistApi/WishlistApi';

const WishlistDrawer = ({ onClose, open }: any) => {
  const { data: wishlistData, isLoading, error } = useGetSinglewishlistDataQuery({
    id: "60b8d6d5f4b88a001f07b82e", // user id
  });
  
  // Mutation hook for deleting product
  const [wishlistDelete] = useWishlistDeleteMutation();
  
  const handleDeleteProduct = async (productId: string) => {
    try {
      await wishlistDelete({ productId });
      message.success('Product removed from wishlist');
    } catch (err : any) {
      message.error('Failed to remove product');
    }
  };

  // Handle the close event of the drawer
  const handleClose = () => {
    onClose(false);
  };

  return (
    <Drawer
    title={
      <Space>
        <HeartFilled style={{ color: '#ff4d4f' }} />
        <Title level={5} style={{ margin: 0 }}>Your Wishlist</Title>
        {wishlistData?.data?.products && (
          <Tag color="blue">{wishlistData.data.products.length} items</Tag>
        )}
      </Space>
    }      placement="left"
      onClose={handleClose}
      open={open}
      width={350} // Adjust width as necessary
    >
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading wishlist data</div>}
      {wishlistData?.data?.products && wishlistData?.data?.products.length === 0 && (
        <div>No products in your wishlist</div>
      )}

      {/* Render wishlist products */}
      <List
        itemLayout="horizontal"
        dataSource={wishlistData?.data?.products}
        renderItem={(product: any) => (
          <List.Item
            actions={[
              <Popconfirm
                title="Are you sure you want to delete this product?"
                onConfirm={() => handleDeleteProduct(product._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  type="primary"
                  icon={<DeleteOutlined />}
                  danger
                >
                  Remove
                </Button>
              </Popconfirm>
            ]}
          >
            <List.Item.Meta
              avatar={<Image width={50} height={50} src={product.productBrand?.image} />}
              title={product.productName}
              description={`Price: $${product.productSellingPrice}`}
            />
          </List.Item>
        )}
      />
    </Drawer>
  );
};

export default WishlistDrawer;
