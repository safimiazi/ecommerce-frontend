import Details from "../../components/pages/ProductDetails/Details";
import ProductReviews from "../../components/pages/ProductDetails/ProductReviews";
import SimilarProducts from "../../components/pages/ProductDetails/SimilarProducts";
import MaxWidth from "../../wrapper/MaxWidth";

const ProductDetails = () => {
    return (
        <MaxWidth>
            <div>
                <Details/>
                <ProductReviews/>
                <SimilarProducts/>
            </div>
        </MaxWidth>
    );
};

export default ProductDetails;