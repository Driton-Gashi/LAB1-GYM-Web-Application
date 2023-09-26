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
import Admin from "./components/dashboard/Admin";
import User from "./components/dashboard/User";
import Publisher from "./components/dashboard/Publisher";
import GymTrainer from "./components/dashboard/GymTrainer";
import YogaTrainer from "./components/dashboard/YogaTrainer";
import Crud1 from "./components/dashboard/Crud1";
import Crud2 from "./components/dashboard/Crud2";
// import General from "./components/dashboard/General";
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
        element={
          getUser() == null ? (
            <Navigate to="/" replace />
          ): (
            <Cart getUser={getUser} isLoggedIn={isLoggedIn} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          getUser() == null ? (
            <Navigate to="/" replace />
          ) : isLoggedIn() ? (
            <Dashboard getUser={getUser} isLoggedIn={isLoggedIn}/>
          ) : (
            <Navigate to="/" replace />
          )
        }
      >
        <Route
          path="/dashboard"
          element={ getUser() == null? <Navigate to="/"/> : <Navigate to={`/dashboard/${getUser().role}`}/>}
        />
        <Route
          path="/dashboard/admin"
          element={ getUser() == null? <Navigate to="/"/> :getUser().role != "admin"?<Navigate to={`/dashboard/${getUser().role}`}/>:<Admin getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard/user"
          element={<User getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard/publisher"
          element={<Publisher getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
         <Route
          path="/dashboard/gymtrainer"
          element={<GymTrainer getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard/yogatrainer"
          element={<YogaTrainer getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
        <Route
          path="/dashboard/crud1"
          element={<Crud1 getUser={getUser} isLoggedIn={isLoggedIn} />}
        />
         <Route
          path="/dashboard/crud2"
          element={<Crud2 getUser={getUser} isLoggedIn={isLoggedIn} />}
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
