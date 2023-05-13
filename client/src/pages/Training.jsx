import React from "react";
import "../css/training.css";
import ItemTrainingWrapper from "../components/training/ItemTrainingWrapper";
import TrainingLibrary from "../components/training/TrainingLibrary";

const Training = () => {

  

  return (<>
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


    



  </>)
};

export default Training;
