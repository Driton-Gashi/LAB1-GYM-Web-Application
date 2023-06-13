import MainBanner from "../components/Home/MainBanner";
import Crossfit from "../components/Home/Crossfit";
import Tour from "../components/Home/Tour";
import BMI from "../components/Home/BMI";

const Home = ({ getUser }) => {
  return (
    <>
      <MainBanner getUser={getUser} />
      <Tour/>
      <Crossfit />
      <BMI/>
    </>
  );
};

export default Home;
