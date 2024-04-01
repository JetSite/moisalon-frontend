import { FC } from 'react'

interface Props {
  showCitySelect?: boolean
  isAboutPage?: boolean
  color?: string
}

const CityPingIcon: FC<Props> = ({
  showCitySelect,
  isAboutPage,
  color = '#000',
}) => (
  <svg
    width="17"
    height="23"
    viewBox="0 0 17 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.0469 8.02345C15.0469 8.89589 14.6319 10.2183 13.8864 11.822C13.1587 13.3875 12.1795 15.0905 11.1874 16.6769C10.1973 18.2598 9.20559 19.7086 8.46052 20.7627C8.30285 20.9858 8.15638 21.191 8.02345 21.3758C7.89053 21.191 7.74405 20.9858 7.58639 20.7627C6.84132 19.7086 5.8496 18.2598 4.85956 16.6769C3.86737 15.0905 2.88823 13.3875 2.16047 11.822C1.41499 10.2183 1 8.89589 1 8.02345C1 4.14451 4.14451 1 8.02345 1C11.9024 1 15.0469 4.14451 15.0469 8.02345Z"
      stroke={showCitySelect ? 'red' : isAboutPage ? '#fff' : color}
      strokeWidth="2"
    />
    <circle
      cx="8.02295"
      cy="8.02332"
      r="2.00586"
      fill={showCitySelect ? 'red' : isAboutPage ? '#fff' : color}
    />
  </svg>
)

export default CityPingIcon
