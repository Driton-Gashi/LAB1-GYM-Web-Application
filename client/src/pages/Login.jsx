import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import swal from "sweetalert";

import "../css/login.css";

import background from "../img/loginbg.svg";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (email === "") {
      swal({
        title: "Oops, Something went wrong",
        text: "Email is empty!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (email.includes(" ")) {
      swal({
        title: "Oops, Something went wrong",
        text: 'Email shouldn\'t contain spaces " "',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (!email.includes("@")) {
      swal({
        title: "Oops, Something went wrong",
        text: '"@" is missing in the email!',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (
      !(
        email.endsWith(".com") ||
        email.endsWith(".net") ||
        email.endsWith(".de") ||
        email.endsWith(".org") ||
        email.endsWith(".al")
      )
    ) {
      swal({
        title: "Oops, Something went wrong",
        text: 'Email should end with ".com", ".net", ...',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (email.includes("ubt-uni.net")) {
      swal({
        title: "Nah bro!",
        text: "Get out of here!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (password === "") {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is Empty",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    if (password.length < 6) {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is too short, should be at least 6 characters!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.token) {
          const token = data.token;
          localStorage.setItem("token", token);
          // Redirect to the dashboard or perform any other action
          navigate("/dashboard");
        } else {
          console.error("Token not found in response data");
          swal({
            title: "Oops, Something went wrong",
            text: "Error logging in",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
      } else {
        swal({
          title: "Oops, Something went wrong",
          text: "Error logging",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
    } catch (error) {
      console.error("Error logging in", error);
      swal({
        title: "Oops, Something went wrong",
        text: "Error logging in " + error.message,
        icon: "error",
        timer: 3000,
        button: false,
      });
    }
  };

  return (
    <>
      <img className="clouds" src={background} />
      <div className="signup">
        <h2>Login</h2>
        <h3>It&apos;s quick & simple</h3>
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
            Don&apos;t have an account?
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
