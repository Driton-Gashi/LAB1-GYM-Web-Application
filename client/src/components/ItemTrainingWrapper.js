import { useState,useEffect } from "react";
import React from "react";
import "../css/training.css";
import ItemTraining from "./ItemTraining";

export default function ItemTrainingWrapper(){
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
    <h1>LMAO</h1>
    
    
    <div className="video_card">
    {video.map((e) => (
            // %PUBLIC_URL% shortcut for public
            <ItemTraining
            // video_name,vide_description,video_dificulity,vide_image
              key={e.video_id}
              video_name={e.video_name}
              vide_description={e.vide_description}
              video_dificulity={e.video_dificulity}
              vide_image = {e.vide_image}
            />
          ))}
    </div>
    <button>View All</button>
    </>
  )
}