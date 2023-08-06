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
// import OldDashboard from "./pages/OldDashboard";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import User from "./pages/User";
// layouts
import Header from "./layouts/Header";

const getUser = () => {
  const token = localStorage.getItem("token");
  try {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);
    // Extract the role from the decoded token
    const user = decodedToken.user;

    // Return the role
    return user;
  } catch (error) {
    console.error("I can't get the Token because it doesn't exist");
    return null; // Return null or handle the error as per your requirement
  }
};
const isLoggedIn = () => {
  const token = localStorage.getItem("token");

  if (token) {
    try {
      const decodedToken = jwtDecode(token);

      if (decodedToken.user) {
        return true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  return false;
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Header getUser={getUser} isLoggedIn={isLoggedIn} />}
    >
      <Route
        index
        element={<Home getUser={getUser} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/register"
        element={
          isLoggedIn() ? (
            <Navigate to="/" replace />
          ) : (
            <Register getUser={getUser} isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/login"
        element={
          isLoggedIn() ? (
            <Navigate to="/" replace />
          ) : (
            <Login getUser={getUser} isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/training"
        element={<Training getUser={getUser} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/shop"
        element={<Shop getUser={getUser} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/cart"
        element={<Cart getUser={getUser} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="/dashboard"
        element={getUser() == null ? (<Navigate to="/" replace/>):isLoggedIn()?(<Dashboard getUser={getUser} isLoggedIn={isLoggedIn} />):(<Navigate to="/" replace/>)}>

        <Route
          path="admin"
          element={<Admin getUser={getUser} isLoggedIn={isLoggedIn} />}

        />
        <Route
          path="user"
          element={<User getUser={getUser} isLoggedIn={isLoggedIn} />}

        />
      </Route>
      {/* <Route
        path="/olddashboard"
        element={
          getUser() == null ? (
            <Navigate to="/" replace />
          ) : isLoggedIn() ? (
            <OldDashboard getUser={getUser} isLoggedIn={isLoggedIn} />
          ) : (
            <Navigate to="/" replace />
          )
        }
      /> */}
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
