
import "../css/training.css";
import ItemTrainingWrapper from "../components/training/ItemTrainingWrapper";
import TrainingLibrary from "../components/training/TrainingLibrary";
import MembershipCard from "../components/training/MembershipCard";
import { useState } from "react";

const Training = () => {
  
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
         <h1>Lorem ipsum dolor sit amet, consectetur adipisicing.</h1>
         <p>Lorem ipsum dolor sit amet, consectetur adipisicing.</p>
      </div>
    </div>
    
    <section className="training_section">
    <ItemTrainingWrapper
    Title="Training Plans"
    category="Tutorial"
    showVideo={showVideo}
    setVideos={setVideos}
    />

    <ItemTrainingWrapper
    Title="Tutorial"
    category="Tutorial"
    showVideo={showVideo}
    setVideos={setVideos}
    />
    
    
    </section>

    
    <section className="training_section_black">
    <ItemTrainingWrapper
    Title="Youtube videos"
    category="Youtube"
    showVideo={showVideo}
    setVideos={setVideos}
    />
    

    <ItemTrainingWrapper
    Title="Training Plans"
    category="Tutorial"
    showVideo={showVideo}
    setVideos={setVideos}
    />

    <TrainingLibrary
    Title="Training Library"
    category="Tutorial"
    showVideo={showVideo}
    setVideos={setVideos}
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
