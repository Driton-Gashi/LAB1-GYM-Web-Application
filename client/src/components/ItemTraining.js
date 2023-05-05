import React from "react";
import "../css/training.css";

export default function ItemTraining({video_name,vide_description,video_dificulity,vide_image}){
  return(
    <>
    <div className="item_card_training">
      <p>Beginier</p>
      <img src={vide_image} width="100%" alt=""></img>
      <h3>Training Video</h3>
      <h2>Best video you will ever see</h2>
    </div>
    </>
  )
}