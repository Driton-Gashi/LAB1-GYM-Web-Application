import { useState } from "react";
import swal from "sweetalert";
const TableItem = ({ username, email, role, date, id }) => {
  const newDate = new Date(date);
  const [usernameInput, setUsernameInput] = useState(username);
  const [emailInput, setEmailInput] = useState(email);
  const [roleInput, setRoleInput] = useState(role);
  const [disapear, setDisapear] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const submitHandler = (e) => {
    e.preventDefault();
    
  };

  const editMode = () => {
    setDisabled(!disabled);
  };

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
    <form
      onSubmit={submitHandler}
      className={`item1 ${disapear ? "disapear hide" : ""}`}
    >
      <input
        className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value)}
        disabled={disabled}
      />
      <input
        className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        disabled={disabled}
      />
      <input
        className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
        value={roleInput}
        onChange={(e) => setRoleInput(e.target.value)}
        disabled={disabled}
      />
      <h3 className="t-op-nextlvl label-tag">{`${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`}</h3>

      <h3 className="t-op-nextlvl">
        <span
          onClick={editMode}
          className={`editBtn ${disabled ? "" : "hide"}`}
        >
          Edit
        </span>
        <span
          className={`cancelBtn ${disabled ? "hide" : ""}`}
          onClick={editMode}
        >
          Cancel
        </span>
        <button
          type="submit"
          className={`confirmBtn ${disabled ? "hide" : ""}`}
          onClick={() => {
            console.log("confirmed!");
          }}
        >
          Confirm
        </button>
        <span
          className={`deleteBtn ${disabled ? "" : "hide"}`}
          onClick={() => {
            swal({
              title: "Are you sure?",
              text: "You are about to delete this user: " + username,
              icon: "warning",
              buttons: true,
              dangerMode: true,
            }).then((willDelete) => {
              if (willDelete) {
                swal(username + " was deleted succesfully", {
                  icon: "success",
                });
                deleteUser(id);
                setDisapear(true);
              }
            });
          }}
        >
          Delete
        </span>
      </h3>
    </form>
  );
};

export default TableItem;
