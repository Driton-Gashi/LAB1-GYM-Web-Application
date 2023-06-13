import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Crossfit(){
  const navigate = useNavigate();
  return(
    <>
    
    <section className="calisthenics-card">
      <div className='calisthenics-content'>
        <div className='calisthenics-text'>
      <h2>We Can Give A Shape Of Your Body Here!</h2>
      <p>At LMAO, we are dedicated to helping you achieve the 
        body of your dreams. Our expert trainers and
         nutritionists will work with you to create a personalized fitness and 
         nutrition plan that helps you reach your specific goals.</p>

      <div className='planers-card'>
       <div className='planer'>
          <img src="./video_thumbnail/B12.png" alt="" />
          <p>CARVE YOUR BODY</p>
        </div>
        <div className='planer'>
          <img src="./video_thumbnail/B13.png" alt="" />
          <p>TRAIN HARD</p>
        </div>
        <div className='planer'>
          <img src="./video_thumbnail/B14.png" alt="" />
          <p>GET YOUR EQUIPMENT</p>
        </div>
        <div className='planer'>
          <img src="./video_thumbnail/B15.png" alt="" />
          <p>STAY HYDRATED</p>
        </div>
      </div>
      <button
          onClick={() => {
            navigate("/training");
          }}
        >Become a member</button>
        </div>
      <img src="./video_thumbnail/lol.png" alt="" />
      </div>
      </section>

    </>
  )
}

