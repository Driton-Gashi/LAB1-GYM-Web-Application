import React from "react";
import { useState,useEffect } from "react";
import "../../css/training.css";
import ItemTraining from "./ItemTraining";


export default function TrainingLibrary({Title}){

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


return(
<>

<h1>
  TITLE
</h1>

{video.map(e=>(
     <ItemTraining
     key={e.video_id}
     video_name={e.video_name}
     video_dificulity={e.video_dificulity}
     vide_image={e.vide_image}
     vide_description={e.vide_description}
     />

   ))}




</>


)
}