import SearchBlock from '../../../blocks/SearchBlock'
import { useRouter } from 'next/router'
import {
  Wrapper,
  Content,
  Image,
  ImageLogo,
  Autor,
  AvatarWrap,
  Avatar,
  Info,
  Name,
  Title,
  About,
  Description,
  ContentItem,
  ItemText,
  ItemTitle,
  HideMobile,
  ImageMobile,
  HeadMobile,
  Close,
} from './styled'
import BackButton from '../../../ui/BackButton'
import { cyrToTranslit } from '../../../../utils/translit'
import useAuthStore from 'src/store/authStore'

const PaulOscarPage = () => {
  const router = useRouter()
  const { city } = useAuthStore(getStoreData)
  return (
    <>
      <HideMobile>
        <SearchBlock />
      </HideMobile>
      <Wrapper>
        <HideMobile>
          <BackButton
            type="Вернуться на главную"
            onlyType
            link={`/${cyrToTranslit(city)}`}
          />
        </HideMobile>
        <Content>
          <Image alt="img" src="/paul-oscar-1.jpg" />
          <HeadMobile>
            <ImageMobile alt="img" src="/paul-oscar-1.jpg" />
            <Close onClick={() => router.push(`/${cyrToTranslit(city)}`)} />
            <Autor>
              <AvatarWrap>
                <Avatar alt="avatar" src="/paul-oscar-2.jpg" />
              </AvatarWrap>
              <Info>
                <Name>Татьяна Краснова</Name>
                <About>Бренд-менеджер Paul Oscar</About>
              </Info>
            </Autor>
            <Title>Paul Oscar</Title>
          </HeadMobile>
          <HideMobile>
            <Autor>
              <AvatarWrap>
                <Avatar alt="avatar" src="/paul-oscar-2.jpg" />
              </AvatarWrap>
              <Info>
                <Name>Татьяна Краснова</Name>
                <About>Бренд-менеджер Paul Oscar</About>
              </Info>
            </Autor>
          </HideMobile>
          <HideMobile>
            <Title>Paul Oscar</Title>
          </HideMobile>
          <Description>
            “Paul Oscar – это, в первую очередь, безукоризненное качество. Нашим
            основным приоритетом всегда являются высококачественные премиальные
            ингредиенты. Бренд был разработан в Великобритании, основываясь на
            лучшем опыте зарубежных коллег. Paul Oscar соединяет в себе традиции
            и инновации, что позволяет нам каждый день получать все больше
            довольных клиентов, которые разделяют наши принципы.”
          </Description>
          <ContentItem>
            <ItemTitle>Как давно вы в этом бизнесе?</ItemTitle>
            <ItemText>
              В компании я работаю уже более двух лет. За это время мы довольно
              сильно развили бренд Paul Oscar, добавили много новых продуктов и
              линеек, которые уже успели стать бестселлерами.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Расскажите о международном охвате вашего бренда
            </ItemTitle>
            <ItemText>
              На сегодняшний день продукция компании Paul Oscar продается не
              только в России – это, в первую очередь, заслуга универсальности
              линеек бренда и наших замечательных менеджеров. Покрывая
              внушительную часть России, Paul Oscar представлен также в Молдове,
              Украине, Великобритании, на Кипре, в Германии и во многих других
              странах мира.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Любимый продукт уходовой или декоративной косметики
            </ItemTitle>
            <ItemText>
              В бренде Paul Oscar я больше всего люблю профессиональные составы
              для ботокс-реконструкции волос Botox Sapphire, процедуры которыми
              мне делают мастера в салонах красоты. У меня осветленные,
              поврежденные волосы, а процедура ботокса волос реанимирует их
              надолго и очень эффективно. Эффекта хватает примерно на 3-4
              месяца, в это время я чувствую себя максимально уверенно и
              привлекательно.
            </ItemText>
          </ContentItem>
          <Image alt="img" src="/paul-oscar-3.jpg" />
          <ImageMobile alt="img" src="/paul-oscar-3.jpg" />
          <ContentItem>
            <ItemTitle>Расскажите о планах на ближайшее будущее</ItemTitle>
            <ItemText>
              Мы планируем двигаться только вперед, охватывать все большие
              территории и продолжать предлагать нашим клиентам продукты лучшего
              качества! А если более предметно, то, конечно, расширять наши
              линейки, ориентироваться на актуальные нужды клиента.
            </ItemText>
            <ItemText>
              Тренды постоянно меняются и бренд Paul Oscar всегда будет им
              следовать. Например, сейчас очень актуальны холодные процедуры для
              волос – техника восстановления волос без горячего утюжка. У нас
              уже есть такие продукты, но совершенствоваться можно всегда.
            </ItemText>
          </ContentItem>
          <ImageLogo alt="img" src="/paul-oscar-logo.png" />
          <ContentItem>
            <ItemTitle>Самый вдохновляющий момент в вашей карьере</ItemTitle>
            <ItemText>
              Самым вдохновляющим для меня, как для бренд-менеджера, всегда
              является выход нового продукта на рынок, а особенно, когда он
              становится любимым для аудитории.
            </ItemText>
          </ContentItem>
        </Content>
      </Wrapper>
    </>
  )
}

export default PaulOscarPage
