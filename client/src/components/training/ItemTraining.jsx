import React, { useEffect, useState } from "react";
import "../../css/training.css";

export default function ItemTraining({
  video_id,
  video_name,
  vide_description,
  video_difficulity,
  vide_image,
  vide_url,
  video_category,
  showVideo,
  setVideos,
  getUser
}){
  const [watched,setWatched] = useState(0);
  const user = getUser();
  // user.user_id

  const backgroundImageUrl = vide_image;
  const styles = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  const getWatched = async () =>{
    try{
    const response = await fetch(`http://localhost:5000/video_user/${video_id}/${user.user_id}`);
    const jsonData = await response.json();
    setWatched(jsonData);
    }catch(e){
      console.log(e.message);
    }
  }

  const handleSubmit = async () =>{
    try{
      
      const response = await fetch(
        `http://localhost:5000/createVideo_user`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoId:video_id,
            userId:user.user_id
          }),
        }
      );
      const data = await response.json();
      console.log(data);

    }catch(e){
      console.log(e.message);
    }
  }


  
  console.log(video_category);
  setVideos(vide_url);
  console.log(video_id,user.user_id,watched);

  useEffect(()=>{
    getWatched();
  },[watched])

 

  return (
    <>
      <div className={watched === 0 ? "item_card_training" : "item_card_training watched"} style={styles} onClick={() =>{
        showVideo();
        handleSubmit();
      }}>
        <p>{video_difficulity}</p>
        <h3>{video_name}</h3>
        <h2>{vide_description}</h2>
      </div>
    </>
  );
}
