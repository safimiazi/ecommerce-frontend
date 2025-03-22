import { useGetProductByCategoryQuery } from "../../../redux/api/productApi/ProductApi";

const Products = () => {
  const { data: products } = useGetProductByCategoryQuery({
    isDelete: false,
    id: "ddd",
  });

  console.log(products);
  return <div></div>;
};

export default Products;
