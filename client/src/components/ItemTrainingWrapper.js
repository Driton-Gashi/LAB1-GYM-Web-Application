import { useState,useEffect } from "react";
import React from "react";
import "../css/training.css";
import ItemTraining from "./ItemTraining";

export default function ItemTrainingWrapper({Title}){
  const [video, setVideo] = useState([]); 

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/video");
      const jsonData = await response.json();
      console.log('----------------------------------------------------')
      console.log(jsonData);
      setVideo(jsonData);
      
    } catch (err) {
      console.error(err.message);
    }
  }

 

  

  useEffect(() => {
    getVideo();
  }, []);


console.log(video);
  return(
    <>
    <h1>{Title}</h1>
    
    
    <div className="video_card">
   
    <ItemTraining/>


    <ItemTraining
    />
    <ItemTraining
    />
  
    </div>
    <button>View All</button>
    </>
  )
}