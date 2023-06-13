import React from "react";
import "../../css/training.css";

export default function ItemTraining({
  video_name,
  vide_description,
  video_difficulity,
  vide_image,
  vide_url,
  video_category,
  showVideo,
  setVideos,
}) {
  const backgroundImageUrl = vide_image;
  const styles = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  console.log(video_category);
  setVideos(vide_url);

  return (
    <>
      <div className="item_card_training" style={styles} onClick={showVideo}>
        <p>{video_difficulity}</p>
        <h3>{video_name}</h3>
        <h2>{vide_description}</h2>
      </div>
    </>
  );
}
