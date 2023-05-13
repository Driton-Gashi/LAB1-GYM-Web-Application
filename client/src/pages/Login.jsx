import { useState } from "react";
import { NavLink } from "react-router-dom";

import "../css/login.css";

import background from "../img/loginbg.svg";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

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
              type="email"
              required
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-key"></i>
            </span>
          </div>
          <p>
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
