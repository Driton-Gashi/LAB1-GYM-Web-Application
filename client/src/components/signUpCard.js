import React from "react";
import "../css/signUp.css";

const SignUpCard = () => {
  return (
    <>
    <section class="body">
      <div class="diamond"></div>
    <div class="card-left">
      <div class="card-main-left">
        <h1>Create a new account now</h1>
  <input type="text" id="name" name="name" placeholder="Name" class="input-info"/>
  <input type="text" id="email" name="email" placeholder="Email" class="input-info"/>
  <input type="password" id="password" name="pas" placeholder="Password" class="input-info"/>
        <button class="input-info" id="btn-id"> Confirm </button>
        
      </div>
    </div>
    <div class="card-right">
    <div class="card-main-right">
        <h1>Create a new account now</h1>
        
      </div>
    </div>
    </section>    
    </>
  );
};

export default SignUpCard;
