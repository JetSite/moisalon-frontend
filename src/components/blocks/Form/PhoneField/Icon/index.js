import styled from "styled-components";

const Svg = styled.svg`
  width: 28px;
  height: 28px;
  position: absolute;
  pointer-events: none;
  left: 0;
`;

const Icon = ({ type, children }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      className={"icon"}
    >
      <g
        fill="none"
        fillRule="evenodd"
        stroke="none"
        strokeWidth="1"
        transform="translate(-827 -4185) translate(157 1496) translate(0 2589) translate(462 81) translate(208 19)"
      >
        <circle
          id="Oval"
          fill="#818181"
          cx="14"
          cy="14"
          r="14"
          className={`icon--${type}`}
        />
        {children}
      </g>
    </Svg>
  );
};

export default Icon;
