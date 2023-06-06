import React from "react";

const Profile = ({ getUser }) => {
  const user = getUser();
  return (
    <div className="profile">
      <div className="profile_header">
        <h1>Profile</h1> <img src={user.image} alt="" />
      </div>
      <div className="profile_body">
        <form>
          <div className="form_row">
            <h2>Username</h2>
            <input
              type="text"
              className="username"
              placeholder="Username"
              value={user.user_name}
            />
          </div>
          <div className="form_row">
            <h2>Email</h2>
            <input
              type="email"
              className="email"
              placeholder="Email"
              value={user.email}
            />
          </div>
          <div className="form_row">
            <h2>Address</h2>
            <input type="text" className="address" placeholder="Address" />
          </div>
          <div className="form_row">
            <h2>Tel</h2>
            <input
              type="text"
              className="tel"
              placeholder="(+383) 44 *** ***"
              value={user}
            />
          </div>
          <div className="form_row">
            <h2>City</h2>
            <select className="city">
              <option value="Peja">Peja</option>
              <option value="Prishtina">Prishtina</option>
              <option value="Prizren">Prizren</option>
              <option value="Gjakova">Gjakova</option>
            </select>
          </div>
          <div className="form_row profile_footer">
            <div className="cancel">Cancel</div>
            <button>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
