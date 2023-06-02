import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import swal from "sweetalert";

// images
import logo from "../img/logo_transparent2.png";

// css
import "../css/header.css";
import "../css/footer.css";

const Header = ({ getUser, isLoggedIn }) => {
  const user = getUser();
  console.log(user);
  const logout = () => {
    // Clear user-related data
    swal({
      title: "Are you sure?",
      text: "You are about to Log out!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You Logged out successfuly!", {
          icon: "success",
        });
        localStorage.removeItem("token");
        // Navigate to the login page
        window.location.reload();
      }
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const showMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className={`before-header`}></div>
      <header>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className={`menu ${isOpen ? "aktive" : ""}`}>
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
            {!isLoggedIn() ? (
              <NavLink to="/register">Sign Up</NavLink>
            ) : (
              <a onClick={logout}>Log out</a>
            )}
          </li>
          <li className="cart">
            <NavLink to="/cart">
              <i className="fa-solid fa-bag-shopping"></i>
            </NavLink>
            {/* {user !== "admin" ? (
              
            ) : (
              <NavLink to="/dashboard">dashboard</NavLink>
            )} */}
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
