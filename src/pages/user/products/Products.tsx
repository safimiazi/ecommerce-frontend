/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";
import { useSelector } from "react-redux";

const Products = () => {
  const categoryId = useSelector((state: any) => state.category.categoryId);
console.log(categoryId)
  const { data: products } = useGetProductByCategoryQuery({
    isDelete: false,
    id: "67dba9111dd28e85dab34dea",
  });

  return <p>Selected Category ID: {categoryId ? categoryId : "None"}</p>;
};

export default Products;
