import ProductModal from "../../../components/pages/admin/products/ProductModal";
import ProductTable from "../../../components/pages/admin/products/ProductTable";
import MaxWidth from "../../../wrapper/MaxWidth";

const Products = () => {
     
    return (
        <MaxWidth>
            <ProductTable />
            <ProductModal />

            
        </MaxWidth>
    );
};

export default Products;