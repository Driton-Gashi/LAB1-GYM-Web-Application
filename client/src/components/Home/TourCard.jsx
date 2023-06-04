import React from 'react'

export default function TourCard({img,title,desc}){
  return(
    <>
    
    <div className='tour-card-body'>
      <img src={img} alt="" />
      <h3>{title}</h3>
      <p>{desc}</p>
    </div>

    </>
  )
}

