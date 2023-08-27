import { useState, useEffect } from "react";
import swal from "sweetalert";

const EditUser = ({ showEditUser, setShowEditUser, id }) => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [tel, setTel] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");

  const isNumber = (x) => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return numbers.includes(x);
  }
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

  useEffect(() => {
    // Fetch user data when the component mounts
    async function fetchUserData() {
      try {
        const response = await fetch(`http://localhost:5000/getuser/${id}`);
        if (response.ok) {
          const userData = await response.json();
          const user = userData[0]; // Assuming data is an array with a single user
          // Set the state variables based on fetched user data
          setname(user.user_name);
          setEmail(user.email);
          setRole(user.role);
          setAddress(user.address ?? "");
          setTel(user.tel_number ?? "");
          setCity(user.city ?? "");
          setImage(user.image);
        } else {
          // Handle the case where user data retrieval fails
          swal({
            title: "Error",
            text: "Failed to fetch user data",
            icon: "error",
            timer: 3000,
            button: false,
          });
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        swal({
          title: "Error",
          text: "An error occurred while fetching user data",
          icon: "error",
          timer: 3000,
          button: false,
        });
        console.error(error);
      }
    }

    if (showEditUser && id) {
      fetchUserData();
    }
  }, [showEditUser, id]);

  const handleEditUser = async (event) => {
    event.preventDefault();

    if (name.length < 3 || name.length > 16) {
      if (name.length === 0) {
        swal({
          title: "Oops, Something went wrong",
          text: "Name is empty!",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return false;
      }
      if (name.length < 3) {
        swal({
          title: "Oops, Something went wrong",
          text: "Name is to short, should be at least 3 characters!",
          icon: "error",
          timer: 3000,
          button: false,
        });
        return false;
      }
    }
    if (name.length > 16) {
      swal({
        title: "Oops, Something went wrong",
        text: "Name is to Long, should  be less than 16 characters!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    if (email.includes(" ")) {
      swal({
        title: "Oops, Something went wrong",
        text: 'Email shouldn\'t contain s spaces " "',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    if (!email.includes("@")) {
      swal({
        title: "Oops, Something went wrong",
        text: '"@" is missing at Email!',
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (
      !(
        email.endsWith(".com") || // false
        email.endsWith(".net") || // true
        email.endsWith(".de") ||
        email.endsWith(".org") ||
        email.endsWith(".al")
      )
    ) {
      swal({
        title: "Oops, Something went wrong",
        text: "Email should end with Ex.: .com, .net ...",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (email.includes("ubt-uni.net")) {
      swal({
        title: "Nah bro!",
        text: "Get out of here!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    if (role.length == 0) {
      swal({
        title: "Oops, Something went wrong",
        text: "You forgot to choose a role!",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }

    // const response = await fetch("http://localhost:5000/registernewuser", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ name, email, password, role }),
    // });
    try {
      const response = await fetch(
        `http://localhost:5000/adminedituser/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            role: role,
            address: address,
            tel: tel,
            city: city,
            image: image,
          }),
        }
      );

      if (response.ok) {
        swal({
          title: "Success",
          text: "User was updated successfully",
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
          text: "Failed to update user",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "An error occurred while updating the user",
        icon: "error",
        timer: 3000,
        button: false,
      });
      console.log(error);
    }
  };

  return (
    <div
      className={`addUser-wrapper ${
        showEditUser ? "" : "hide"
      } editUserWrapper`}
    >
      <i
        onClick={() => {
          setShowEditUser(false);
        }}
        className="fa-solid fa-circle-xmark closeForm"
      ></i>

      <h2>Edit User</h2>
      <form className="addUser" onSubmit={handleEditUser}>
        <div className="input-wrapper">
          <h4>Username</h4>
          <input
            type="text"
            className="username"
            placeholder="Username"
            value={name}
            onChange={(e) => setname(e.target.value.toLowerCase())}
          />
        </div>
        <div className="input-wrapper">
          <h4>Email</h4>

          <input
            title="You can't change the email!"
            disabled={true}
            type="email"
            className="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
        </div>

        <div className="input-wrapper">
          <h4>Role</h4>
          <select
            onChange={(e) => setRole(e.target.value)}
            value={role}
            className="roleInput"
          >
            <option value="">choose role</option>
            <option value="user">User</option>
            <option value="publisher">Publisher</option>
            <option value="gymtrainer">GYM trainer</option>
            <option value="yogatrainer">Yoga Trainer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="input-wrapper">
          <h4>Address</h4>

          <input
            type="text"
            className="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value.toLowerCase())}
          />
        </div>
        <div className="input-wrapper">
          <h4>Phone</h4>
         
          <input
            type="text"
            className="tel"
            placeholder="04* *** ***"
            value={tel}
            onChange={(e) => {

               
              if (
                isNumber(e.nativeEvent.data) ||
                e.nativeEvent.inputType == "deleteContentBackward"
              ) {
                
                if(tel.length >= 10 && e.nativeEvent.inputType == "insertText"){
                    return;
                }else{
                setTel(e.target.value);
                }
               
              }
            }}
          />
        </div>
        <div className="input-wrapper">
          <h4>City</h4>
          <select
            onChange={(e) => {
              setCity(e.target.value.toLowerCase());
            }}
            className="city cityInput"
          >
            {city == "" ? (
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
        <div className="input-wrapper">
          <h4>Image</h4>

          <input
            type="text"
            className="tel"
            placeholder="Image Url"
            value={image}
            onChange={(e) => setImage(e.target.value.toLowerCase())}
          />
        </div>
        <div className="input-wrapper">
          <button>Edit User</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
