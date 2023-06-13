import React from "react";
import "../../css/training.css";

export default function ItemTrainingLibrary({vide_description,vide_image,vide_url,video_category,showVideo,setVideos}){


  const backgroundImageUrl = vide_image
    const styles = {
      backgroundImage: `url(${backgroundImageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    };

    console.log("AAAAAAAAAAAAAAAAAAAAAAAA",video_category);
    setVideos(vide_url)

  return(
    <>
    

    <div className="item_card_training_library" style={styles} onClick={showVideo}>
      <h2>{vide_description}</h2>
    </div>
    
    </>
  )
}