import "../css/footer.css";
import logo from "../img/logo.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footer-section">
          <img className="footer-logo" src={logo} alt="" />
        </div>
        <ul className="footer-section">
          <li>
            <h3>Lorem, ipsum.</h3>
          </li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
        </ul>
        <ul className="footer-section">
          <li>
            <h3>Lorem, ipsum.</h3>
          </li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
        </ul>
        <ul className="footer-section">
          <li>
            <h3>Lorem, ipsum.</h3>
          </li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
          <li>Lorem.ispum</li>
        </ul>
      </footer>
      <div className="after-footer">
        <span className="color-blue">LMAO</span> copyright © all rights reserved
      </div>
    </>
  );
};

export default Footer;
