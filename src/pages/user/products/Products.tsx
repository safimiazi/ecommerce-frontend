/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";

const Products = () => {
    const { id } = useParams();
    const { data: products } = useGetProductByCategoryQuery({
    isDelete: false,
    id
  });

  return <p>Selected Category ID: {id ? id : "None"}</p>;
};

export default Products;
