
const UserProfile = ({getUser}) => {
  return (
    <div className="profile-details">
        <img src={getUser().image} alt="" />
        <span className="admin_name">{getUser().user_name}</span>
        <i className="fa-solid fa-chevron-down bx-chevron-down"></i>
    </div>
  )
}

export default UserProfile