import { createBrowserRouter } from "react-router";
import { Layout } from "./layouts/Layout/Layout";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { ProductDetailPage } from "./pages/ProductDetailPage/ProductDetailPage";
import { ProductListPage } from "./pages/ProductListPage/ProductListPage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ProductListPage /> },
      { path: "/product/:id", element: <ProductDetailPage /> },
      { path: "/checkout", element: <CheckoutPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default router;
