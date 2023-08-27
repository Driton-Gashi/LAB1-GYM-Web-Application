import { useState } from "react";
import swal from "sweetalert";

const AddUser = ({show,setshow}) => {

  const [name, setname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const handleRegisterNewUser = async (event) => {
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
    if (password.length == "") {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is Empty",
        icon: "error",
        timer: 3000,
        button: false,
      });
      return false;
    }
    if (password.length < 6) {
      swal({
        title: "Oops, Something went wrong",
        text: "Password is to short, should be at least 6 characters!",
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

    const response = await fetch("http://localhost:5000/registernewuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    if (response.ok) {

      // const data = await response.json();

      swal({
        title: "Congrats",
        text: "User was registered successfuly!",
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
    }
  };

  return (
    <div className={`addUser-wrapper ${show?"":"hide"}`}>
        <i onClick={()=>{setshow(false)}} className="fa-solid fa-circle-xmark closeForm"></i>

        <h2>Add New User</h2>
        <form className='addUser' onSubmit={handleRegisterNewUser}>
           <div className="input-wrapper">
            <h4>Username</h4>
            <input type="text" name="" id="" className="username" placeholder="Username" value={name} onChange={(e) => setname(e.target.value.toLowerCase())} />
           </div>
           <div className="input-wrapper">
           <h4>Email</h4>

            <input type="email" name="" id="" className="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value.toLowerCase())} />
           </div>
           <div className="input-wrapper">
           <h4>Password</h4>

            <input type="password" name="" id="" className="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
           </div>
           <div className="input-wrapper">
           <h4>Role</h4>
           <select onChange={(e) => setRole(e.target.value)} className="roleInput" name="" id="">
            <option value="">choose role</option>
            <option value="user">User</option>
            <option value="publisher">Publisher</option>
            <option value="gymtrainer">GYM trainer</option>
            <option value="yogatrainer">Yoga Trainer</option>
            <option value="Admin">Admin</option>
          </select>
           </div>
           <div className="input-wrapper">
            <button>Create</button>
           </div>
        </form>
    </div>
  )
}

export default AddUser