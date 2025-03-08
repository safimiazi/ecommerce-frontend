import { Carousel } from '../../../components/common/Carousel';
import BestSellingSection from '../../../components/pages/Home/BestSellingSection';
import OfferProductsSection from '../../../components/pages/Home/OfferProducts';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <BestSellingSection/>
            <OfferProductsSection/>
        </div>
    );
};

export default Home;