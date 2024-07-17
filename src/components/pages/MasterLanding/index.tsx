import { Wrapper } from './styles'
import Footer from '../../blocks/Footer'
import Main from './components/Main'
import FastSearch from './components/FastSearch'
import WithPlatform from './components/WithPlatform'
import SalonsLandingSlider from './components/SalonsLandingSlider'
import Login from './components/Login'

const MasterLanding = () => {
  return (
    <Wrapper>
      <Main />
      <FastSearch />
      <WithPlatform />
      <SalonsLandingSlider />
      <Login />
      <Footer />
    </Wrapper>
  )
}

export default MasterLanding
