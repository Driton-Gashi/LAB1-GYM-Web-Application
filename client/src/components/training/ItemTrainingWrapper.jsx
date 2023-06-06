import { useState, useEffect } from "react";
import React from "react";
import "../../css/training.css";
import ItemTraining from "./ItemTraining";

export default function ItemTrainingWrapper({ Title , showVideo,setVideos}) {
  const [video, setVideo] = useState([]);
  const [videoSize, setVideoSize] = useState(3);

  function IncreaseVideo() {
      if(videoSize === 6){
        setVideoSize(3)
      }else{

        setVideoSize(6);
      }
    
    
  }

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/video");
      const jsonData = await response.json();
      setVideo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const videoArray = Object.values(video);

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <h1>{Title}</h1>

      <div className="video_card">
        {videoArray.slice(0, videoSize).map((e) => (
          <ItemTraining
            key={e.video_id}
            video_name={e.video_name}
            video_difficulity={e.video_difficulity}
            vide_image={e.vide_image}
            vide_description={e.vide_description}
            vide_url={e.vide_url}
            showVideo={showVideo}
            setVideos={setVideos}
          />
        ))}
      </div>
      <button onClick={IncreaseVideo}>View All</button>
    </>
  );
}
