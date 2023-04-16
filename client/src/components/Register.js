import { useState } from "react";

import "../css/login.css";

import background from "../img/loginbg.svg";

const Register = () => {
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
      <div className="signup">
        <h2>Sign Up</h2>
        <h3>It's quick & simple</h3>
        <form className="form" onSubmit={handleSubmit}>
          <div className="textbox">
            <input
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
          <p>
            Signed up already?
            <a href="#"> Login here</a>
          </p>

          <button type="submit">
            Register
            <span className="material-symbols-outlined">
              <i className="fa-solid fa-arrow-right"></i>
            </span>
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
