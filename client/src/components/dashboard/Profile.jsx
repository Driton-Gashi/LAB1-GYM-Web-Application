import swal from "sweetalert";
import { useState } from "react";
const Profile = ({ getUser }) => {
  const user = getUser();
  const [name, setname] = useState(user.user_name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [tel, setTel] = useState(user.tel);
  const [city, setCity] = useState(user.city);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (email == user.email) {
      try {
        const response = await fetch(
          `http://localhost:5000/userProfileEmail/${user.user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: name,
              address: address,
              tel: tel,
              city: city,
            }),
          }
        );

        if (response.ok) {
          swal({
            title: "Success",
            text: "You successfully updated your profile",
            icon: "success",
            timer: 3000,
            button: false,
          });
        } else if (response.status === 400) {
          const { message } = await response.json();
          swal({
            title: "Oops something went wrong!",
            text: message,
            icon: "error",
          });
        } else {
          swal({
            title: "Error",
            text: "Failed to update your profile",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred while updating your profile",
          icon: "error",
          timer: 3000,
          button: false,
        });
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(
          `http://localhost:5000/userProfile/${user.user_id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: name,
              email: email,
              address: address,
              tel: tel,
              city: city,
            }),
          }
        );

        if (response.ok) {
          swal({
            title: "Success",
            text: "You successfully updated your profile",
            icon: "success",
            timer: 3000,
            button: false,
          });
        } else if (response.status === 400) {
          const { message } = await response.json();
          swal({
            title: "Oops something went wrong!",
            text: message,
            icon: "error",
          });
        } else {
          swal({
            title: "Error",
            text: "Failed to update your profile",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
      } catch (error) {
        swal({
          title: "Error",
          text: "An error occurred while updating your profile",
          icon: "error",
          timer: 3000,
          button: false,
        });
        console.log(error);
      }
    }
  };
  return (
    <div className="profile">
      <div className="profile_header">
        <h1>Profile</h1> <img src={user.image} alt="" />
      </div>
      <div className="profile_body">
        <form onSubmit={submitHandler}>
          <div className="form_row">
            <h2>Username</h2>
            <input
              type="text"
              className="username"
              placeholder="Username"
              value={name}
              onChange={(e) => setname(e.target.value.toLowerCase())}
            />
          </div>
          <div className="form_row">
            <h2>Email</h2>
            <input
              type="email"
              className="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
          </div>
          <div className="form_row">
            <h2>Address</h2>
            <input
              type="text"
              className="address"
              placeholder="Address"
              value={address !== null ? address : ""}
              onChange={(e) => setAddress(e.target.value.toLowerCase())}
            />
          </div>
          <div className="form_row">
            <h2>Tel</h2>
            <input
              type="text"
              className="tel"
              placeholder="(+383) 44 *** ***"
              value={tel == null ? "" : tel}
              onChange={(e) => setTel(e.target.value.toLowerCase())}
            />
          </div>
          <div className="form_row">
            <h2>City</h2>
            <select
              onChange={(e) => setCity(e.target.value.toLowerCase())}
              className="city"
            >
              {city == null ? (
                <option value="">Choose a City</option>
              ) : (
                <option value={city}>{city}</option>
              )}
              <option value="peja">Peja</option>
              <option value="prishtina">Prishtina</option>
              <option value="prizren">Prizren</option>
              <option value="gjakova">Gjakova</option>
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
