import { useState } from "react";
import swal from "sweetalert";

const TableItem = ({ getUser, username, email, role, date, id }) => {
  const user = getUser();
  const newDate = new Date(date);
  const [usernameInput, setUsernameInput] = useState(username);
  const [emailInput, setEmailInput] = useState(email);
  const [roleInput, setRoleInput] = useState(role);
  const [disapear, setDisapear] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const roleList = ["user", "admin", "trainer", "publisher"];

  const submitHandler = async (e) => {
    e.preventDefault();
    if (emailInput == email && usernameInput == username && roleInput == role) {
      setDisabled(true);
      return;
    }

    if (email == emailInput) {
      // userswithoutemail
      try {
        const response = await fetch(
          `http://localhost:5000/userswithoutemail/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: usernameInput,
              role: roleInput,
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
          setDisabled(true);
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
    } else {
      try {
        const response = await fetch(`http://localhost:5000/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: usernameInput,
            email: emailInput,
            role: roleInput,
          }),
        });

        if (response.ok) {
          swal({
            title: "Success",
            text: "User was updated successfully",
            icon: "success",
            timer: 3000,
            button: false,
          });
          setDisabled(true);
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
    }
  };

  const editMode = (e) => {
    setDisabled(!disabled);
    if (e.target.textContent == "Cancel") {
      setUsernameInput(username);
      setEmailInput(email);
      setRoleInput(role);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        swal({
          title: "Success",
          text: "User was deleted successfully",
          icon: "success",
          timer: 3000,
          button: false,
        });
        setDisapear(true);
      } else {
        swal({
          title: "Error",
          text: "Failed to delete user",
          icon: "error",
          timer: 3000,
          button: false,
        });
      }
    } catch (error) {
      swal({
        title: "Error",
        text: "An error occurred while deleting the user",
        icon: "error",
        timer: 3000,
        button: false,
      });
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className={`item1 ${disapear ? "disapear hide" : ""} ${
        user.user_id == id ? "active" : ""
      }`}
    >
      <input
        className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
        value={usernameInput}
        onChange={(e) => setUsernameInput(e.target.value.toLowerCase())}
        disabled={disabled}
      />
      <input
        className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value.toLowerCase())}
        disabled={disabled}
      />
      {user.user_id == id ? (
        <input className={`t-op-nextlvl`} value={roleInput} disabled={true} />
      ) : (
        <select
          className={`t-op-nextlvl ${disabled ? "" : "border-on"}`}
          onChange={(e) => setRoleInput(e.target.value.toLowerCase())}
          disabled={disabled}
        >
          <option value={roleInput}>{roleInput}</option>
          {roleList.map((option, index) =>
            roleInput == option ? (
              ""
            ) : (
              <option key={index} value={option}>
                {option}
              </option>
            )
          )}
        </select>
      )}

      <h3 className="t-op-nextlvl label-tag">{`${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`}</h3>

      <h3 className="t-op-nextlvl">
        {user.user_id == id ? (
          ""
        ) : (
          <div>

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
                    deleteUser(id);
                  }
                });
              }}
            >
              Delete
            </span>
          </div>
        )}
      </h3>
    </form>
  );
};

export default TableItem;
