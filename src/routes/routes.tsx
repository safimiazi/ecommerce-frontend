import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Admin from "../Admin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home />, 
            },
            {
                path: "/details",
                element: <ProductDetails />, 
            }
        ]
    },
    {
        path: "/miazi",
        element: <Admin/>,
        children: [
            {
                index: true,
                element: <Home />, 
            },
         
        ]
    },
])

export default router;