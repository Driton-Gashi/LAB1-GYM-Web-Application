import TableItem from "../dashboard/TableItem";
import userIcon from "../../img/dashboard/user.png";
import maleIcon from "../../img/dashboard/male.png";
import femaleIcon from "../../img/dashboard/woman.png";
import subscription from "../../img/dashboard/subscription.png";
const Table = ({ users }) => {
  return (
    <>
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
                date={element.created_at}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
