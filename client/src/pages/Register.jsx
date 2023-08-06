import { useState } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

import "../css/login.css";
import background from "../img/loginbg.svg";

const Register = () => {
  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_Password] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length > 16) {
      if (name.length === 0) {
        swal({
          title: "Oops, Something went wrong",
          text: "Name is empty!",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return false;
      }
      if (name.length < 3) {
        swal({
          title: "Oops, Something went wrong",
          text: "Name is to short, should be at least 3 characters!",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return false;
      }
    }
    if (name.length > 16) {
      swal({
        title: "Oops, Something went wrong",
        text: "Name is to Long, should  be less than 16 characters!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    if (email.includes(" ")) {
      swal({
        title: "Oops, Something went wrong",
        text: 'Email shouldn\'t contain s spaces " "',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    if (!email.includes("@")) {
      swal({
        title: "Oops, Something went wrong",
        text: '"@" is missing at Email!',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (
      !(
        email.endsWith(".com") || // false
        email.endsWith(".net") || // true
        email.endsWith(".de") ||
        email.endsWith(".org") ||
        email.endsWith(".al")
      )
    ) {
      swal({
        title: "Oops, Something went wrong",
        text: "Email should end with Ex.: .com, .net ...",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (email.includes("ubt-uni.net")) {
      swal({
        title: "Nah bro!",
        text: "Get out of here!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (password.length == "") {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is Empty",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (password.length < 6) {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is to short, should be at least 6 characters!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (confirm_password !== password) {
      swal({
        title: "Oops, Something went wrong",
        text: 'Password should be same as "Confirm Password"!',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {

      const data = await response.json();

      swal({
        title: "Congrats",
        text: "User was registered successfuly!",
        icon: "success",
        timer: 3000,
        button: false,
      });
      const token = data.token;
          localStorage.setItem("token", token);
      setTimeout(() => {
        window.location = "http://localhost:3000/dashboard";
      }, 2000);
    } else if (response.status === 400) {
      const { message } = await response.json();
      swal({
        title: "Oops something went wrong!",
        text: message,
        icon: "error",
      });
    }
  };

  // swal("Here's the title!", "...and here's the text!"); title and text
  // swal({
  //   title: "Congrats!",
  //   text: "You registered successfuly",
  //   icon: "success",
  // timer: 2000
  // });

  return (
    <>
      <img className="clouds" src={background} />
      <div className="signup register-signup register">
        <h2>Register</h2>
        <h3>It&apos;s quick & simple</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              className="name"
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value.toLowerCase())}
            />
            <label>Name</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
          <div className="textbox">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <label>Email</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-envelope"></i>
            </span>
          </div>
          <div className="textbox">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-key"></i>
            </span>
          </div>
          <div className="textbox">
            <input
              type="password"
              value={confirm_password}
              onChange={(e) => setconfirm_Password(e.target.value)}
            />
            <label>Confirm Password</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-lock"></i>
            </span>
          </div>
          <p className="signup-message">
            Signed up already? <NavLink to="/login">Log In</NavLink>
          </p>

          <button type="submit">
            Register
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-arrow-right submitBtn-arrow"></i>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};
export default Register;
