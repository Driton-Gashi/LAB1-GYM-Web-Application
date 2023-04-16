import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
// layouts
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <Footer />
    </>
  );
};

export default App;
