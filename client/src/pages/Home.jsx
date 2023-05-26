import MainBanner from "../components/Home/MainBanner";
import Crossfit from "../components/Home/Crossfit";
import ShopNProgram from "../components/Home/ShopNProgram";

const Home = () => {
  return (
    <>
      <MainBanner />
      <div className="test"></div>
      <ShopNProgram/>
      <Crossfit/>
    </>
  );
};

export default Home;
