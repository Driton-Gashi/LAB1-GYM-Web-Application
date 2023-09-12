import { useState, useEffect } from "react";
import EditUser from "./EditUser";

const SearchUser = ({id, showEditUser, setShowEditUser, setId, deleteUser}) => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/getuserbyusername/" + search);
        const jsonData = await response.json();
  
        setUsers(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };
  
    useEffect(() => {
        getUsers(); // Initial search when the component mounts
        if(search.length == 0){
            setUsers([]);
            setTimeout(()=>setShowDetails(false),3000)
        }
    }, [search]); // Trigger the search whenever the search value changes
    
    const inputOnChange = (e)=>{
      setSearch(e.target.value);
      setShowDetails(true);
    }
   

  return (
    <div className="search-box">
        {/* Edit User */}
        <EditUser id={id} showEditUser={showEditUser} setShowEditUser={setShowEditUser} />

      <input type="text" value={search} onChange={inputOnChange} placeholder="Search users by username..." />
      {/* <i onClick={handleSearchUser} className="fa-solid fa-magnifying-glass bx-search"></i> */}
      <div className={`search-results ${showDetails?"":"hide"}`}>
        <ul>
        {
            users.length == 0? <li className="search-result-user">No results for given search</li> :(users.map((user, index) => (
                <li key={index} className="search-result-user">
                <img src={user.image} alt="" />
                <h4><i className="fa-solid fa-signature"></i> {user.user_name}</h4>
                 <a href={`mailto:${user.email}`}><i className="fa-solid fa-envelope"></i> {user.email}</a> 
                <a href={user.tel_number == null ?"#":"tel:"+ user.tel_number}><i className="fa-solid fa-phone"></i> {user.tel_number == null ?"NoN": user.tel_number}</a>
                <div className="user-actions">
                  <a onClick={()=>{setShowEditUser(true); setId(user.user_id)}} >
                    <i className="fa-solid fa-pencil action-edit"></i>
                  </a>
                  <a onClick={() => deleteUser(user.user_id)}>
                    <i className="fa-solid fa-trash action-delete"></i>
                  </a>
                </div>
              </li>
              )))

        }
          
        </ul>
      </div>
    </div>
  );
};

export default SearchUser;
