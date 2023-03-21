import "../css/header.css";
const Header = ({ logo }) => {
  return (
    <>
      <div className="before-header"></div>
      <header>
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="menu">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Training</a>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <button className="signup-btn">Sign Up</button>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
