import { useState } from "react";
import { NavLink } from "react-router-dom";

import "../css/login.css";
import loadingGif from "../img/loading.gif";
import background from "../img/loginbg.svg";

const Register = () => {
  const loadingEffect = () => {
    const messageElement = document.querySelector(".signup-message");
    const username = document.querySelector(".name").value;
    messageElement.innerHTML = `<img src="${loadingGif}"  width="30px"/> Trying to Register!`;

    setTimeout(() => {
      messageElement.innerHTML = `User was registered succesfuly!`;
    }, 1000);
  };

  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_Password] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      console.log("User registered successfully");
    } else {
      console.error("Error registering user");
    }
  };
  return (
    <>
      <img className="clouds" src={background} />
      <div className="signup register-signup register">
        <h2>Register</h2>
        <h3>It's quick & simple</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
              className="name"
              type="text"
              required
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <label>Name</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-user"></i>
            </span>
          </div>
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
          <div className="textbox">
            <input
              type="password"
              required
              value={confirm_password}
              onChange={(e) => setconfirm_Password(e.target.value)}
            />
            <label>Confirm Password</label>
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-lock"></i>
            </span>
          </div>
          <p className="signup-message">
            Signed up already?
            <NavLink to="/login"> Log In</NavLink>
          </p>

          <button type="submit" onClick={loadingEffect}>
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
