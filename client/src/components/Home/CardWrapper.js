import { useState, useEffect } from "react";
import Card from "./Card";
import logo from "../../img/logo.png";

const CardWrapper = () => {
  const [programs, setPrograms] = useState([]);

  const getPrograms = async () => {
    try {
      const response = await fetch("http://localhost:5000/programs");
      const jsonData = await response.json();
      setPrograms(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getPrograms();
  }, []);

  return (
    <div className="secondSection">
      <h1 className="secondSection__title">Programs</h1>
      <div className="secondSection__cardWrapper">
        {programs.map((program) => (
          <Card
            key={program.program_id}
            title={program.program_name}
            difficulty={program.program_dificulty}
            background={program.program_image}
          />
        ))}
      </div>
    </div>
  );
};

export default CardWrapper;
