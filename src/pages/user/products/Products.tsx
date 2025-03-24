/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import ProductCard from "../../../components/ui/ProductCart";
import { Pagination, Spin, Input, Select, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import ProductFilters from "../../../components/ui/ProductFilters";

const { Search } = Input;

const Products = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);

  // 🔹 State for Pagination & Search
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [endDate, setEndDate] = useState();
  const [startDate, setStartDate] = useState();
  const [brand, setBrand] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("lowToHigh"); // Default sorting: Low to High
  const [creationOrder, setCreationOrder] = useState("newest"); // Default sorting: Newest First
  // 🔹 Fetch Products with Pagination & Search
  const { data: products, isLoading } = useGetProductByCategoryQuery({
    isDelete: false,
    id,
    pageIndex,
    pageSize,
    searchTerm: debouncedSearchTerm,
    sortOrder: sortOrder, // Pass sort order
    creationOrder,
    minPrice,
    maxPrice,
    brand,
    startDate,
    endDate,
  });
  // 🔹 Handle Page Change
  const handlePageChange = (page: number, size?: number) => {
    setPageIndex(page);
    if (size) setPageSize(size);
  };

  // 🔹 Debounced Search Handler (Manual Debounce Logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Delay of 500ms after the user stops typing

    return () => {
      clearTimeout(timer); // Clean up the timeout on every render
    };
  }, [searchTerm]); // Trigger when `searchTerm` changes

  // Open & Close Drawer
  const showDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const onFilter = (data: any) => {
    setMinPrice(data.priceRange[0]);
    setMaxPrice(data.priceRange[1]);
    setStartDate(data.dateRange[0]);
    setEndDate(data.dateRange[1]);
    setBrand(data.selectedBrand);
  };

  // Update the state initialization
  const [productCart, setProductCart] = useState<
    Array<{
      product: string;
      quantity: number;
      price: number;
      totalPrice: number;
    }>
  >([]);
console.log("productCart", productCart);
  // Add these helper functions
  const addToCart = (product: any) => {
    setProductCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product === product._id
      );
      if (existingItem) {
        return prevCart.map((item) =>
          item.product === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * item.price,
              }
            : item
        );
      }
      return [
        ...prevCart,
        {
          product: product._id,
          quantity: 1,
          price: product.productSellingPrice,
          totalPrice: product.productSellingPrice,
        },
      ];
    });
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setProductCart((prevCart) =>
      prevCart.map((item) =>
        item.product === productId
          ? {
              ...item,
              quantity: newQuantity,
              totalPrice: newQuantity * item.price,
            }
          : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setProductCart((prevCart) =>
      prevCart.filter((item) => item.product !== productId)
    );
  };
  const demoData = {
    user: "507f191e810c19729de860ec", // Demo user ID, replace with actual user ID
    products: [
      {
        product: "507f191e810c19729de860ea", // Demo product ID, replace with actual product ID
        quantity: 2,
        variant: "507f191e810c19729de860eb", // Demo variant ID, replace with actual variant ID
        price: 29.99,
        totalPrice: 59.98, // price * quantity
      },
    ],
  };

  return (
    <>
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="flex bg-blue-200 rounded flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 px-4 py-6">
          {/* Search Input */}
          <div className="w-full sm:w-1/2">
            <Search
              placeholder="Search products..."
              allowClear
              enterButton="Search"
              size="middle"
              onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
              className="w-full"
            />
          </div>
          <Button type="primary" icon={<FilterOutlined />} onClick={showDrawer}>
            Advance Filters
          </Button>
          {/* Sort Order Select */}
          <div className="w-full sm:w-1/4">
            <Select
              defaultValue={sortOrder}
              onChange={(value) => setSortOrder(value)}
              options={[
                { value: "lowToHigh", label: "Price: Low to High" },
                { value: "HighToLow", label: "Price: High to Low" },
              ]}
              className="w-full"
            />
          </div>

          {/* Creation Order Select */}
          <div className="w-full sm:w-1/4">
            <Select
              defaultValue={creationOrder}
              onChange={(value) => setCreationOrder(value)}
              options={[
                { value: "newest", label: "Newest First" },
                { value: "oldest", label: "Oldest First" },
              ]}
              className="w-full"
            />
          </div>
        </div>

        {/* Loader While Fetching Data */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Spin size="large" />
          </div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {products?.data?.result?.map((product: any) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  productCart={productCart}
                  addToCart={addToCart}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                />
              ))}
            </div>

            {/* Pagination Component */}
            <div className="flex justify-center mt-4">
              <Pagination
                current={pageIndex}
                pageSize={pageSize}
                total={products?.data?.meta?.total || 0}
                showSizeChanger
                onChange={handlePageChange}
              />
            </div>
          </>
        )}
      </div>

      <ProductFilters open={open} onClose={closeDrawer} onFilter={onFilter} />
    </>
  );
};

export default Products;
