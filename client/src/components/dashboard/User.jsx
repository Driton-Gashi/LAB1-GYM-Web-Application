import { useState } from "react"
import swal from "sweetalert";
import UserProfile from "./UserProfile"
import EditUser from "./EditUser";
const User = ({getUser}) => {
  const [showEditUser, setShowEditUser] = useState(false);
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

        <EditUser title={"Edit Your Profile"} id={getUser().user_id} showEditUser={showEditUser} setShowEditUser={setShowEditUser} />
      
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard-title">Profile</span>
      </div>
      {/* <div className="search-box">
        <input type="text" placeholder="Search..." />
        <i className="fa-solid fa-magnifying-glass bx-search"></i>
      </div> */}
      <UserProfile getUser={getUser}/>
    </nav>
    <div className="home-content">
      <div className="overview-boxes">
        <div className="box">
          <div className="right-side">
            <div className="box-topic">My Orders</div>
            <div className="number">0</div>
            <div className="indicator">
              <i className="bx bx-up-arrow-alt"></i>
              <span className="text">From {312312312}</span>
            </div>
          </div>
          <i className="bx bx-cart-alt cart"></i>
        </div>
        <div className="box">
          <div className="right-side">
            <div className="box-topic">Total Spent</div>
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
          <div className="profile-head">
            <div className="profile-image">
              <img src={getUser().image} alt="" />
            </div>
            <div className="profile-data">
              <h3 className="username">{getUser().user_name}</h3>
              <h3 className="role">{getUser().role}</h3>
              <h3 className="email"><i className="fas fa-envelope" aria-hidden="true"></i> {getUser().email}</h3>
              <h3 className="tel"><i className="fa-solid fa-phone"></i> {getUser().tel}</h3>
              <h3 className="address"><i className="fa-solid fa-location-dot"></i> {getUser().address}</h3>
              <h3 className="city"><i className="fa-solid fa-city"></i> {getUser().city}</h3>

            </div>
            <div className="profile-actions">
            <a title="Click to Open Edit Your Profile Popup" onClick={()=>{setShowEditUser(true)}}>
                <i  className="fa-solid fa-pencil action-edit"></i>
              </a>
              <a title="Click To Delete You Account" onClick={() => deleteUser(getUser().user_id)}>
                <i className="fa-solid fa-trash action-delete"></i>
              </a>
            </div>
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
  )
}

export default User