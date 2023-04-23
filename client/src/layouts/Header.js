import { Outlet, NavLink } from "react-router-dom";
// images
import logo from "../img/logo.png";

// css
import "../css/header.css";
import "../css/footer.css";
const Header = () => {
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
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/training">Training</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </ul>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <div className="footer-section">
          <img className="footer-logo" src={logo} alt="" />
        </div>
        <ul className="footer-section">
          <li>
            <h3>Lorem, ipsum.</h3>
          </li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
        </ul>
        <ul className="footer-section">
          <li>
            <h3>Lorem, ipsum.</h3>
          </li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
        </ul>
        <ul className="footer-section">
          <li>
            <h3>Quick Links</h3>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/training">Training</NavLink>
          </li>
          <li>
            <NavLink to="/shop">Shop</NavLink>
          </li>
        </ul>
      </footer>
      <div className="after-footer">
        <span className="color-blue">LMAO</span> copyright © all rights reserved
      </div>
    </>
  );
};

export default Header;
