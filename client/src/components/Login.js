import { useState } from "react";
import "../css/login.css";

const Login = () => {
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
      <section className="body">
        <div className="diamond"></div>
        <div className="card-left"></div>
        <div className="card-mid">
          <form className="card-main-mid" onSubmit={handleSubmit}>
            <h1>Create a new account now</h1>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              className="input-info"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className="input-info"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="input-info"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              className="input-info"
              value={confirm_password}
              onChange={(e) => setconfirm_Password(e.target.value)}
            />
            <p>
              Already have an account? <u>Log In</u>
            </p>
            <button type="submit" className="input-info" id="btn-id">
              Confirm
            </button>
          </form>
        </div>
        <div className="card-right"></div>
      </section>
    </>
  );
};

export default Login;
