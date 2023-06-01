import { useState } from "react";
import swal from "sweetalert";
const TableItem = ({ username, email, role, date, id }) => {
  const newDate = new Date(date);
  const [disapear, setDisapear] = useState(false);
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Perform any additional actions or UI updates as needed
        console.log("success");
      } else {
        // Handle the error and display an error message to the user
        console.log("error");
      }
    } catch (error) {
      swal({
        title: "Error",
        text: error,
        icon: "error",
        timer: 3000,
        button: false,
      });
      // Handle any network errors or other exceptions
    }
  };
  return (
    <div className={`item1 ${disapear ? "disapear hide" : ""}`}>
      <h3 className="t-op-nextlvl">{username}</h3>
      <h3 className="t-op-nextlvl">{email}</h3>
      <h3 className="t-op-nextlvl">{role}</h3>
      <h3 className="t-op-nextlvl label-tag">{`${newDate.getDay()}-${newDate.getMonth()}-${newDate.getFullYear()}`}</h3>
      <h3 className="t-op-nextlvl">
        <button className="editBtn">Edit</button>
        <button
          className="deleteBtn"
          onClick={() => {
            swal(
              {
                title: "Are you sure?",
                text: "This user will be deleted!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false,
              },
              function () {
                swal(
                  "Deleted!",
                  "This user was deleted successfuly.",
                  "success"
                );
                deleteUser(id);
                setDisapear(true);
              }
            );
          }}
        >
          Delete
        </button>
      </h3>
    </div>
  );
};

export default TableItem;
