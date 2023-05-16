import React from "react";
import { useState, useEffect } from "react";
import "../../css/training.css";
import ItemTrainingLibrary from "./ItemTrainingLibrary";

export default function TrainingLibrary() {
  const [video, setVideo] = useState([]);

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/video");
      const jsonData = await response.json();
      setVideo(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  return (
    <>
      <h6>Title</h6>

      <p>Library to find different excercersises</p>

      <div className="video_card-training-library">
        {video.slice(0, 5).map((e) => (
          <ItemTrainingLibrary
            key={e.video_id}
            vide_image={e.vide_image}
            vide_description={e.vide_description}
          />
        ))}
      </div>
    </>
  );
}
