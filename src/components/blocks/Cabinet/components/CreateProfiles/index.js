import Link from 'next/link'
import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../styles/variables'

const Wrapper = styled.div`
  margin-top: 112px;
  width: 100%;
  @media (max-width: ${laptopBreakpoint}) {
    margin-top: 0px;
    margin-bottom: 40px;
  }
`

const WrapperItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 37px;
  padding-right: 50px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #000;
  }
  &:last-child {
    border-bottom: none;
  }
  @media (max-width: ${laptopBreakpoint}) {
    padding: 30px 0px;
  }
`

const DisabledWrapperItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  padding-left: 37px;
  padding-right: 50px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  @media (max-width: ${laptopBreakpoint}) {
    padding: 30px 0px;
  }
`

const Title = styled.p`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 16px;
  }
`

const Description = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  margin-top: 24px;
  margin-bottom: 76px;
  @media (max-width: ${laptopBreakpoint}) {
    font-size: 14px;
    margin-top: 20px;
  }
`

const Type = styled.p`
  width: 200px;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  text-transform: uppercase;
  transition: 0.3s;
  flex-shrink: 0;
  ${WrapperItem}:hover & {
    color: #fff;
  }
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    text-align: center;
  }
`

const DisabledType = styled.p`
  width: 200px;
  font-weight: 600;
  font-size: 20px;
  line-height: 25px;
  text-transform: uppercase;
  transition: 0.3s;
  flex-shrink: 0;
  color: #e2e2e2;
  @media (max-width: ${laptopBreakpoint}) {
    width: 100%;
    text-align: center;
  }
`

const Text = styled.p`
  font-size: 14px;
  line-height: 27px;
  transition: 0.3s;
  ${WrapperItem}:hover & {
    color: #fff;
  }
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const DisabledText = styled.p`
  font-size: 14px;
  line-height: 27px;
  color: #e2e2e2;
  transition: 0.3s;
  @media (max-width: ${laptopBreakpoint}) {
    display: none;
  }
`

const CreateProfiles = ({ currentMe }) => {
  return (
    <Wrapper>
      {currentMe?.master?.id ||
      currentMe?.salons?.length ||
      currentMe?.userBrands?.length ? (
        <Title>Добавить профиль на платформе</Title>
      ) : (
        <Title>Выбрать свою роль на платформе</Title>
      )}
      <Description>
        Выберите свой статус на платформе и создайте профиль (вы всегда сможете
        создать эти профили и переключаться между ними из вашего личного
        кабинета). Кто вы?
      </Description>
      {!currentMe?.master?.id ? (
        <Link href="/createMaster">
          <WrapperItem>
            <Type>мастер</Type>
            <Text>
              если вы являетесь матером индустрии красоты, эта роль для вас
            </Text>
          </WrapperItem>
        </Link>
      ) : (
        <DisabledWrapperItem>
          <DisabledType>мастер</DisabledType>
          <DisabledText>у вас уже есть профиль мастера</DisabledText>
        </DisabledWrapperItem>
      )}
      <Link href="/createSalon">
        <WrapperItem>
          <Type>салон</Type>
          <Text>
            если вы являетесь владельцем салона или сети салонов красоты,
            выберите эту роль
          </Text>
        </WrapperItem>
      </Link>
      <Link href="/createLessorSalon">
        <WrapperItem>
          <Type>арендодатель</Type>
          <Text>
            если вы сдаёте в аренду рабочее место или кабинет, зарегистрировать
            ваше предложение можно здесь
          </Text>
        </WrapperItem>
      </Link>
      <Link href="/createBrand">
        <WrapperItem>
          <Type>бренд</Type>
          <Text>
            если вы являетесь владельцем или представителем бьюти-бренда, вам
            сюда
          </Text>
        </WrapperItem>
      </Link>
    </Wrapper>
  )
}

export default CreateProfiles
