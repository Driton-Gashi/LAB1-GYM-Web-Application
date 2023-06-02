import video from "../../img/video.mp4";
import "../../css/homepage.css";
const MainBanner = ({ getUser }) => {
  const user = getUser();
  console.log(user);
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
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          sequi libero ipsam, est asperiores numquam laboriosam, id quia iusto
          fugiat laudantium tenetur ratione odio voluptas vitae consequatur
          maxime soluta explicabo
        </p>
        <button>Shop Now</button>
      </div>
      <video className="videoBg" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default MainBanner;
