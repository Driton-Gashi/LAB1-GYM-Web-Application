import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";

// images
import logo from "../img/logo_transparent2.png";

// css
import "../css/header.css";
import "../css/footer.css";

const Header = () => {
  const showMenu = () => {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("aktive");
  };

  return (
    <>
      <div className="before-header"></div>
      <header>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menu">
          <div onClick={showMenu} className="close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <li>
            <NavLink to="/">Home</NavLink>
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
          <li className="cart">
            <NavLink to="/cart">
              <i className="fa-solid fa-bag-shopping"></i>
            </NavLink>
          </li>
        </ul>
        <div onClick={showMenu} className="burger">
          <i className="fa-solid fa-bars"></i>
        </div>
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
