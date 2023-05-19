import React from "react";

const TableItem = ({ username, email, role, date }) => {
  const newDate = new Date(date);
  return (
    <div className="item1">
      <h3 className="t-op-nextlvl">{username}</h3>
      <h3 className="t-op-nextlvl">{email}</h3>
      <h3 className="t-op-nextlvl">{role}</h3>
      <h3 className="t-op-nextlvl label-tag">{`${newDate.getDay()}-${newDate.getMonth()}-${newDate.getFullYear()}`}</h3>
      <h3 className="t-op-nextlvl">
        <button className="editBtn">Edit</button>
        <button className="deleteBtn">Delete</button>
      </h3>
    </div>
  );
};

export default TableItem;
