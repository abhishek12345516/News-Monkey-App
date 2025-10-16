import React from "react";
import loading from "../Ajax-loader.gif";

const Spinner = () => {
  return (
    <div>
      <img className="rounded mx-auto d-block" src={loading} alt="Loading" />
    </div>
  );
};

export default Spinner;
