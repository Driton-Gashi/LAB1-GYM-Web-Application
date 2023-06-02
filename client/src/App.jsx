import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

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
const getUserRoleFromJWT = () => {
  const token = localStorage.getItem("token");

  try {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);
    console.log(decodedToken.user.role);
    // Extract the role from the decoded token
    const role = decodedToken.user.role;

    // Return the role
    return role;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null; // Return null or handle the error as per your requirement
  }
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />}>
      <Route index element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/training" element={<Training />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/dashboard"
        element={
          // Authorization check for Dashboard route
          getUserRoleFromJWT() === "admin" ? (
            <Dashboard />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
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
