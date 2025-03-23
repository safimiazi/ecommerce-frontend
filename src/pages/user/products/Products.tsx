/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import ProductCard from "../../../components/ui/ProductCart";

const Products = () => {
  const { id } = useParams();
  const { data: products } = useGetProductByCategoryQuery({
    isDelete: false,
    id,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {products?.data?.result?.map((product: any, index: any) => (
        <div key={index}>
          <ProductCard key={index} product={product} />
        </div>
      ))}
    </div>
  );
};

export default Products;
