import { red } from '../../../../../../styles/variables'

const Search = ({ fillSearch, searchOpen }) => {
  return (
    <svg
      width="21"
      height="23"
      viewBox="0 0 21 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.4186 14L20.2894 22"
        stroke={searchOpen ? red : fillSearch}
        strokeWidth="2"
      />
      <path
        d="M15.354 8C15.354 11.8814 12.2625 15 8.48316 15C4.70381 15 1.61237 11.8814 1.61237 8C1.61237 4.11859 4.70381 1 8.48316 1C12.2625 1 15.354 4.11859 15.354 8Z"
        stroke={searchOpen ? red : fillSearch}
        strokeWidth="2"
      />
    </svg>
  )
}

export default Search
