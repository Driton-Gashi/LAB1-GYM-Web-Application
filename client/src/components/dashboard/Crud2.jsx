
import { useState, useEffect } from "react";
import UserProfile from "./UserProfile"
const Crud2 = ({getUser}) => {
  const [name, setName] = useState('');
  const [playerId, setPlayerId] = useState('');
  const [clubId, setClubId  ] = useState('');
  const [message, setMessage] = useState('');
  const [clubs, setClubs] = useState([]); 
  const [players, setPlayers] = useState([]); 
  const [popup, setPopup] = useState({
    isOpen: false,
  });
const handleDelete = async ()=>{
  if(confirm("are you sure you want to delete")){
    try {
      const response = await fetch(`http://localhost:5000/deleteplayer/${playerId}`, {
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
}
const handleEdit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch(`http://localhost:5000/editplayer/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, clubId }), // Update the name field
    });

    if (response.ok) {
      // Club name updated successfully
      setMessage('Club name updated successfully.');
      window.location.reload(true);p
    } else {
      const errorData = await response.json();
      setMessage(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error('Error editing club:', error);
    setMessage('An error occurred while editing the club name.');
  }
};
  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch('http://localhost:5000/getplayers'); // Fetch players from your Express API

        if (response.ok) {
          const data = await response.json();
          setPlayers(data);
        } else {
          console.error('Error fetching players:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    }

    fetchPlayers();
  }, []);

  useEffect(() => {
    async function fetchClubs() {
      try {
        const response = await fetch('http://localhost:5000/getclubs'); // Fetch clubs from your Express API

        if (response.ok) {
          const data = await response.json();
          setClubs(data);
        } else {
          console.error('Error fetching clubs:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    }

    fetchClubs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/createplayer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, club_id: clubId }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Player "${data.name}" created with ID ${data.id}`);
        setName('');
        setClubId('');
        window.location.reload(true);
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred while creating the player.');
    }
  };


  return (
    <section className="home-section">
    <nav>
      <div className="sidebar-button">
        <i className="bx bx-menu sidebarBtn"></i>
        <span className="dashboard-title">CRUD 2</span>
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
          <div className="title"><i className="fa-solid fa-user"></i> CRUD 2</div>
          <div className="publisher-form-wrapper">
          <form onSubmit={handleSubmit}>
            <div className="form_row_wrapper">
            <div className="form_row">
            <h2>Player Name</h2>
            <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      
          </div>
          <div className="form_row"></div>
        <select
          id="clubId"
          name="clubId"
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
          required
        >
          <option value="">Select a Club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
            </div>
          {message}
          <div className="form_row profile_footer">
            <button className="publisher-submit">new player</button>
          </div>
        </form>
          </div>
        </div>
        <div className="top-sales box">
          <div className="title">All Players</div>
          
        <ul className="top-sales-details">
          {players.map((player, index) => (
            <li style={{cursor:"pointer"}}  key={index} onClick={()=>{setPopup({
              isOpen: true,
              playerId:player.id,
            });setPlayerId(player.id);setName(player.name);setClubId(player.club_id)}}>{player.name}</li>
          ))}
        </ul>
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
            <select
          id="clubId"
          name="clubId"
          value={clubId}
          onChange={(e) => setClubId(e.target.value)}
          required
        >
          <option>Select a Club</option>
          {clubs.map((club) => (
            <option key={club.id} value={club.id}>
              {club.name}
            </option>
          ))}
        </select>
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

export default Crud2