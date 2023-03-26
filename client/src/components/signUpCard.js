import React from "react";
import "../css/signUp.css";
import Login from "..//components/Login"

const SignUpCard = () => {
  return (
    <>
  
    <section class="body">
      <div class="diamond"></div>
      <div class="card-left">
    </div>
    <div class="card-mid">
      <div class="card-main-mid">
        <h1>Create a new account now</h1>
 {/*<input type="text" id="name" name="name" placeholder="Name" class="input-info"/>*/}
      <input type="text" id="email" name="email" placeholder="Email" class="input-info"/>
      <input type="password" id="password" name="pas" placeholder="Password" class="input-info"/>
      <p>Already have an account? <u>Log In</u></p>
        <button class="input-info" id="btn-id"> Confirm </button>
      </div>
    </div>
    <div class="card-right">
    
    </div>
    </section>    
    </>
  );
};

export default SignUpCard;
