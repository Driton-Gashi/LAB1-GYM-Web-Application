
import { useState, useEffect } from "react";
import UserProfile from "./UserProfile"
const Crud1 = ({getUser}) => {
  const [name, setName] = useState('');
  const [clubId, setClubId] = useState(0);
  const [message, setMessage] = useState('');
  const [popup, setPopup] = useState({
    isOpen: false,
  });

  const handleDelete = async () => {
   if(confirm("are you sure you want to delete")){
    try {
      const response = await fetch(`http://localhost:5000/deleteclub/${clubId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        alert("deleted successfully");
        window.location.reload(true);
      } else {
        const errorData = await response.json();
        console.error(`Error deleting club: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error deleting club:', error);
    }
   }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/editclub/${clubId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        setMessage('Club name updated successfully.');
        window.location.reload(true);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error editing club:', error);
      setMessage('An error occurred while editing the club name.');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createclub', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Club "${data.name}" created with ID ${data.id}`);
        setName(''); // Clear the input field
        window.location.reload(true);
        
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while creating the club.');
    }
  };

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await fetch('http://localhost:5000/getclubs'); // Assuming your Express API is running on the same server

        if (response.ok) {
          const data = await response.json();
          setClubs(data);
        } else {
          console.error('Error fetching clubs:', response.statusText);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setLoading(false);
      }
    }

    fetchClubs();
  }, []);

  return (
    <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard-title">CRUD 1</span>
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
          <div className="title"><i className="fa-solid fa-user"></i> CRUD 1</div>
          <div className="publisher-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form_row_wrapper">
            <div className="form_row">
            <h2>Club Name</h2>
            <input
              className="username"
              type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
            />
          </div>
            </div>
          {message}
          <div className="form_row profile_footer">
            <button className="publisher-submit">New Club</button>
          </div>
        </form>
          </div>
        </div>
        <div className="top-sales box">
          <div className="title">All Clubs</div>
          {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="top-sales-details">
          {clubs.map((club,index) => (
            <li style={{cursor:"pointer"}}  key={index} onClick={()=>{setPopup({
              isOpen: true,
              clubId:club.id,
            });setClubId(club.id);setName(club.name)}}>{club.name}</li>
          ))}
        </ul>
      )}
        </div>
      </div>
    </div>
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
            
          <i
            onClick={handleDelete}
            className="fa-solid fa-trash popupDelete"
          ></i>
            <form onSubmit={handleEdit}>
            <div className="form_row_wrapper">
            <div className="form_row">
            <h2>Edit club name</h2>
            <input
              className="username"
              type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
            />
          </div>
            </div>
          {message}
          <div className="form_row profile_footer">
            <button className="publisher-submit">Edit Club</button>
          </div>
        </form>
          </div>
        </div>
      )}
  </section>
  )
}

export default Crud1