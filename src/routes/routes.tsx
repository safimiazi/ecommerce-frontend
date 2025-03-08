import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/user/home/Home";
import ProductDetails from "../pages/user/ProductDetails/ProductDetails";
import Admin from "../Admin";
import Dashboard from "../pages/admin/dashboard/Dashboard";

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
                element: <Dashboard />, 
            },
         
        ]
    },
])

export default router;