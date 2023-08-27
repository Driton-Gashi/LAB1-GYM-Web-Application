import { NavLink } from "react-router-dom"
const Sidebar = ({logout}) => {
  return (
    <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Dashboard</span>
        </div>
        <ul className="nav-links">
          
          <li>
            <NavLink to="/dashboard/admin">
            <i className="fa-solid fa-chart-line"></i>
              
            <span className="links_name">Admin Dashboard</span>
              
              </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/user">
            <i className="fa-solid fa-user"></i>
              
            <span className="links_name">Profile</span>
              
              </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/publisher">
            <i className="fa-solid fa-user"></i>
              
            <span className="links_name">Publisher</span>
              
              </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/gymtrainer">
            <i className="fa-solid fa-user"></i>
              
            <span className="links_name">GYM Trainer</span>
              
              </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/yogatrainer">
            <i className="fa-solid fa-user"></i>
              
            <span className="links_name">Yoga Trainer</span>
              
              </NavLink>
          </li>
          <li  onClick={logout} className="log_out">
            <a href="#Logout">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className="links_name">
                Log out
              </span>
            </a>
          </li>
        </ul>
      </div>
  )
}

export default Sidebar