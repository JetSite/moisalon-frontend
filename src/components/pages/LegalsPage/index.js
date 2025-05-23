import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import MainLayout from "../../../layouts/MainLayout";
import { withStyles } from "@mui/styles";
import { Tab, Typography } from "@mui/material";
import { MainContainer } from "../../../styles/common";
import {
  Title,
  TabsWrapper,
  TabsStyled,
  ContentWrapper,
  Term,
  Description,
  TabTitle,
} from "./styles";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      style={{ fontWeight: 500 }}
      component="dl"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </Typography>
  );
};

const LegalTab = withStyles((theme) => ({
  root: {
    overflow: "visible",
    textTransform: "none",
    maxWidth: "none",
    minWidth: "auto",
    padding: 0,
    fontWeight: theme.typography.fontWeightMedium,
    marginRight: theme.spacing(3),
    fontSize: theme.typography.pxToRem(15),
    lineHeight: 1.2,
    textAlign: "left",
    opacity: 1,
    [theme.breakpoints.up("lg")]: {
      fontSize: theme.typography.pxToRem(16),
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const LegalsPage = () => {
  const [value, setValue] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (router.query.tab === "policy") {
      setValue(1);
    }
  }, [router]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <MainLayout>
      <MainContainer>
        <Title>Юридическая информация</Title>
      </MainContainer>
      <TabsWrapper>
        <TabsStyled
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
        >
          <LegalTab
            className="legals__tabs-item"
            label="Пользовательское соглашение&nbsp;сервиса"
            {...a11yProps(0)}
          />
          <LegalTab
            className="legals__tabs-item"
            label="Политика конфиденциальности&nbsp;сервиса"
            {...a11yProps(1)}
          />
        </TabsStyled>
      </TabsWrapper>
      <MainContainer>
        <ContentWrapper>
          <TabPanel value={value} index={0}>
            <Term>1. Общие условия</Term>
            <Description>
              <p>
                1.1. Использование материалов и&nbsp;сервисов сайта регулируется
                нормами действующего законодательства Российской Федерации.
              </p>
              <p>
                1.2. Настоящее соглашение является публичной офертой. Получая
                доступ к&nbsp;материалам сайта, пользователь считается
                присоединившимся к&nbsp;настоящему соглашению.
              </p>
              <p>
                1.3. Администрация сайта вправе в&nbsp;любое время
                в&nbsp;одностороннем порядке изменять условия настоящего
                соглашения. Такие изменения вступают в&nbsp;силу
                по&nbsp;истечении трех дней с&nbsp;момента размещения новой
                версии соглашения на&nbsp;сайте. При несогласии пользователя
                с&nbsp;внесенными изменениями он&nbsp;обязан отказаться
                от&nbsp;доступа к&nbsp;сайту, прекратить использование
                материалов и&nbsp;сервисов сайта.
              </p>
            </Description>
            <Term>2. Обязательства Пользователя</Term>
            <Description>
              <p>
                2.1. Пользователь соглашается не&nbsp;предпринимать действий,
                которые могут рассматриваться как нарушающие российское
                законодательство или нормы международного права, в&nbsp;том
                числе в&nbsp;сфере интеллектуальной собственности, авторских
                и/или смежных правах, а&nbsp;также любых действий, которые
                приводят или могут привести к&nbsp;нарушению нормальной работы
                сайта и&nbsp;его сервисов.
              </p>
              <p>
                2.2. Использование материалов сайта без согласия
                правообладателей не&nbsp;допускается (ст.&nbsp;1270&nbsp;ГК РФ).
                Для правомерного использования материалов сайта необходимо
                заключение лицензионных договоров с&nbsp;правообладателями.
              </p>
              <p>
                2.3. При цитировании материалов сайта, включая охраняемые
                авторские произведения, ссылка на&nbsp;сайт обязательна
                (1.1&nbsp;ст.&nbsp;1274&nbsp;ГК РФ).
              </p>
              <p>
                2.4. Комментарии и&nbsp;иные записи пользователя на&nbsp;сайте
                не&nbsp;должны вступать в&nbsp;противоречие с&nbsp;требованиями
                законодательства Российской Федерации и&nbsp;общепринятых норм
                морали и&nbsp;нравственности.
              </p>
              <p>
                2.5. Пользователь предупрежден о&nbsp;том, что администрация
                сайта не&nbsp;несет ответственности за&nbsp;посещение
                и&nbsp;использование им&nbsp;внешних ресурсов, ссылки
                на&nbsp;которые могут содержаться на&nbsp;сайте.
              </p>
              <p>
                2.6. Пользователь согласен с&nbsp;тем, что администрация сайта
                не&nbsp;несет ответственности и&nbsp;не&nbsp;имеет перед ним
                прямых или косвенных обязательств из-за любых возможных или
                возникших потерь или убытков, связанных с&nbsp;содержанием
                сайта, регистрацией авторских прав и&nbsp;сведениями
                о&nbsp;такой регистрации; товарами или услугами, полученными
                после перехода на&nbsp;внешние ресурсы или с&nbsp;помощью иных
                контактов, в&nbsp;которые пользователь вступил, используя
                размещенную на&nbsp;сайте информацию.
              </p>
              <p>
                2.7. Пользователь принимает положение о&nbsp;том, что все
                материалы и&nbsp;сервисы сайта или любая их&nbsp;часть могут
                сопровождаться рекламой. Пользователь согласен с&nbsp;тем, что
                администрация сайта не&nbsp;несет какой-либо ответственности
                и&nbsp;не&nbsp;имеет каких-либо обязательств в&nbsp;связи
                с&nbsp;такой рекламой.
              </p>
            </Description>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabTitle>
              Политика общества с ограниченной ответственностью "МОЙ САЛОН И КО"
              в отношении обработки персональных данных
            </TabTitle>
            <Term>1. Общие положения</Term>
            <Description>
              <p>
                1.1. Настоящая Политика общества с&nbsp;ограниченной
                ответственностью &laquo;МОЙ САЛОН И&nbsp;КО&raquo;
                в&nbsp;отношении обработки персональных данных
                (далее&nbsp;&mdash; Политика) разработана во&nbsp;исполнение
                требований&nbsp;п.&nbsp;2&nbsp;ч.&nbsp;1&nbsp;ст.&nbsp;18.1
                Федерального закона от&nbsp;27.07.2006&nbsp;N 152-ФЗ
                &laquo;О&nbsp;персональных данных&raquo; (далее&nbsp;&mdash;
                Закон о&nbsp;персональных данных) в&nbsp;целях обеспечения
                защиты прав и&nbsp;свобод человека и&nbsp;гражданина при
                обработке его персональных данных, в&nbsp;том числе защиты прав
                на&nbsp;неприкосновенность частной жизни, личную и&nbsp;семейную
                тайну.
              </p>
              <p>
                1.2. Политика действует в&nbsp;отношении всех персональных
                данных, которые обрабатывает общество с&nbsp;ограниченной
                ответственностью &laquo;МОЙ САЛОН И&nbsp;КО&raquo;
                (далее&nbsp;&mdash; Оператор, ООО &laquo;МОЙ САЛОН
                И&nbsp;КО&raquo;).
              </p>
              <p>
                1.3. Политика распространяется на&nbsp;отношения в&nbsp;области
                обработки персональных данных, возникшие у&nbsp;Оператора
                как&nbsp;до, так и&nbsp;после утверждения настоящей Политики.
              </p>
              <p>
                1.4. Во&nbsp;исполнение
                требований&nbsp;ч.&nbsp;2&nbsp;ст.&nbsp;18.1 Закона
                о&nbsp;персональных данных настоящая Политика публикуется
                в&nbsp;свободном доступе
                в&nbsp;информационно-телекоммуникационной сети Интернет
                на&nbsp;сайте Оператора.
              </p>
              <p>1.5. Основные понятия, используемые в&nbsp;Политике:</p>
              <p>
                <strong>персональные данные</strong>&nbsp;&mdash; любая
                информация, относящаяся к&nbsp;прямо или косвенно определенному
                или определяемому физическому лицу (субъекту персональных
                данных);
              </p>
              <p>
                <strong>оператор персональных данных (оператор)</strong>
                &nbsp;&mdash; государственный орган, муниципальный орган,
                юридическое или физическое лицо, самостоятельно или совместно
                с&nbsp;другими лицами организующие&nbsp;и (или) осуществляющие
                обработку персональных данных, а&nbsp;также определяющие цели
                обработки персональных данных, состав персональных данных,
                подлежащих обработке, действия (операции), совершаемые
                с&nbsp;персональными данными;
              </p>
              <p>
                <strong>обработка персональных данных</strong>&nbsp;&mdash;
                любое действие (операция) или совокупность действий (операций)
                с&nbsp;персональными данными, совершаемых с&nbsp;использованием
                средств автоматизации или без их&nbsp;использования. Обработка
                персональных данных включает в&nbsp;себя в&nbsp;том числе: сбор;
                <br />
                запись;
                <br />
                систематизацию;
                <br />
                накопление;
                <br />
                хранение;
                <br />
                уточнение (обновление, изменение);
                <br />
                извлечение;
                <br />
                использование;
                <br />
                передачу (распространение, предоставление, доступ);
                <br />
                обезличивание;
                <br />
                блокирование;
                <br />
                удаление;
                <br />
                уничтожение;
              </p>
              <p>
                <strong>
                  автоматизированная обработка персональных данных
                </strong>
                &nbsp;&mdash; обработка персональных данных с&nbsp;помощью
                средств вычислительной техники;
              </p>
              <p>
                <strong>распространение персональных данных</strong>
                &nbsp;&mdash; действия, направленные на&nbsp;раскрытие
                персональных данных неопределенному кругу лиц;
              </p>
              <p>
                <strong>предоставление персональных данных</strong>
                &nbsp;&mdash; действия, направленные на&nbsp;раскрытие
                персональных данных определенному лицу или определенному кругу
                лиц;
              </p>
              <p>
                <strong>блокирование персональных данных</strong>&nbsp;&mdash;
                временное прекращение обработки персональных данных
                (за&nbsp;исключением случаев, если обработка необходима для
                уточнения персональных данных);
              </p>
              <p>
                <strong>уничтожение персональных данных</strong>&nbsp;&mdash;
                действия, в&nbsp;результате которых становится невозможным
                восстановить содержание персональных данных
                в&nbsp;информационной системе персональных данных&nbsp;и (или)
                в&nbsp;результате которых уничтожаются материальные носители
                персональных данных;
              </p>
              <p>
                <strong>обезличивание персональных данных</strong>
                &nbsp;&mdash; действия, в&nbsp;результате которых становится
                невозможным без использования дополнительной информации
                определить принадлежность персональных данных конкретному
                субъекту персональных данных;
              </p>
              <p>
                <strong>информационная система персональных данных</strong>
                &nbsp;&mdash; совокупность содержащихся в&nbsp;базах данных
                персональных данных и&nbsp;обеспечивающих их&nbsp;обработку
                информационных технологий и&nbsp;технических средств;
              </p>
              <p>
                <strong>трансграничная передача персональных данных</strong>
                &nbsp;&mdash; передача персональных данных на&nbsp;территорию
                иностранного государства органу власти иностранного государства,
                иностранному физическому лицу или иностранному юридическому
                лицу.
              </p>
              <p>1.6. Основные права и&nbsp;обязанности Оператора.</p>
              <p>1.6.1. Оператор имеет право:</p>
              <ul>
                <li>
                  самостоятельно определять состав и&nbsp;перечень мер,
                  необходимых и&nbsp;достаточных для обеспечения выполнения
                  обязанностей, предусмотренных Законом о&nbsp;персональных
                  данных и&nbsp;принятыми в&nbsp;соответствии с&nbsp;ним
                  нормативными правовыми актами, если иное не&nbsp;предусмотрено
                  Законом о&nbsp;персональных данных или другими федеральными
                  законами;
                </li>
                <li>
                  поручить обработку персональных данных другому лицу
                  с&nbsp;согласия субъекта персональных данных, если иное
                  не&nbsp;предусмотрено федеральным законом, на&nbsp;основании
                  заключаемого с&nbsp;этим лицом договора. Лицо, осуществляющее
                  обработку персональных данных по&nbsp;поручению Оператора,
                  обязано соблюдать принципы и&nbsp;правила обработки
                  персональных данных, предусмотренные Законом
                  о&nbsp;персональных данных;
                </li>
                <li>
                  в&nbsp;случае отзыва субъектом персональных данных согласия
                  на&nbsp;обработку персональных данных Оператор вправе
                  продолжить обработку персональных данных без согласия субъекта
                  персональных данных при наличии оснований, указанных
                  в&nbsp;Законе о&nbsp;персональных данных.
                </li>
              </ul>
              <p>1.6.2. Оператор обязан:</p>
              <ul>
                <li>
                  организовывать обработку персональных данных
                  в&nbsp;соответствии с&nbsp;требованиями Закона
                  о&nbsp;персональных данных;
                </li>
                <li>
                  отвечать на&nbsp;обращения и&nbsp;запросы субъектов
                  персональных данных и&nbsp;их&nbsp;законных представителей
                  в&nbsp;соответствии с&nbsp;требованиями Закона
                  о&nbsp;персональных данных;
                </li>
                <li>
                  сообщать в&nbsp;уполномоченный орган по&nbsp;защите прав
                  субъектов персональных данных (Федеральную службу
                  по&nbsp;надзору в&nbsp;сфере связи, информационных технологий
                  и&nbsp;массовых коммуникаций (Роскомнадзор)) по&nbsp;запросу
                  этого органа необходимую информацию в&nbsp;течение
                  30&nbsp;дней с&nbsp;даты получения такого запроса.
                </li>
              </ul>
              <p>
                1.7. Основные права субъекта персональных данных. Субъект
                персональных данных имеет право:
              </p>
              <ul>
                <li>
                  получать информацию, касающуюся обработки его персональных
                  данных, за&nbsp;исключением случаев, предусмотренных
                  федеральными законами. Сведения предоставляются субъекту
                  персональных данных Оператором в&nbsp;доступной форме,
                  и&nbsp;в&nbsp;них не&nbsp;должны содержаться персональные
                  данные, относящиеся к&nbsp;другим субъектам персональных
                  данных, за&nbsp;исключением случаев, когда имеются законные
                  основания для раскрытия таких персональных данных. Перечень
                  информации и&nbsp;порядок ее&nbsp;получения установлен Законом
                  о&nbsp;персональных данных;
                </li>
                <li>
                  требовать от&nbsp;оператора уточнения его персональных данных,
                  их&nbsp;блокирования или уничтожения в&nbsp;случае, если
                  персональные данные являются неполными, устаревшими,
                  неточными, незаконно полученными или не&nbsp;являются
                  необходимыми для заявленной цели обработки, а&nbsp;также
                  принимать предусмотренные законом меры по&nbsp;защите своих
                  прав;
                </li>
                <li>
                  выдвигать условие предварительного согласия при обработке
                  персональных данных в&nbsp;целях продвижения на&nbsp;рынке
                  товаров, работ и&nbsp;услуг;
                </li>
                <li>
                  обжаловать в&nbsp;Роскомнадзоре или в&nbsp;судебном порядке
                  неправомерные действия или бездействие Оператора при обработке
                  его персональных данных.
                </li>
              </ul>
              <p>
                1.8. Контроль за&nbsp;исполнением требований настоящей Политики
                осуществляется уполномоченным лицом, ответственным
                за&nbsp;организацию обработки персональных данных
                у&nbsp;Оператора.
              </p>
              <p>
                1.9. Ответственность за&nbsp;нарушение требований
                законодательства Российской Федерации и&nbsp;нормативных актов
                ООО &laquo;МОЙ САЛОН И&nbsp;КО&raquo; в&nbsp;сфере обработки
                и&nbsp;защиты персональных данных определяется
                в&nbsp;соответствии с&nbsp;законодательством Российской
                Федерации.
              </p>
            </Description>
            <Term>2. Цели сбора персональных данных</Term>
            <Description>
              <p>
                2.1. Обработка персональных данных ограничивается достижением
                конкретных, заранее определенных и&nbsp;законных целей.
                Не&nbsp;допускается обработка персональных данных, несовместимая
                с&nbsp;целями сбора персональных данных.
              </p>
              <p>
                2.2. Обработке подлежат только персональные данные, которые
                отвечают целям их&nbsp;обработки.
              </p>
              <p>
                2.3. Обработка Оператором персональных данных осуществляется
                в&nbsp;следующих целях:
              </p>
              <ul>
                <li>
                  обеспечение соблюдения Конституции Российской Федерации,
                  федеральных законов и&nbsp;иных нормативных правовых актов
                  Российской Федерации;
                </li>
                <li>
                  осуществление своей деятельности в&nbsp;соответствии
                  с&nbsp;уставом ООО &laquo;МОЙ САЛОН И&nbsp;КО&raquo;,
                  в&nbsp;том числе для исполнения договоров, заключаемых
                  обществом с&nbsp;субъектами персональных данных, далее также
                  называемыми &laquo;Пользователями&raquo;;
                </li>
              </ul>
            </Description>
            <Term>3. Правовые основания обработки персональных данных</Term>
            <Description>
              <p>
                3.1. Правовым основанием обработки персональных данных является
                совокупность нормативных правовых актов, во&nbsp;исполнение
                которых и&nbsp;в&nbsp;соответствии с&nbsp;которыми Оператор
                осуществляет обработку персональных данных, в&nbsp;том числе:
                <ul>
                  <li>Конституция Российской Федерации;</li>
                  <li>Гражданский кодекс Российской Федерации;</li>
                  <li>Трудовой кодекс Российской Федерации;</li>
                  <li>Налоговый кодекс Российской Федерации;</li>
                  <li>
                    Федеральный закон от&nbsp;08.02.1998&nbsp;N 14-ФЗ
                    &laquo;Об&nbsp;обществах с&nbsp;ограниченной
                    ответственностью&raquo;;
                  </li>
                  <li>
                    Федеральный закон от&nbsp;06.12.2011&nbsp;N 402-ФЗ
                    &laquo;О&nbsp;бухгалтерском учете&raquo;;
                  </li>
                  <li>
                    Федеральный закон от&nbsp;15.12.2001&nbsp;N 167-ФЗ
                    &laquo;Об&nbsp;обязательном пенсионном страховании
                    в&nbsp;Российской Федерации&raquo;;
                  </li>
                  <li>
                    иные нормативные правовые акты, регулирующие отношения,
                    связанные с&nbsp;деятельностью Оператора.
                  </li>
                </ul>
              </p>
              <p>
                3.2. Правовым основанием обработки персональных данных также
                являются:
                <ul>
                  <li>устав ООО &laquo;МОЙ САЛОН И&nbsp;КО&raquo;;</li>
                  <li>
                    договоры, заключаемые между Оператором и&nbsp;субъектами
                    персональных данных;
                  </li>
                  <li>
                    согласие субъектов персональных данных на&nbsp;обработку
                    их&nbsp;персональных данных.
                  </li>
                </ul>
              </p>
            </Description>
            <Term>
              4. Объем и категории обрабатываемых персональных данных, категории
              субъектов персональных данных
            </Term>
            <Description>
              <p>
                4.1. Содержание и&nbsp;объем обрабатываемых персональных данных
                должны соответствовать заявленным целям обработки,
                предусмотренным в&nbsp;разд.&nbsp;2&nbsp;настоящей Политики.
                Обрабатываемые персональные данные не&nbsp;должны быть
                избыточными по&nbsp;отношению к&nbsp;заявленным целям
                их&nbsp;обработки.
              </p>
              <p>
                4.2. Оператор может обрабатывать персональные данные следующих
                категорий субъектов персональных данных:
              </p>
              <p>4.2.1. Пользователи:</p>
              <ul>
                <li>фамилия, имя, отчество;</li>
                <li>пол;</li>
                <li>гражданство;</li>
                <li>дата и&nbsp;место рождения;</li>
                <li>место проживания;</li>
                <li>
                  другие сведения, указанные в&nbsp;документах, удостоверяющих
                  личность;
                </li>
                <li>
                  контактные данные (телефонные номера, электронные адреса
                  и&nbsp;другие идентификаторы для связи);
                </li>
                <li>
                  сведения об&nbsp;образовании, опыте работы, квалификации;
                </li>
                <li>иные персональные данные, сообщаемые пользователями.</li>
              </ul>

              <p>
                4.3. Обработка Оператором биометрических персональных данных
                (сведений, которые характеризуют физиологические
                и&nbsp;биологические особенности человека, на&nbsp;основании
                которых можно установить его личность) осуществляется
                в&nbsp;соответствии с&nbsp;законодательством Российской
                Федерации.
              </p>
              <p>
                4.4. Оператором не&nbsp;осуществляется обработка специальных
                категорий персональных данных, касающихся расовой, национальной
                принадлежности, политических взглядов, религиозных или
                философских убеждений, состояния здоровья, интимной жизни,
                за&nbsp;исключением случаев, предусмотренных
                законодательством&nbsp;РФ.
              </p>
            </Description>
            <Term>5. Порядок и условия обработки персональных данных</Term>
            <Description>
              <p>
                5.1. Обработка персональных данных осуществляется Оператором
                в&nbsp;соответствии с&nbsp;требованиями законодательства
                Российской Федерации.
              </p>
              <p>
                5.2. Обработка персональных данных осуществляется
                с&nbsp;согласия субъектов персональных данных на&nbsp;обработку
                их&nbsp;персональных данных, а&nbsp;также без такового
                в&nbsp;случаях, предусмотренных законодательством Российской
                Федерации.
              </p>
              <p>
                5.3. Оператор осуществляет как автоматизированную, так
                и&nbsp;неавтоматизированную обработку персональных данных.
              </p>
              <p>
                5.4. К&nbsp;обработке персональных данных допускаются работники
                Оператора, в&nbsp;должностные обязанности которых входит
                обработка персональных данных.
              </p>
              <p>
                5.5. Обработка персональных данных осуществляется путем:
                <ul>
                  <li>
                    получения персональных данных в&nbsp;устной
                    и&nbsp;письменной форме непосредственно от&nbsp;субъектов
                  </li>
                  <li>персональных данных;</li>
                  <li>
                    получения персональных данных из&nbsp;общедоступных
                    источников;
                  </li>
                  <li>
                    внесения персональных данных в&nbsp;журналы, реестры
                    и&nbsp;информационные системы Оператора;
                  </li>
                  <li>
                    использования иных способов обработки персональных данных.
                  </li>
                </ul>
              </p>
              <p>
                5.6. Не&nbsp;допускается раскрытие третьим лицам
                и&nbsp;распространение персональных данных без согласия субъекта
                персональных данных, если иное не&nbsp;предусмотрено федеральным
                законом.
              </p>
              <p>
                5.7. Передача персональных данных органам дознания
                и&nbsp;следствия, в&nbsp;Федеральную налоговую службу,
                Пенсионный фонд Российской Федерации, Фонд социального
                страхования и&nbsp;другие уполномоченные органы исполнительной
                власти и&nbsp;организации осуществляется в&nbsp;соответствии
                с&nbsp;требованиями законодательства Российской Федерации.
              </p>
              <p>
                5.8. Оператор принимает необходимые правовые, организационные
                и&nbsp;технические меры для защиты персональных данных
                от&nbsp;неправомерного или случайного доступа к&nbsp;ним,
                уничтожения, изменения, блокирования, распространения
                и&nbsp;других несанкционированных действий, в&nbsp;том числе:
                <ul>
                  <li>
                    определяет угрозы безопасности персональных данных при
                    их&nbsp;обработке;
                  </li>
                  <li>
                    принимает локальные нормативные акты и&nbsp;иные документы,
                    регулирующие отношения в&nbsp;сфере
                  </li>
                  <li>обработки и&nbsp;защиты персональных данных;</li>
                  <li>
                    назначает лиц, ответственных за&nbsp;обеспечение
                    безопасности персональных данных в&nbsp;структурных
                  </li>
                  <li>
                    подразделениях и&nbsp;информационных системах Оператора;
                  </li>
                  <li>
                    создает необходимые условия для работы с&nbsp;персональными
                    данными;
                  </li>
                  <li>
                    организует учет документов, содержащих персональные данные;
                  </li>
                  <li>
                    организует работу с&nbsp;информационными системами,
                    в&nbsp;которых обрабатываются персональные данные;
                  </li>
                  <li>
                    хранит персональные данные в&nbsp;условиях, при которых
                    обеспечивается их&nbsp;сохранность
                  </li>
                  <li>и&nbsp;исключается неправомерный доступ к&nbsp;ним;</li>
                  <li>
                    организует обучение работников Оператора, осуществляющих
                    обработку персональных данных.
                  </li>
                </ul>
              </p>
              <p>
                5.9. Оператор осуществляет хранение персональных данных
                в&nbsp;форме, позволяющей определить субъекта персональных
                данных, не&nbsp;дольше, чем этого требуют цели обработки
                персональных данных, если срок хранения персональных данных
                не&nbsp;установлен федеральным законом, договором.
              </p>
              <p>
                5.10. При сборе персональных данных, в&nbsp;том числе
                посредством информационно-телекоммуникационной сети Интернет,
                Оператор обеспечивает запись, систематизацию, накопление,
                хранение, уточнение (обновление, изменение), извлечение
                персональных данных граждан Российской Федерации
                с&nbsp;использованием баз данных, находящихся на&nbsp;территории
                Российской Федерации, за&nbsp;исключением случаев, указанных
                в&nbsp;Законе о&nbsp;персональных данных.
              </p>
            </Description>
            <Term>
              6. Актуализация, исправление, удаление и уничтожение персональных
              данных, ответы на запросы субъектов на доступ к персональным
              данным
            </Term>
            <Description>
              <p>
                6.1. Подтверждение факта обработки персональных данных
                Оператором, правовые основания и&nbsp;цели обработки
                персональных данных, а&nbsp;также иные сведения, указанные
                в&nbsp;ч.&nbsp;7&nbsp;ст.&nbsp;14&nbsp;Закона
                о&nbsp;персональных данных, предоставляются Оператором субъекту
                персональных данных или его представителю при обращении либо при
                получении запроса субъекта персональных данных или его
                представителя. В&nbsp;предоставляемые сведения
                не&nbsp;включаются персональные данные, относящиеся
                к&nbsp;другим субъектам персональных данных, за&nbsp;исключением
                случаев, когда имеются законные основания для раскрытия таких
                персональных данных.
              </p>
              <p>
                Запрос должен содержать:
                <ul>
                  <li>
                    номер основного документа, удостоверяющего личность субъекта
                    персональных данных или его представителя, сведения
                    о&nbsp;дате выдачи указанного документа и&nbsp;выдавшем его
                    органе;
                  </li>
                  <li>
                    сведения, подтверждающие участие субъекта персональных
                    данных в&nbsp;отношениях с&nbsp;Оператором (номер договора,
                    дата заключения договора, условное словесное
                    обозначение&nbsp;и (или) иные сведения), либо сведения, иным
                    образом подтверждающие факт обработки персональных данных
                    Оператором;
                  </li>
                  <li>
                    подпись субъекта персональных данных или его представителя.
                  </li>
                </ul>
                Запрос может быть направлен в&nbsp;форме электронного документа
                и&nbsp;подписан электронной подписью в&nbsp;соответствии
                с&nbsp;законодательством Российской Федерации.
              </p>
              <p>
                Если в&nbsp;обращении (запросе) субъекта персональных данных
                не&nbsp;отражены в&nbsp;соответствии с&nbsp;требованиями Закона
                о&nbsp;персональных данных все необходимые сведения или субъект
                не&nbsp;обладает правами доступа к&nbsp;запрашиваемой
                информации, то&nbsp;ему направляется мотивированный отказ.
              </p>
              <p>
                Право субъекта персональных данных на&nbsp;доступ к&nbsp;его
                персональным данным может быть ограничено в&nbsp;соответствии
                с&nbsp;ч.&nbsp;8&nbsp;ст.&nbsp;14&nbsp;Закона
                о&nbsp;персональных данных, в&nbsp;том числе если доступ
                субъекта персональных данных к&nbsp;его персональным данным
                нарушает права и&nbsp;законные интересы третьих лиц.
              </p>
              <p>
                6.2. В&nbsp;случае выявления неточных персональных данных при
                обращении субъекта персональных данных или его представителя
                либо по&nbsp;их&nbsp;запросу или по&nbsp;запросу Роскомнадзора
                Оператор осуществляет блокирование персональных данных,
                относящихся к&nbsp;этому субъекту персональных данных,
                с&nbsp;момента такого обращения или получения указанного запроса
                на&nbsp;период проверки, если блокирование персональных данных
                не&nbsp;нарушает права и&nbsp;законные интересы субъекта
                персональных данных или третьих лиц.
              </p>
              <p>
                В&nbsp;случае подтверждения факта неточности персональных данных
                Оператор на&nbsp;основании сведений, представленных субъектом
                персональных данных или его представителем либо Роскомнадзором,
                или иных необходимых документов уточняет персональные данные
                в&nbsp;течение семи рабочих дней со&nbsp;дня представления таких
                сведений и&nbsp;снимает блокирование персональных данных.
              </p>
              <p>
                6.3. В&nbsp;случае выявления неправомерной обработки
                персональных данных при обращении (запросе) субъекта
                персональных данных или его представителя либо Роскомнадзора
                Оператор осуществляет блокирование неправомерно обрабатываемых
                персональных данных, относящихся к&nbsp;этому субъекту
                персональных данных, с&nbsp;момента такого обращения или
                получения запроса.
              </p>
              <p>
                6.4. При достижении целей обработки персональных данных,
                а&nbsp;также в&nbsp;случае отзыва субъектом персональных данных
                согласия на&nbsp;их&nbsp;обработку персональные данные подлежат
                уничтожению, если:
                <ul>
                  <li>
                    иное не&nbsp;предусмотрено договором, стороной которого,
                    выгодоприобретателем или поручителем по&nbsp;которому
                    является субъект персональных данных;
                  </li>
                  <li>
                    Оператор не&nbsp;вправе осуществлять обработку без согласия
                    субъекта персональных данных на&nbsp;основаниях,
                    предусмотренных Законом о&nbsp;персональных данных или иными
                    федеральными законами;
                  </li>
                  <li>
                    иное не&nbsp;предусмотрено другим соглашением между
                    Оператором и&nbsp;субъектом персональных данных.
                  </li>
                </ul>
              </p>
            </Description>
          </TabPanel>
        </ContentWrapper>
      </MainContainer>
    </MainLayout>
  );
};

export default LegalsPage;
