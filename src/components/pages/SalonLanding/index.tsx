import useAuthStore from 'src/store/authStore'
import Footer from '../../blocks/Footer'
import Advantages from './components/Advantages'
import Header from './components/Header'
import Line from './components/Line'
import Login from './components/Login'
import RegInvite from './components/RegInvite'
import Rent from './components/Rent'
import SalonLandingSalonsSlider from './components/SalonLandingSalonsSlider'
import { getStoreData } from 'src/store/utils'

const SalonLanding = () => {
  const { me } = useAuthStore(getStoreData)
  const redirectLink = me?.info ? '/createLessorSalon' : '/login'

  return (
    <>
      <Header redirectLink={redirectLink} />
      <RegInvite redirectLink={redirectLink} />
      <Advantages redirectLink={redirectLink} />
      <Line
        text="Новый формат работы преображает бизнес от и до."
        border="#fff"
        bg="#000"
        length="1300"
      />
      <Rent redirectLink={redirectLink} />
      <SalonLandingSalonsSlider />
      <Line
        text="14000+ МАСТЕРОВ ИЩУТ РАБОЧЕЕ МЕСТО ЕЖЕМЕСЯЧНО."
        border="#fff"
        bg="#000"
        length="1260"
      />
      <Login />
      <Footer />
    </>
  )
}

export default SalonLanding
