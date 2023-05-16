import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Training from "./pages/Training";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Dashboard from "./pages/Dashboard";
// layouts
import Header from "./layouts/Header";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/training" element={<Training />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
