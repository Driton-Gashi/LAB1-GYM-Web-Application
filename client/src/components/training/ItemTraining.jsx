import React from "react";
import "../../css/training.css";

export default function ItemTraining({video_name,vide_description,video_difficulity,vide_image}){

  const backgroundImageUrl = vide_image
    const styles = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };


  return(
    <>
    <div className="item_card_training" style={styles}>
      <p>{video_difficulity}</p>
      <h3>{video_name}</h3>
      <h2>{vide_description}</h2>
    </div>
    </>
  )
}