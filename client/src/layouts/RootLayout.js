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
            <NavLink>Home</NavLink>
          </li>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Training</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <button className="signup-btn">Sign Up</button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default RootLayout;
