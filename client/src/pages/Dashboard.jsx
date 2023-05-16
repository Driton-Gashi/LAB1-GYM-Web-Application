import "../css/dashboard.css";
import { useState } from "react";
const Dashboard = () => {
  const [navClass, setNavClass] = useState("");

  const toggleMenu = () => {
    navClass == "navclose" ? setNavClass("") : setNavClass("navclose");
  };
  return (
    <>
      <div className="header">
        <div className="logosec">
          <div className="logo">GeeksForGeeks</div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182541/Untitled-design-(30).png"
            className="icn menuicn"
            id="menuicn"
            onClick={toggleMenu}
          />
        </div>

        <div className="searchbar">
          <input type="text" placeholder="Search" />
          <div className="searchbtn">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180758/Untitled-design-(28).png"
              className="icn srchicn"
              alt="search-icon"
            />
          </div>
        </div>

        <div className="message">
          <div className="circle"></div>
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/8.png"
            className="icn"
            alt=""
          />

          <div className="dp">
            <img
              src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
              className="dpicn"
              alt=""
            />
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className={"navcontainer " + navClass}>
          <nav className="nav">
            <div className="nav-upper-options">
              <div className="nav-option option1">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210182148/Untitled-design-(29).png"
                  className="nav-img"
                  alt=""
                />
                <h3> Dashboard</h3>
              </div>

              <div className="option2 nav-option">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183322/9.png"
                  className="nav-img"
                  alt=""
                />
                <h3> Articles</h3>
              </div>

              <div className="nav-option option3">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183320/5.png"
                  className="nav-img"
                  alt=""
                />
                <h3> Report</h3>
              </div>

              <div className="nav-option option4">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/6.png"
                  className="nav-img"
                  alt=""
                />
                <h3> Institution</h3>
              </div>

              <div className="nav-option option5">
                <img
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183323/10.png"
                  className="nav-img"
                  alt=""
                />

                <h3> Profile</h3>
              </div>

              <div className="nav-option option6">
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
                <h2 className="topic-heading">60.5k</h2>
                <h2 className="topic">Article Views</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(31).png"
                alt=""
              />
            </div>

            <div className="box box2">
              <div className="text">
                <h2 className="topic-heading">150</h2>
                <h2 className="topic">Likes</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185030/14.png"
                alt=""
              />
            </div>

            <div className="box box3">
              <div className="text">
                <h2 className="topic-heading">320</h2>
                <h2 className="topic">Comments</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210184645/Untitled-design-(32).png"
                alt=""
              />
            </div>

            <div className="box box4">
              <div className="text">
                <h2 className="topic-heading">70</h2>
                <h2 className="topic">Published</h2>
              </div>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20221210185029/13.png"
                alt=""
              />
            </div>
          </div>

          <div className="report-container">
            <div className="report-header">
              <h1 className="recent-Articles">Recent Articles</h1>
              <button className="view">View All</button>
            </div>

            <div className="report-body">
              <div className="report-topic-heading">
                <h3 className="t-op">Article</h3>
                <h3 className="t-op">Views</h3>
                <h3 className="t-op">Comments</h3>
                <h3 className="t-op">Status</h3>
              </div>

              <div className="items">
                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 73</h3>
                  <h3 className="t-op-nextlvl">2.9k</h3>
                  <h3 className="t-op-nextlvl">210</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 72</h3>
                  <h3 className="t-op-nextlvl">1.5k</h3>
                  <h3 className="t-op-nextlvl">360</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 71</h3>
                  <h3 className="t-op-nextlvl">1.1k</h3>
                  <h3 className="t-op-nextlvl">150</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 70</h3>
                  <h3 className="t-op-nextlvl">1.2k</h3>
                  <h3 className="t-op-nextlvl">420</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 69</h3>
                  <h3 className="t-op-nextlvl">2.6k</h3>
                  <h3 className="t-op-nextlvl">190</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 68</h3>
                  <h3 className="t-op-nextlvl">1.9k</h3>
                  <h3 className="t-op-nextlvl">390</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 67</h3>
                  <h3 className="t-op-nextlvl">1.2k</h3>
                  <h3 className="t-op-nextlvl">580</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 66</h3>
                  <h3 className="t-op-nextlvl">3.6k</h3>
                  <h3 className="t-op-nextlvl">160</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>

                <div className="item1">
                  <h3 className="t-op-nextlvl">Article 65</h3>
                  <h3 className="t-op-nextlvl">1.3k</h3>
                  <h3 className="t-op-nextlvl">220</h3>
                  <h3 className="t-op-nextlvl label-tag">Published</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
