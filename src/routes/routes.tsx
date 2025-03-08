import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/user/home/Home";
import ProductDetails from "../pages/user/ProductDetails/ProductDetails";
import Admin from "../Admin";
import { routeGenerator } from "../utils/routesGenerator";
import { adminPaths } from "./admin.routes";

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
        children: routeGenerator(adminPaths)
    },
])

export default router;