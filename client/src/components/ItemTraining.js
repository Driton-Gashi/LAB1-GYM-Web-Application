import React from "react";
import "../css/training.css";

export default function ItemTraining({video_name,vide_description,video_dificulity,vide_image}){
  return(
    <>
    <div className="item_card_training">
      <p>{video_dificulity}</p>
      <img src={vide_image} width="100%" alt=""></img>
      <h3>{video_name}</h3>
      <h2>{vide_description}</h2>
    </div>
    </>
  )
}