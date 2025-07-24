import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../styles/variables'

const LoadingWrapper = styled.div`
  width: 100%;
  height: 300px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  margin: 20px 0;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  @media (max-width: ${laptopBreakpoint}) {
    height: 200px;
  }
`

const LoadingComponent = () => {
  return <LoadingWrapper />
}

export default LoadingComponent
