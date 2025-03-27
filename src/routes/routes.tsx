import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/user/home/Home";
import ProductDetails from "../pages/user/ProductDetails/ProductDetails";
import Admin from "../Admin";
import { routeGenerator } from "../utils/routesGenerator";
import LoginRegistration from "../pages/auth/LoginRegistration";
import { adminPaths } from "./admin.routes";
import Products from "../pages/user/products/Products";
import CheckOut from "../pages/user/checkout/CheckOut";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/products/:id",
        element: <Products />,
      },
      {
        path: "/details/:id",
        element: <ProductDetails />,
      },
      {
        path: "/cart/checkout",
        element: <CheckOut/>,
      }
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: routeGenerator(adminPaths),
  },
  {
    path: "/auth",
    element: <LoginRegistration />,
  },
]);

export default router;
