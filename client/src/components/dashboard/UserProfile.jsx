import { useState } from "react"
import { NavLink } from "react-router-dom"
import swal from "sweetalert";

const UserProfile = ({getUser}) => {

  const logout = () => {
    // Clear user-related data
    swal({
      title: "Are you sure?",
      text: "You are about to Log out!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You Logged out successfuly!", {
          icon: "success",
        });
        localStorage.removeItem("token");
        // Navigate to the login page
        window.location.reload(true);
      }
    });
  };

  const [showMenu, setShowMenu] = useState(false)
  return (
    <div onClick={()=>{setShowMenu(()=>{setShowMenu(!showMenu)})}} className="profile-details">
        <img src={getUser().image} alt="" />
        <span className="admin_name">{getUser().user_name}</span>
        <i className="fa-solid fa-chevron-down bx-chevron-down"></i>
        <div className={`profile-details-dropdown ${showMenu?"":"hide"}`}>
          <ul className="borderOn">
            <li><NavLink to="/dashboard/user"><i className="fa-solid fa-user"></i> Profile</NavLink></li>
            <li><a ><i className="fa-solid fa-puzzle-piece"></i> Integrations</a></li>
            <li><a><i className="fa-solid fa-gear"></i> Settings</a></li>
          </ul>
          <ul className="borderOn">
            <li><a ><i className="fa-regular fa-file"></i> Guide</a></li>
            <li><a ><i className="fa-regular fa-circle-question"></i> Help Center</a></li>
          </ul>
          <ul>
            <li onClick={logout}><a><i className="fa-solid fa-right-from-bracket"></i> Logout</a></li>
          </ul>
        </div>
    </div>
  )
}

export default UserProfile