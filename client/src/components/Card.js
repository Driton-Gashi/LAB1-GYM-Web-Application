import React from "react";

const card = ({ background, difficulty, title }) => {
  return (
    <div
      className="secondSection__card"
      style={{ background: "url(" + background + ")" }}
    >
      <div className="card__difficulty">{difficulty}</div>
      <div className="card__title">{title}</div>
    </div>
  );
};

export default card;
