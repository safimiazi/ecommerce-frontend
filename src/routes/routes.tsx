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
import PaymentSuccess from "../pages/user/checkout/PaymentSuccess";
import PaymentFail from "../pages/user/checkout/PaymentFail";

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
        path: "/payment/success/:tran_id",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment/fail/:tran_id",
        element: <PaymentFail />,
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
