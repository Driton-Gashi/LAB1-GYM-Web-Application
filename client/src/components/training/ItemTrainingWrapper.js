import { useState,useEffect } from "react";
import React from "react";
import "../../css/training.css";
import ItemTraining from "./ItemTraining";

export default function ItemTrainingWrapper({Title}){
  const [video, setVideo] = useState([]); 

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/video");
      const jsonData = await response.json();
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

   {video.slice(0, 3).map(e=>(
     <ItemTraining
     key={e.video_id}
     video_name={e.video_name}
     video_difficulity={e.video_difficulity}
     vide_image={e.vide_image}
     vide_description={e.vide_description}
     />

   ))}
    </div>
    <button>View All</button>
    </>
  )
}