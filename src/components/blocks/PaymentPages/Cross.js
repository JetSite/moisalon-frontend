import React from "react";
import { red } from "../../../../styles/variables";

const Cross = () => {
  return (
    <svg
      width="128"
      height="128"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7.77734 23.3346L23.3337 7.77825" stroke={red} />
      <path d="M23.334 23.3346L7.77764 7.77825" stroke={red} />
    </svg>
  );
};

export default Cross;
