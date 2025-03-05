import React from 'react';
import { Carousel } from '../../components/common/Carousel';

const Home = () => {
    return (
        <div>
            <Carousel/>
            <h1>Welcome to the Home Page</h1>
            <p>This is the default Home Page.</p>
            <p>Feel free to explore the other pages in the navigation menu.</p>
        </div>
    );
};

export default Home;