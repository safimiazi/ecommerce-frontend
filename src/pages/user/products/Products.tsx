/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import ProductCard from "../../../components/ui/ProductCart";
import { Pagination, Spin, Input } from "antd";

const { Search } = Input;

const Products = () => {
  const { id } = useParams();

  // 🔹 State for Pagination & Search
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // 🔹 Fetch Products with Pagination & Search
  const { data: products, isLoading } = useGetProductByCategoryQuery({
    isDelete: false,
    id,
    pageIndex,
    pageSize,
    searchTerm: debouncedSearchTerm,
  });
console.log(debouncedSearchTerm)
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

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="flex justify-center">
        <Search
          placeholder="Search products..."
          allowClear
          enterButton="Search"
          size="large"
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm
          className="w-[50%]"
        />
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
              <ProductCard key={product._id} product={product} />
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
  );
};

export default Products;
