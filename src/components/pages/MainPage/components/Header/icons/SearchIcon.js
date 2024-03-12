const SearchIcon = ({ fill = "#000", searchIconClickHandler }) => (
  <svg
    width="21"
    height="23"
    viewBox="0 0 21 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    id="searchSvg"
    onClick={searchIconClickHandler}
  >
    <path
      d="M11.8062 14L19.6769 22"
      stroke={fill}
      strokeWidth="2"
      id="searchIconPath1"
    />
    <path
      d="M14.7416 8C14.7416 11.8814 11.6501 15 7.87079 15C4.09145 15 1 11.8814 1 8C1 4.11859 4.09145 1 7.87079 1C11.6501 1 14.7416 4.11859 14.7416 8Z"
      stroke={fill}
      strokeWidth="2"
      id="searchIconPath2"
    />
  </svg>
);

export default SearchIcon;
