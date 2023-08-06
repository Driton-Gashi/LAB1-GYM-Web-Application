
const Sidebar = ({logout}) => {
  return (
    <div className="sidebar">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">Dashboard</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#" className="active">
              <i className="fa-solid fa-gauge"></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>

          <li className="log_out">
            <a href="#">
              <i className="fa-solid fa-right-from-bracket"></i>
              <span onClick={logout} className="links_name">
                Log out
              </span>
            </a>
          </li>
        </ul>
      </div>
  )
}

export default Sidebar