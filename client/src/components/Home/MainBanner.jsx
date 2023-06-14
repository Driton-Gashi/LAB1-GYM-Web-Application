import { useNavigate } from "react-router-dom";
import video from "../../img/video.mp4";
import "../../css/homepage.css";
const MainBanner = ({ getUser }) => {
  const user = getUser();
  const navigate = useNavigate();
  return (
    <div className="mainBanner">
      <div className="mainBanner__content">
        {user ? (
          <h1>
            Welcome Back <span className="color-blue">{user.user_name}</span>
          </h1>
        ) : (
          <h1>
            Official <span className="color-blue">LMAO</span> Shop
          </h1>
        )}

        <p>
          The shop of your dreams for all your wants and needs you might find the tool that you want
          or the shirt that you like but one think is for certain ,you will find what you need
        </p>
        <button
          onClick={() => {
            navigate("/shop");
          }}
        >
          Shop Now
        </button>
      </div>
      <video className="videoBg" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default MainBanner;
