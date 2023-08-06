import "../css/olddashboard.css";
import { useState, useEffect } from "react";
import swal from "sweetalert";
import userIcon from "../img/dashboard/user.png";
import publisherIcon from "../img/dashboard/publishing.png";
import trainerIcon from "../img/dashboard/coach.png";
import dashboardIcon from "../img/dashboard-icon.png";
import allUsers from "../img/dashboard/dashboard.png";
import logoutImg from "../img/dashboard/log-out.png";
import Table from "../components/dashboard/Table";
import Profile from "../components/dashboard/Profile";
import TrainerDashboard from "../components/dashboard/TrainerDashboard";
import Publisher from "../components/dashboard/Publisher";
const OldDashboard = ({ getUser }) => {
  const user = getUser();
  const [users, setUsers] = useState([]);
  const [dashboardPage, setDashboardPage] = useState(
    user.role == "admin"
      ? "users"
      : user.role == "trainer"
      ? "trainer"
      : user.role == "publisher"
      ? "publisher"
      : user.role == "user"
      ? "profile"
      : ""
  );

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
              {user.role == "admin" ? (
                <div
                  onClick={() => {
                    setDashboardPage("users");
                  }}
                  className={`nav-option ${
                    dashboardPage == "users" ? "option1" : ""
                  }`}
                >
                  <img src={allUsers} className="nav-img" alt="" />
                  <h3>All Users</h3>
                </div>
              ) : (
                ""
              )}
              <div
                onClick={() => {
                  setDashboardPage("profile");
                }}
                className={`nav-option ${
                  dashboardPage == "profile" ? "option1" : ""
                }`}
              >
                <img src={userIcon} className="nav-img" alt="" />
                <h3> Profile</h3>
              </div>

              {user.role == "admin" ? (
                <div
                  onClick={() => {
                    setDashboardPage("trainer");
                  }}
                  className={`nav-option ${
                    dashboardPage == "trainer" ? "option1" : ""
                  }`}
                >
                  <img src={trainerIcon} className="nav-img" alt="" />

                  <h3> Trainer</h3>
                </div>
              ) : user.role == "trainer" ? (
                <div
                  onClick={() => {
                    setDashboardPage("trainer");
                  }}
                  className={`nav-option ${
                    dashboardPage == "trainer" ? "option1" : ""
                  }`}
                >
                  <img src={trainerIcon} className="nav-img" alt="" />

                  <h3> Trainer</h3>
                </div>
              ) : (
                ""
              )}

              {user.role == "admin" ? (
                <div
                  onClick={() => {
                    setDashboardPage("publisher");
                  }}
                  className={`nav-option ${
                    dashboardPage == "publisher" ? "option1" : ""
                  }`}
                >
                  <img src={publisherIcon} className="nav-img" alt="" />

                  <h3> Publisher</h3>
                </div>
              ) : user.role == "publisher" ? (
                <div
                  onClick={() => {
                    setDashboardPage("publisher");
                  }}
                  className={`nav-option ${
                    dashboardPage == "publisher" ? "option1" : ""
                  }`}
                >
                  <img src={publisherIcon} className="nav-img" alt="" />

                  <h3> Publisher</h3>
                </div>
              ) : (
                ""
              )}

              <div onClick={logout} className="nav-option logout">
                <img src={logoutImg} className="nav-img" alt="" />
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

          {dashboardPage == "users" ? (
            <Table getUser={getUser} users={users} />
          ) : dashboardPage == "profile" ? (
            <Profile getUser={getUser} />
          ) : dashboardPage == "trainer" ? (
            <TrainerDashboard getUser={getUser} />
          ) : dashboardPage == "publisher" ? (
            <Publisher getUser={getUser} />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default OldDashboard;
