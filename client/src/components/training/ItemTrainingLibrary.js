import React from "react";
import "../../css/training.css";

export default function ItemTrainingLibrary({vide_description,vide_image}){

  const backgroundImageUrl = vide_image
    const styles = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };


  return(
    <>
    <div className="item_card_training_library" style={styles}>
      <h2>{vide_description}</h2>
    </div>
    </>
  )
}