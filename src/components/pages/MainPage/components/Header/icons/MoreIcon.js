import { red } from '../../../../../../styles/variables'

const MoreIcon = ({ fill = '#000', showAdditionalNav }) => {
  return (
    <svg
      width="20"
      height="4"
      viewBox="0 0 20 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
        stroke={showAdditionalNav ? red : fill}
        strokeWidth="2"
      />
      <path
        d="M10 3C10.5523 3 11 2.55228 11 2C11 1.44772 10.5523 1 10 1C9.44772 1 9 1.44772 9 2C9 2.55228 9.44772 3 10 3Z"
        stroke={showAdditionalNav ? red : fill}
        strokeWidth="2"
      />
      <path
        d="M18 3C18.5523 3 19 2.55228 19 2C19 1.44772 18.5523 1 18 1C17.4477 1 17 1.44772 17 2C17 2.55228 17.4477 3 18 3Z"
        stroke={showAdditionalNav ? red : fill}
        strokeWidth="2"
      />
    </svg>
  )
}

export default MoreIcon
