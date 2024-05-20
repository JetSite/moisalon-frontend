import SearchBlock from '../../blocks/SearchBlock'
import { useRouter } from 'next/router'
import {
  Wrapper,
  Content,
  Image,
  Autor,
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
import BackButton from '../../ui/BackButton'
import { cyrToTranslit } from '../../../utils/translit'
import { getStoreData } from 'src/store/utils'
import useAuthStore from 'src/store/authStore'

const Beauty = () => {
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
            link={`/${city.citySlug}`}
          />
        </HideMobile>
        <Content>
          <Image alt="img" src="/beauty-1.png" />
          <HeadMobile>
            <ImageMobile alt="img" src="/beauty-1-mobile.png" />
            <Close onClick={() => router.push(`/${city.citySlug}`)} />
            <Autor>
              <Avatar alt="avatar" src="/beauty-avatar.png" />
              <Info>
                <Name>Софья Могильникова</Name>
                <About>Помощник Бренд-менеджера Malecula</About>
              </Info>
            </Autor>
            <Title>Malecula</Title>
          </HeadMobile>
          <HideMobile>
            <Autor>
              <Avatar alt="avatar" src="/beauty-avatar.png" />
              <Info>
                <Name>Софья Могильникова</Name>
                <About>Помощник Бренд-менеджера Malecula</About>
              </Info>
            </Autor>
          </HideMobile>
          <HideMobile>
            <Title>Malecula</Title>
          </HideMobile>
          <Description>
            “Наш бренд назван в честь самобытного и яркого острова в Тихом
            Океане. Каждый человек уникален, он такой единственный и
            неповторимый. Наша философия заключается в том, чтобы напомнить
            людям о их индивидуальности, что ее нужно подчеркивать, а не
            скрывать. Поэтому наш брендбук наполнен яркими, неоновыми цветами,
            пестрыми сочетаниями, а также природными атрибутами – пальмы,
            тропические листья, растения острова.”
          </Description>
          <ContentItem>
            <ItemTitle>Как давно вы в этом бизнесе?</ItemTitle>
            <ItemText>
              Уже пошел второй год. И самое прекрасное, что мне все также
              нравится, как и в начале, то, что мы создаем, как растет и
              развивается бренд, как все время открываются новые горизонты. Это
              очень вдохновляет и мотивирует двигаться дальше с еще большей
              активностью и темпом.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Расскажите о международном охвате вашего бренда
            </ItemTitle>
            <ItemText>
              Для начала стоит отметить, что продукция бренда Malecula по
              большей части производится заграницей: Италия – продукция для
              окрашивания волос, Бразилия – кератин и ботокс для волос, Южная
              Корея – домашний уход.
            </ItemText>
            <ItemText>
              Поэтому в этих странах, в странах Европы, в Англии у нас
              заказывают с успехом продукцию. И мы нацелены расширять эти
              границы, так как доставка есть в любую точку мира, и наши
              менеджеры всегда готовы проконсультировать, помочь сделать заказ
              на английском языке.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Любимый продукт уходовой или декоративной косметики
            </ItemTitle>
            <ItemText>
              Я просто обожаю нашу линейку профессионального домашнего ухода
              Malecula Colour Wave. У меня прихотливые волосы и кожа головы,
              поэтому подобрать идеальный шампунь и бальзам для меня была
              многолетняя задача, которая наконец-то решена! Отличное очищение +
              мягкость и шелковистость после процедуры мытья теперь моя
              обыденность!
            </ItemText>
          </ContentItem>
          <Image alt="img" src="/beauty-2.png" />
          <ImageMobile alt="img" src="/beauty-2-mobile.png" />
          <ContentItem>
            <ItemTitle>Расскажите о планах на ближайшее будущее</ItemTitle>
            <ItemText>
              Мы сейчас стараемся покорять новые платформы! Совсем недавно наша
              продукция стала представлена в онлайн-магазине Л’Этуаль. Ожидается
              много публикаций в профессиональных изданиях, форумы, выставки.
            </ItemText>
            <ItemText>
              Весной у нас планируется InterCharm, на который мы Вас приглашаем!
              Там мы сможем пообщаться с вами вживую, можно будет задать вопросы
              технологам, и послушать мастер-классы!
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Ваши мысли по поводу "зеленого" направления бьюти-индустрии
            </ItemTitle>
            <ItemText>
              Стремление к более «чистым» и натуральным продуктам – это
              прекрасно. Люди начинают искать и разрабатывать менее вредные
              составы для здоровья и экологии, появляется перерабатываемая
              упаковка, меняется стиль ведения бизнеса, отношение к глобальным
              проблемам.
            </ItemText>
            <ItemText>
              Но из-за такой тенденции пропадает разнообразие продуктов,
              получается более однообразный стиль, многие стараются использовать
              клише ЭКО: зеленые, натуральные оттенки, более минималистичный
              стиль и т.п.
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              С какими трудностями вам приходится сталкиваться?
            </ItemTitle>
            <ItemText>
              Порой бывает очень большое кол-во заказов, выход новинок, выставки
              – в эти периоды очень много работы, сроки доставки могут быть выше
              среднего и какие-то задачи решаются не с такой оперативностью, как
              обычно. Но эти трудности мотивируют нас совершенствоваться и
              двигаться вперед!
            </ItemText>
          </ContentItem>
          <Image alt="img" src="/beauty-3.png" />
          <ContentItem>
            <ItemTitle>Самый вдохновляющий момент в вашей карьере</ItemTitle>
            <ItemText>
              Это была самая первая выставка InterСharm для меня. Там я
              посмотрела с другой стороны на то, что мы делаем. Когда мы создаем
              продукцию, представляем, тестируем как клиенты будут пользоваться
              ей, приятен ли данный аромат, насколько удобна эта упаковка в
              использовании для данного средства и т.д. Это все больше как
              теория, а тут ты на практике видишь нашу аудиторию, они
              рассказывают, что им больше нравится или наоборот и почему. Ты еще
              больше чувствуешь взаимосвязь между брендом и клиентами, это очень
              вдохновляет!
            </ItemText>
          </ContentItem>
          <ContentItem>
            <ItemTitle>
              Если бы нужно было что-то ретроспективно изменить, что это было?
            </ItemTitle>
            <ItemText>
              Думаю, ничего. Как говорят люди про свое прошлое: «Без него, я не
              был бы тем, кем являюсь сейчас». Так и здесь, у бренда были свои
              взлеты, падения, ошибки и награды, а за брендом стоят люди,
              которые работают для людей. Поэтому точно ничего. Мы сейчас имеем
              то, к чему шли, а дальше только лучше!
            </ItemText>
          </ContentItem>
        </Content>
      </Wrapper>
    </>
  )
}

export default Beauty
