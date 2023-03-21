import Header from "./components/Header";
import HomepageFirstSection from "./components/HomepageFirstSection";
import Footer from "./components/Footer";
import HomepageSecondSection from "./components/HomepageSecondSection";
import logo from "./img/logo.png";

const App = () => {
  return (
    <>
      <Header logo={logo} />
      <HomepageFirstSection />
      <HomepageSecondSection />

      {/* Footer Always in the bottom */}
      <Footer />
    </>
  );
};

export default App;
