import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home />, // Home component Outlet e render hobe
            },
            {
                path: "/details",
                element: <ProductDetails />, // Home component Outlet e render hobe
            }
        ]
    },
])

export default router;