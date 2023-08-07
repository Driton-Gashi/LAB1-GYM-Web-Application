// import { Outlet,NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import UserProfile from "./UserProfile";
import ActionButtons from "./ActionButtons";
const Admin = ({ getUser }) => {
  

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
    

  return (
      <section className="home-section">
        <nav>
          <div className="sidebar-button">
            <i className="bx bx-menu sidebarBtn"></i>
            <span className="dashboard-title">Admin Dashboard</span>
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <i className="fa-solid fa-magnifying-glass bx-search"></i>
          </div>
          <UserProfile getUser={getUser}/>

        </nav>
        <div className="home-content">
          <div className="overview-boxes">
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Order</div>
                <div className="number">40,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
                </div>
              </div>
              <i className="bx bx-cart-alt cart"></i>
            </div>
            <div className="box">
              <div className="right-side">
                <div className="box-topic">Total Sales</div>
                <div className="number">38,876</div>
                <div className="indicator">
                  <i className="bx bx-up-arrow-alt"></i>
                  <span className="text">Up from yesterday</span>
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
                <ActionButtons users={users} deleteUser={deleteUser}/>
              </div>
              <div className="button">
                <a href="#">Add User</a>
              </div>
            </div>
            <div className="top-sales box">
              <div className="title">Top Seling Product</div>
              <ul className="top-sales-details">
                <li>
                  <a href="#">
                    <img src="images/sunglasses.jpg" alt="" />
                    <span className="product">Vuitton Sunglasses</span>
                  </a>
                  <span className="price">$1107</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/jeans.jpg" alt="" />
                    <span className="product">Hourglass Jeans </span>
                  </a>
                  <span className="price">$1567</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/nike.jpg" alt="" />
                    <span className="product">Nike Sport Shoe</span>
                  </a>
                  <span className="price">$1234</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/scarves.jpg" alt="" />
                    <span className="product">Hermes Silk Scarves.</span>
                  </a>
                  <span className="price">$2312</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/blueBag.jpg" alt="" />
                    <span className="product">Succi Ladies Bag</span>
                  </a>
                  <span className="price">$1456</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/bag.jpg" alt="" />
                    <span className="product">Gucci Womens&apos;s Bags</span>
                  </a>
                  <span className="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/addidas.jpg" alt="" />
                    <span className="product">Addidas Running Shoe</span>
                  </a>
                  <span className="price">$2345</span>
                </li>
                <li>
                  <a href="#">
                    <img src="images/shirt.jpg" alt="" />
                    <span className="product">Bilack Wear&apos;s Shirt</span>
                  </a>
                  <span className="price">$1245</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Admin;
