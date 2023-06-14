import { useState, useEffect } from "react";
import React from "react";
import "../../css/training.css";
import ItemTraining from "./ItemTraining";

export default function ItemTrainingWrapper({
  Title,
  showVideo,
  setVideos,
  category,
  getUser
}) {
  const [video, setVideo] = useState([]);
  const [videoSize, setVideoSize] = useState(3);

  function IncreaseVideo() {
    if (videoSize === 100) {
      setVideoSize(3);
    } else {
      setVideoSize(100);
    }
  }

  const getVideo = async () => {
    try {
      const response = await fetch("http://localhost:5000/getvideo");
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
        {videoArray
          .filter((video) => video.video_category === category)
          .slice(0, videoSize)
          .map((e) => (
            <ItemTraining
              key={e.video_id}
              video_id={e.video_id}
              video_name={e.video_name}
              video_difficulity={e.video_difficulity}
              vide_image={e.vide_image}
              vide_description={e.vide_description}
              vide_url={e.vide_url}
              video_category={e.video_category}
              showVideo={showVideo}
              setVideos={setVideos}
              getUser={getUser}

            />
          ))}
      </div>
      <button onClick={IncreaseVideo}>View All</button>
    </>
  );
}
