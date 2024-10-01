import { FC, useMemo } from 'react'
import * as Styled from '../styles'
import { MobileVisible } from 'src/styles/common'
import { ISalonWorkplace } from 'src/types/workplace'
import { isArray } from 'src/utils/newUtils/common/checkType'

export interface ITechnicalArr {
  title: string
  item: string | ITechnicalArr[]
  show?: boolean
}

interface Props {
  arr: ITechnicalArr[]
  title: string
}

export const TechnicalItems: FC<Props> = ({ arr, title }) => {
  return (
    <Styled.InfoBlock>
      <Styled.Title>{title}</Styled.Title>
      {arr.map(e => {
        return (
          <Styled.InfoItemHorisontal key={e.title}>
            <Styled.DesktopBlock>
              <Styled.InfoItemTitleWide>{e.title}</Styled.InfoItemTitleWide>
              <Styled.InfoItemContent>
                {!isArray(e.item) ? (
                  <Styled.ItemWide>
                    <Styled.Text>{e.item as string}</Styled.Text>
                  </Styled.ItemWide>
                ) : (
                  (e.item as ITechnicalArr[]).map(element =>
                    element.show ? (
                      <Styled.DesktopBlock key={element.title}>
                        <Styled.ItemWide>
                          <Styled.IconCircle src="/service-rent-icon.svg" />
                          <Styled.Text>{element.title}</Styled.Text>
                        </Styled.ItemWide>
                        <Styled.ItemWide>
                          <Styled.Text>{element.item as string}</Styled.Text>
                        </Styled.ItemWide>
                      </Styled.DesktopBlock>
                    ) : null,
                  )
                )}
              </Styled.InfoItemContent>
            </Styled.DesktopBlock>
            <MobileVisible>
              <Styled.InfoItemTitle>{e.title}</Styled.InfoItemTitle>
              {!isArray(e.item) ? (
                <Styled.ItemWide>
                  <Styled.Text>{e.item as string}</Styled.Text>
                </Styled.ItemWide>
              ) : (
                (e.item as ITechnicalArr[]).map(element =>
                  element.show ? (
                    <>
                      <MobileVisible key={element.title}>
                        <Styled.ItemWide>
                          <Styled.IconCircle src="/service-rent-icon.svg" />
                          <Styled.Text>{element.title}</Styled.Text>
                          <Styled.Text>- {element.item as string}</Styled.Text>
                        </Styled.ItemWide>
                      </MobileVisible>
                    </>
                  ) : null,
                )
              )}
            </MobileVisible>
          </Styled.InfoItemHorisontal>
        )
      })}
    </Styled.InfoBlock>
  )
}
