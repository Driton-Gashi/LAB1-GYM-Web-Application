import { Outlet, NavLink } from "react-router-dom";
// images
import logo from "../img/logo.png";

// css
import "../css/header.css";

const RootLayout = () => {
  return (
    <>
      <div className="before-header"></div>
      <header>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
          <li>
            <a href="#">Training</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
