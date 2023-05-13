import { useState } from "react";
import { NavLink } from "react-router-dom";
import swal from "sweetalert";

import "../css/login.css";

import background from "../img/loginbg.svg";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (email == "") {
      swal({
        title: "Oops, Something went wrong",
        text: "Email is empty!",
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
        text: 'Email should end with Exc ".com", ".net" ...',
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

    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    console.log(response.status);
    if (response.ok) {
      console.log("User registered successfully");
    } else {
      console.error("Error registering user");
    }
  };
  return (
    <>
      <img className="clouds" src={background} />
      <div className="signup">
        <h2>Login</h2>
        <h3>It's quick & simple</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <p className="signup-message">
            Don't have an account?
            <NavLink to="../register"> Register</NavLink>
          </p>

          <button type="submit">
            Login
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-arrow-right submitBtn-arrow"></i>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
