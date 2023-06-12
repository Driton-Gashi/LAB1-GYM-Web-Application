import React from 'react'

export default function TrainerItem({videoName,videoDifficulty,videoDescription,videoURL,videoImage,videoCategory}) {

  return (
    <div className='video-content'>
      <p>{videoName}</p>
      <p>{videoDifficulty}</p>
      <p>{videoDescription}</p>
      <p>{videoURL}</p>
      <p>{videoImage}</p>
      <p>{videoCategory}</p>
      {console.log(videoName,videoCategory,videoDescription,videoDifficulty)}
    </div>
  )
}
