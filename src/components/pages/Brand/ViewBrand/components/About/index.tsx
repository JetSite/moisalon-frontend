import React, { useState, useEffect, FC } from 'react'
import { MainContainer } from '../../../../../../styles/common'
import { textTruncate } from '../../../../../../utils/textTruncate'
import {
  AboutContainer,
  FirstContainer,
  MainDescriptionBox,
  ShowMore,
  Text,
  Title,
} from './styled'
import { IBrand } from 'src/types/brands'

interface Props {
  brand: IBrand
}

const About: FC<Props> = ({ brand }) => {
  const description = brand?.description || ''
  const history = brand?.history || ''
  const manufacture = brand?.manufacture || ''
  const [collapsed, setCollapsed] = useState(true)
  const [collapsedHistory, setCollapsedHistory] = useState(true)
  const [collapsedManufacture, setCollapsedManufacture] = useState(true)
  const collapsedDescription =
    collapsed && description ? textTruncate(description, 180) : description
  const historyShow =
    collapsedHistory && history ? textTruncate(history, 180) : history
  const manufactureShow =
    collapsedManufacture && manufacture
      ? textTruncate(manufacture, 180)
      : manufacture
  const collapsedText = collapsed ? 'Узнать больше' : 'Скрыть'
  const collapsedTextHistory = collapsedHistory ? 'Узнать больше' : 'Скрыть'
  const collapsedTextManufacture = collapsedManufacture
    ? 'Узнать больше'
    : 'Скрыть'
  useEffect(() => {
    if (description?.length > 180) {
      setCollapsed(true)
    }
    if (history?.length > 180) {
      setCollapsedHistory(true)
    }
    if (manufacture?.length > 180) {
      setCollapsedManufacture(true)
    }
  }, [])
  const handleChange = () => {
    setCollapsed(!collapsed)
  }
  const handleChangeHistory = () => {
    setCollapsedHistory(!collapsedHistory)
  }
  const handleChangeManufacture = () => {
    setCollapsedManufacture(!collapsedManufacture)
  }
  return (
    <MainContainer id="about">
      <AboutContainer>
        <FirstContainer>
          <MainDescriptionBox>
            {description ? (
              collapsed ? (
                <Text
                  dangerouslySetInnerHTML={{
                    __html: collapsedDescription,
                  }}
                />
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
              )
            ) : (
              'Нет описания'
            )}
          </MainDescriptionBox>
          {description && description.length > 180 ? (
            <ShowMore onClick={handleChange}>{collapsedText}</ShowMore>
          ) : null}
          {manufacture ? <Title>Производство бренда</Title> : null}
          <MainDescriptionBox>
            {manufacture ? (
              collapsedManufacture ? (
                <Text
                  dangerouslySetInnerHTML={{
                    __html: manufactureShow,
                  }}
                />
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: manufacture,
                  }}
                />
              )
            ) : null}
          </MainDescriptionBox>
          {manufacture && manufacture.length > 180 ? (
            <ShowMore onClick={handleChangeManufacture}>
              {collapsedTextManufacture}
            </ShowMore>
          ) : null}
          {history ? <Title>История бренда</Title> : null}
          <MainDescriptionBox>
            {history ? (
              collapsedHistory ? (
                <Text
                  dangerouslySetInnerHTML={{
                    __html: historyShow,
                  }}
                />
              ) : (
                <p
                  dangerouslySetInnerHTML={{
                    __html: history,
                  }}
                />
              )
            ) : null}
          </MainDescriptionBox>
          {history && history.length > 180 ? (
            <ShowMore onClick={handleChangeHistory}>
              {collapsedTextHistory}
            </ShowMore>
          ) : null}
        </FirstContainer>
        {/* <SecondContainer open={open}>
          <Tabs />
        </SecondContainer> */}
      </AboutContainer>
    </MainContainer>
  )
}

export default About
