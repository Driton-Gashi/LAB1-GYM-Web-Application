
import "../css/training.css";
import ItemTrainingWrapper from "../components/training/ItemTrainingWrapper";
import TrainingLibrary from "../components/training/TrainingLibrary";
import MembershipCard from "../components/training/MembershipCard";
import { useState } from "react";

const Training = ({getUser}) => {
  
  const [show,setShow] = useState()
  const [videos,setVideos]= useState("")
  
  
  function showVideo(){
      setShow(!show)
  }
  

  return (

  <>
    {
   show && (<div className="video-player" onClick={showVideo}>
     <video src={videos} autoPlay controls></video>
  </div>)
    }
    <div className="main_banner_training">
        <div className="main_banner_training_content">
         <h1>Training ground for all your needs</h1>
         <p>The Training page provides a dynamic and
           versatile environment for individuals of all fitness levels. </p>
      </div>
    </div>
    
    <section className="training_section">
    <ItemTrainingWrapper
    Title="Training Plans"
    category="Plans"
    showVideo={showVideo}
    setVideos={setVideos}
    getUser={getUser}
    />

    <ItemTrainingWrapper
    Title="Form Tutorials"
    category="Tutorial"
    showVideo={showVideo}
    setVideos={setVideos}
    getUser={getUser}
    />
    
    
    </section>

    
    <section className="training_section_black">
    <ItemTrainingWrapper
    Title="Youtube videos"
    category="Youtube"
    showVideo={showVideo}
    setVideos={setVideos}
    getUser={getUser}

    />
    

    <ItemTrainingWrapper
    Title="Programs"
    category="Program"
    showVideo={showVideo}
    setVideos={setVideos}
    getUser={getUser}

    />

    <TrainingLibrary
    Title="Training Library"
    category="Library"
    showVideo={showVideo}
    setVideos={setVideos}
    getUser={getUser}

    />

    </section>

    <div className="container">

      <h1>Programs</h1>
      
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
