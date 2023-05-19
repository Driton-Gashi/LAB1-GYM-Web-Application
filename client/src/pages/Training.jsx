import React from "react";
// import { useState,useEffect } from "react";
import "../css/training.css";
import ItemTrainingWrapper from "../components/training/ItemTrainingWrapper";
import TrainingLibrary from "../components/training/TrainingLibrary";
import MembershipCard from "../components/training/MembershipCard";

const Training = () => {

  

  return (
  <>
    <div className="main_banner_training">
        <div className="main_banner_training_content">
         <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
      </div>
    </div>
    
    <section className="training_section">
    <ItemTrainingWrapper
    Title="Training Plans"/>
    <ItemTrainingWrapper
    Title="Training Plans"/>
    </section>

    
    <section className="training_section_black">
    <ItemTrainingWrapper
    Title="Training Plans"/>

    <ItemTrainingWrapper
    Title="Training Plans"/>

    <TrainingLibrary
    Title="Training Library"/>

    </section>

    <div className="container">

      <h1>TITLE</h1>
      
    <p>Get unlimited access to our massive calisthenics workout library
      , proven technique guides, and training programs built
       specifically to get the help you reach your fitness goals.</p>
    
    <section className="membreship_container">

    <MembershipCard
    time="Monthly"
    price="20"
    desc="month"

    />
    <MembershipCard
    time="Yearly"
    price="100"
    desc="year"
    disc="Save 25%"
/>

    </section>

    </div>

    



  </>)
};

export default Training;
