import UserProfile from "./UserProfile"
const YogaTrainer = ({getUser}) => {
  return (
    <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard-title">Yoga Trainer</span>
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
             
            </ul>
            <ul className="details">
              <li className="topic">Email</li>

              
            </ul>
            <ul className="details">
              <li className="topic">Role</li>
             
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
              
            </ul>
            <ul className="details">
              <li className="topic">Actions</li>
              
            </ul>
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
  )
}

export default YogaTrainer