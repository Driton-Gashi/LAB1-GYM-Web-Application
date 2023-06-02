import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router";
import "../css/dashboard.css";

import userIcon from "../img/dashboard/user.png";
import maleIcon from "../img/dashboard/male.png";
import femaleIcon from "../img/dashboard/woman.png";
import subscription from "../img/dashboard/subscription.png";

import dashboardIcon from "../img/dashboard-icon.png";
import TableItem from "../components/dashboard/TableItem";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ getRole }) => {
  const role = getRole;
  const [users, setUsers] = useState([]);
  if (role !== "admin") {
    useNavigate("/");
  }
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/users");
      const jsonData = await response.json();
      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="navcontainer">
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option option1">
                <img src={dashboardIcon} className="nav-img" alt="" />
                <h3> Dashboard</h3>
              </div>
              <div className="nav-option option1">
                <img src={userIcon} className="nav-img" alt="" />
                <h3>Users</h3>
              </div>
              <div className="nav-option option2">
                <img src={userIcon} className="nav-img" alt="" />
                <h3> Profile</h3>
              </div>

              <div className="nav-option option3">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/4.png"
                  className="nav-img"
                  alt=""
                />
                <h3> Settings</h3>
              </div>

              <div className="nav-option logout">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                  className="nav-img"
                  alt=""
                />
                <h3>Logout</h3>
              </div>
            </div>
          </nav>
        </div>
        <div className="main">
          <div className="searchbar2">
            <input type="text" placeholder="Search" />

            <div className="searchbtn">
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
                className="icn srchicn"
                alt=""
              />
            </div>
          </div>

          <div className="box-container">
            <div className="box box1">
              <div className="text">
                <h2 className="topic-heading">{users.length}</h2>
                <h2 className="topic">Users</h2>
              </div>
              <img src={userIcon} alt="" />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">10</h2>
                <h2 className="topic">Males</h2>
              </div>
              <img src={maleIcon} alt="" />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">5</h2>
                <h2 className="topic">Females</h2>
              </div>
              <img src={femaleIcon} alt="" />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">7</h2>
                <h2 className="topic">Subscription</h2>
              </div>
              <img src={subscription} alt="" />
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">All Users</h1>
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">Username</h3>
                <h3 className="t-op">Email</h3>
                <h3 className="t-op">Role</h3>
                <h3 className="t-op">Register Date</h3>
                <h3 className="t-op">Manage</h3>
              </div>

              <div className="items">
                {users.map((element) => (
                  // %PUBLIC_URL% shortcut for public
                  <TableItem
                    key={element.user_id}
                    id={element.user_id}
                    username={element.user_name}
                    email={element.email}
                    role={element.role}
                    date={element.created_date}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
