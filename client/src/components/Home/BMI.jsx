import React, { useState } from "react";

export default function BMI() {
  const [bmi, setBmi] = useState();
  const [bmiDesc, setBmiDesc] = useState("");
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();

  function getW(val) {
    setWeight(val.target.value);
  }

  function getH(val) {
    setHeight(val.target.value);
  }

  function bmiCalc() {
    const bmiC = (weight / Math.pow(height, 2)) * 10000;
    setBmi(bmiC);
    if (bmiC < 18.5) {
      setBmiDesc("Under Weight");
    } else if (bmiC > 18.5 && bmiC < 24.9) {
      setBmiDesc("Normal Weight");
    } else if (bmiC > 24.9 && bmiC < 30) {
      setBmiDesc("Over Weight");
    } else {
      setBmiDesc("Obese");
    }
  }

  return (
    <div className="bmi">
      <div className="bmi-card">
        <h1>
          Lets Calculate Your <span style={{ color: "var(--blue)" }}>BMI</span>
        </h1>
        <p>
          Easily determine your body mass index with our accurate calculation
          tool.
        </p>
        <form action="" className="bmi-form">
          <input
            type="number"
            placeholder="Weight/kg"
            className="inputF"
            onChange={getW}
          />
          <input
            type="number"
            placeholder="Height/cm"
            className="inputF"
            onChange={getH}
          />
        </form>
        <div className="bmi-result">
          <p>
            Your BMI is: <span style={{ color: "var(--blue)" }}>{bmi}</span>{" "}
          </p>
          <p>
            Your weight is:{" "}
            <span style={{ color: "var(--blue)" }}>{bmiDesc}</span>{" "}
          </p>
        </div>
        <button onClick={bmiCalc}>Calculate</button>
      </div>
    </div>
  );
}
