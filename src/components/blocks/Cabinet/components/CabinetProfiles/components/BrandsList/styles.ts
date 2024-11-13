import styled from 'styled-components'
import { laptopBreakpoint } from '../../../../../../../styles/variables'

export const BrandsContent = styled.div`
  margin-top: 40px;
`

export const OwnBrandsContent = styled.div`
  margin-top: 40px;
`

export const Title = styled.h3`
  margin-bottom: 40px;
  font-size: 22px;
  font-weight: 600;
  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 30px;
    min-width: 100%;
  }
`

export const MainTitle = styled(Title)`
  font-size: 22px;
`

export const ListWrapper = styled.div<{heightLarge?: boolean}>`
  display: flex;
  flex-wrap: wrap;
  min-width: 572px;
  min-height: ${props => (props.heightLarge ? '199px' : 'auto')};
  gap: 22px;

  @media (max-width: ${laptopBreakpoint}) {
    margin: 0;
    margin-bottom: 30px;
    min-width: 100%;
  }
`

export const ItemWrapper = styled.div<{ published: boolean }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 176px;
  height: 176px;
  padding: 0 27px;
  border: 1px solid #ededed;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${laptopBreakpoint}) {
    width: 118px;
    height: 118px;
    margin-left: 0;
    padding: 0 12px;
  }
`

export const Logo = styled.img`
  width: 100%;
`

export const TextNoBrands = styled.p`
  margin-bottom: 40px;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
`

export const RemoveButton = styled.div<{ published: boolean }>`
  display: ${({ published }) => (published ? 'block' : 'none')};
  width: 42px;
  height: 42px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: url('/close-cross-red.svg') no-repeat center;
`
