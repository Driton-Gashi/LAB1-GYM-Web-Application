import swal from "sweetalert";
// import { useState, useEffect } from "react";
import "../css/dashboard.css";

import Sidebar from "../components/dashboard/Sidebar";
// import DashboardHome from "../components/dashboard/DashboardHome";
import { Outlet } from "react-router-dom";
const Dashboard = (/*{ getUser }*/) => {
  const logout = () => {
    // Clear user-related data
    swal({
      title: "Are you sure?",
      text: "You are about to Log out!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("You Logged out successfuly!", {
          icon: "success",
        });
        localStorage.removeItem("token");
        // Navigate to the login page
        window.location.reload(true);
      }
    });
  };

  // Get Users
  // const [users, setUsers] = useState([]);

  // const getUsers = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/users");
  //     const jsonData = await response.json();

  //     setUsers(jsonData);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);
  // Get Users end

  return (
    <div className="dashboard">
      <Sidebar logout={logout}/>
      {/* <DashboardHome getUser={getUser} users={users}/> */}
      <Outlet/>
    </div>
  );
};

export default Dashboard;
