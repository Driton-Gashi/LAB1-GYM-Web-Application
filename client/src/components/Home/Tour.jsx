import React from 'react'
import TourCard from './TourCard'
import { useNavigate } from 'react-router-dom';

export default function Tour(){
const navigate = useNavigate();

  return(
    <>
    


    <div className='tour-card'>
    <div className="tour-card-card">
    <TourCard
    img="./video_thumbnail/B9.png"
    title="PROGRESION"
    desc="Our team of experts will work with you to create a customized plan that helps you achieve success one step at a time."
    />
    <TourCard
    img="./video_thumbnail/B10.png"
    title="WORK OUT"
    desc="With a variety of workouts to choose from, you'll have everything you need to get into the best shape of your life."
    />
    <TourCard
    img="./video_thumbnail/B11.png"
    title="NUTRIOTION"
    desc="Our team will work with you to create a personalized meal plan that helps you reach your specific health goals."
    />
    
    </div>
      
    <section className='tour-main'>
    <div className='tour-content'>
      <h5>WHO ARE WE</h5>
      <h3>Take Your Health And Body To Next Level</h3>
      <p>Take your health and body to the next level with our comprehensive program designed to help you reach your fitness goals.</p>
      <div className='tour-directions'>
        <div className='tour-direction1'>
          <img src="./video_thumbnail/B6.png" alt="" />
          <h1>PROFESSIONAL
             TRAINERS</h1>
        </div>
        <div className='tour-direction2'>
          <img src="./video_thumbnail/B7.png" alt="" />
          <h1>PROFESSIONAL TRAINERS</h1>
        </div>
        <div className='tour-direction3'>
          <img src="./video_thumbnail/B8.png" alt="" />
          <h1>PROFESSIONAL TRAINERS</h1>
        </div>
      </div>
      <button
          onClick={() => {
            navigate("/training");
          }}
        >
          Take a tour
        </button>

    </div>
    <div className="tour-img">
      <img src="./video_thumbnail/B2.png" alt="" className='img-b2' />
      <img src="./video_thumbnail/B5.png" alt="" className='img-b5' />
      <div className='img-b3'></div>
    </div>
    </section>

    </div>

    </>
  )
}

