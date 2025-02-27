import { red } from '../../../../../../styles/variables'

const Icon = ({ active }) => {
  return (
    <svg
      width="24"
      height="20"
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.2117 9.8064L2.07305 8.64827L0.297552 1.37217C0.0608196 0.440629 1.21489 -0.289498 2.19141 0.11333L23.231 8.97556C24.2372 9.40357 24.2372 10.6121 23.231 11.0149L2.19141 19.8771C1.1853 20.3051 0.0608196 19.5498 0.297552 18.6183L2.07305 11.3422L15.2117 10.184C15.5668 10.184 15.5668 9.83157 15.2117 9.8064Z"
        fill={active ? red : '#DCDCDC'}
      />
    </svg>
  )
}

export default Icon
