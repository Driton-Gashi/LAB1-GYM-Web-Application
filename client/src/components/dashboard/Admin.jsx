// import { Outlet,NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import UserProfile from "./UserProfile";
import ActionButtons from "./ActionButtons";
import AddUser from "./AddUser";
import AdminTopSellingProducts from "./AdminTopSellingProducts";
import EditUser from "./EditUser";
import SearchUser from "./SearchUser";
const Admin = ({ getUser }) => {
  
  const getStars = (review) => {
    let reviewStars = [];

    for (let i = 0; i < review; i++) {
      reviewStars.push(<i key={i} className="fa-solid fa-star"></i>);
    }
    for (let i = reviewStars.length; i < 5; i++) {
      reviewStars.push(<i key={i} className="fa-regular fa-star"></i>);
    }
    return reviewStars;
  };

  const [show, setshow] = useState(false)

  const [popup, setPopup] = useState({
    isOpen: false,
  });

  // Edit User Variables
  const [showEditUser, setShowEditUser] = useState(false)
  const [id, setId] = useState(0);
  
  // Get Users
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  // Get Users end


  // delete User by ID
  const deleteUser = async (userId) => {
    swal({
      title: "Are you sure?",
      text: "You are about to Delete this user!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async(willDelete) => {
      if (willDelete) {
       
        try {
          const response = await fetch(`http://localhost:5000/user/${userId}`, {
            method: "DELETE",
          });
    
          if (response.ok) {
            swal({
              title: "Success",
              text: "User was deleted successfully",
              icon: "success",
              timer: 3000,
              button: false,
            });
            window.location.reload(true);
          } else {
            swal({
              title: "Error",
              text: "Failed to delete user",
              icon: "error",
              timer: 3000,
              button: false,
            });
          }
        } catch (error) {
          swal({
            title: "Error",
            text: "An error occurred while deleting the user",
            icon: "error",
            timer: 3000,
            button: false,
          });
          console.log(error);
        }
      }
    });
  };
    
  // Code for fetching products

  const [items, setItems] = useState([]);

  useEffect(() => {
    // Define the URL for your API endpoint
    let url = 'http://localhost:5000/items';

   

    // Fetch data from the API
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data); // Store the fetched data in state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
      <section className="home-section">
        {/* Add User Form */}
        <AddUser show={show} setshow={setshow}/>

        {/* Edit User Form */}
        <EditUser id={id} showEditUser={showEditUser} setShowEditUser={setShowEditUser} />


        {/* Product Popup when product is clicked */}
        {!popup.isOpen ? (
        ""
      ) : (
        <div className="itemPopup">
          <i
            onClick={() => {
              setPopup({ isOpen: false });
            }}
            className="fa-solid fa-xmark popupClose"
          ></i>
          <div className="InnerItemPopup">
            <div className="itemPopup_left">
              <img src={popup.image} alt="" />
            </div>
            <div className="itemPopup_right">
              <h1>{popup.title}</h1>
              <h5>
                <span>category: </span>
                {popup.category}
              </h5>
              <div className="review">{getStars(popup.review)}</div>
              <h4>{popup.price}€</h4>
              <p>{popup.description}.</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      )}
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard-title">Admin Dashboard</span>
          </div>
          <SearchUser  setId={setId} setShowEditUser={setShowEditUser} deleteUser={deleteUser}/>
          <UserProfile getUser={getUser} />

        </nav>
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Users</div>
                <div className="number">{users.length}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Scaned {Math.floor(Math.random() * 60)} minutes ago </span>
                </div>
              </div>
              <i className="bx bx-cart-alt cart"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">{Math.floor(Math.random() * 100)}</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Scaned {Math.floor(Math.random() * 24)} hours ago </span>

                </div>
              </div>
              <i className="bx bxs-cart-add cart two"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Profit</div>
                <div className="number">$12,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bx-cart cart three"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Return</div>
                <div className="number">11,086</div>
                <div className="indicator">
                  <i className="bx bx-down-arrow-alt down"></i>
                  <span className="text">Down From Today</span>
                </div>
              </div>
              <i className="bx bxs-cart-download cart four"></i>
            </div>
          </div>
          <div className="sales-boxes">
            <div className="recent-sales box">
              <div className="title"><i className="fa-solid fa-user"></i> Users</div>
              <div className="sales-details">
                <ul className="details">
                  <li className="topic">Username</li>
                  {users.map((user, index) => (
                    <li key={index}>{<a href="#">{user.user_name}</a>}</li>
                  ))}
                </ul>
                <ul className="details">
                  <li className="topic">Email</li>

                  {users.map((user, index) => (
                    <li key={index}>
                      {<a href={`mailto:${user.email}`}>{user.email}</a>}
                    </li>
                  ))}
                </ul>
                <ul className="details">
                  <li className="topic">Role</li>
                  {users.map((user, index) => (
                    <li key={index}>{<a>{user.role}</a>}</li>
                  ))}
                </ul>
                {/*
                  User Telephone number column
                <ul className="details">
                  <li className="topic">Tel</li>
                  {users.map((user, index) =>
                    user.tel_number == null || user.tel_number == "" ? (
                      <li key={index}>{<a>/</a>}</li>
                    ) : (
                      <li key={index}>
                        <a href={`tel:${user.tel_number}`}>{user.tel_number}</a>
                      </li>
                    )
                  )}
                </ul> */}
                <ul className="details">
                  <li className="topic">Date</li>
                  {users.map((user, index) => {
                    const createdAt = new Date(user.created_at);
                    const formattedDate = createdAt.toLocaleDateString(); // Change the format as per your requirement

                    return (
                      <li key={index}>
                        <a>{formattedDate}</a>
                      </li>
                    );
                  })}
                </ul>
                <ActionButtons setId={setId} setShowEditUser={setShowEditUser} users={users} deleteUser={deleteUser}/>
              </div>
              <div className="button">
                <a className="addUserBtn" onClick={()=>{setshow(true)}} >Add User</a>
              </div>
            </div>
           <AdminTopSellingProducts items={items} setPopup={setPopup}/>
          </div>
        </div>
      </section>
  );
};

export default Admin;
