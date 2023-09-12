const ActionButtons = ({ users, deleteUser,setShowEditUser,setId }) => {
  return (
    <ul className="details">
      <li className="topic">Actions</li>
      {users.map((user, index) => (
        <li className="user-action-wrapper" key={index}>
          {
            <>
              <a onClick={()=>{setShowEditUser(true); setId(user.user_id)}}>
                <i  className="fa-solid fa-pencil action-edit"></i>
              </a>
              <a onClick={() => deleteUser(user.user_id)}>
                <i className="fa-solid fa-trash action-delete"></i>
              </a>
            </>
          }
        </li>
      ))}
    </ul>
  );
};

export default ActionButtons;
