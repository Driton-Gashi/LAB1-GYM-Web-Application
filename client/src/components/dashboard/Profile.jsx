import swal from "sweetalert";
import { useState } from "react";
const Profile = ({ getUser }) => {
  const user = getUser();
  const [name, setname] = useState(user.user_name);
  const [email, setEmail] = useState(user.email);
  const [address, setAddress] = useState(user.address);
  const [tel, setTel] = useState(user.tel);
  const [city, setCity] = useState(user.city);
  const cities = [
    {
      name: "Prishtin",
    },
    {
      name: "Prizren",
    },
    {
      name: "Ferizaj",
    },
    {
      name: "Pejë",
    },
    {
      name: "Gjakovë",
    },
    {
      name: "Gjilan",
    },
    {
      name: "Mitrovicë",
    },
    {
      name: "Podujev",
    },
    {
      name: "Vushtrri",
    },
    {
      name: "Suharekë",
    },
    {
      name: "Rahovec",
    },
    {
      name: "Drenas",
    },
    {
      name: "Lipjan",
    },
    {
      name: "Malishevë",
    },
    {
      name: "Kamenicë",
    },
    {
      name: "Viti",
    },
    {
      name: "Deçan",
    },
    {
      name: "Istog",
    },
    {
      name: "Klinë",
    },
    {
      name: "Skenderaj",
    },
    {
      name: "Dragash",
    },
    {
      name: "Fushë Kosovë",
    },
    {
      name: "Kaçanik",
    },
    {
      name: "Shtime",
    },
    {
      name: "Obiliq",
    },
    {
      name: "Leposaviq",
    },
    {
      name: "Graçanicë",
    },
    {
      name: "Han",
    },
    {
      name: "Zveçan",
    },
    {
      name: "Shtërpcë",
    },
    {
      name: "Novobërdë",
    },
    {
      name: "Zubin",
    },
    {
      name: "Junik",
    },
    {
      name: "Mamush",
    },
    {
      name: "Ranillug",
    },
    {
      name: "Kllokot",
    },
    {
      name: "Partesh",
    },
  ];
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

  const [isChangeProfileActive, setisChangeProfileActive] = useState(false);
  // Change profile Image
  const handleFileChange = async (event) => {
    const selectedImage = event.target.files[0];

    if (!selectedImage) {
      console.log("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded successfully:", data.imageUrl);
      } else {
        console.log("Error uploading image:", response.statusText);
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <div className="profile">
      <div
        className={`uploadFileWrapper ${isChangeProfileActive ? "" : "hide"}`}
      >
        <i
          onClick={() => {
            setisChangeProfileActive((prevSate) => !prevSate);
          }}
          className="fas fa-times closeProfile"
        ></i>
        <input type="file" onChange={handleFileChange} />
      </div>
      <div className="profile_header">
        <h1>Profile</h1>
        <img
          onClick={() => {
            setisChangeProfileActive((prevSate) => !prevSate);
          }}
          src={user.image}
          alt=""
        />
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
              {cities.map((city, index) => (
                <option key={index} value={city.name.toLowerCase()}>
                  {city.name}
                </option>
              ))}
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
