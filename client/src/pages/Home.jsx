import MainBanner from "../components/Home/MainBanner";
import Crossfit from "../components/Home/Crossfit";
import ShopNProgram from "../components/Home/ShopNProgram";

const Home = ({ getUser }) => {
  return (
    <>
      <MainBanner getUser={getUser} />

      <ShopNProgram />
      <Crossfit />
    </>
  );
};

export default Home;
