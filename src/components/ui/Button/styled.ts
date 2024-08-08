import styled, { css, keyframes } from 'styled-components'
import { lighten } from 'polished'
import { ButtonProps } from './'

const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`

export const ButtonCustom = styled.button<ButtonProps>`
  font-size: 18px;
  font-weight: 500;
  color: white;
  padding: 16px 68px;
  min-width: 134px;
  border: none;
  outline: none;
  cursor: pointer;
  display: inline-block;
  transition: all 0.2s ease-in-out;
  margin-top: ${({ mt }) => mt && mt + 'px'};
  margin-bottom: ${({ mb }) => mb && mb + 'px'};
  position: relative;
  z-index: ${props => props.z};
  ${props => styleVariants[props.variant]}
  ${props => sizeVariants[props.size || 'fullWidth']}
  ${props => props.font && fontVariants[props.font]}
  ${props =>
    props.loading &&
    css`
      cursor: default;
      animation: ${pulse} 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    `}

  :disabled {
    border: 1px solid transparent;
    background-color: #d8d8d8;
    color: white;
    cursor: default;
  }
`

export const styleVariants = {
  dark: {
    color: 'white',
    backgroundColor: '#000',
    border: '1px solid #000',
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
    },
  },
  darkBorder: {
    color: 'white',
    backgroundColor: '#000',
    border: '1px solid #fff',
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
    },
  },
  darkTransparent: {
    color: '#000',
    border: '1px solid #000',
    backgroundColor: 'transparent',
    fontWeight: 600,
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
      color: 'white',
    },
  },
  darkTransparentWithoutBorder: {
    color: '#000',
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#ff0033',
      color: 'white',
    },
  },
  red: {
    color: 'white',
    backgroundColor: '#f03',
    border: '1px solid #f03',
    ':hover': {
      backgroundColor: lighten(0.1, '#f03'),
    },
  },
  gray: {
    color: '#000',
    backgroundColor: '#F0F0F0',
    ':hover': {
      backgroundColor: '#ff0033',
      color: 'white',
    },
  },
  secondary: {
    color: 'white',
    backgroundColor: '#979797',
    border: '1px solid #979797',
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
    },
  },
  withRoundBorder: {
    padding: 0,
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid #000',
    borderRadius: '50px',
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
      color: 'white',
    },
  },
  withBorder: {
    padding: 0,
    color: '#000',
    backgroundColor: '#fff',
    border: '1px solid #000',
    ':hover': {
      backgroundColor: '#ff0033',
      borderColor: '#ff0033',
      color: 'white',
    },
  },
  redWithRoundBorder: {
    padding: 0,
    color: 'white',
    backgroundColor: '#f03',
    border: '1px solid #f03',
    ':hover': {
      backgroundColor: lighten(0.1, '#f03'),
    },
    borderRadius: '50px',
  },
}

export const sizeVariants = {
  small: {
    padding: '16px 0',
    width: 236,
  },
  smallWithHeight: {
    padding: '16px 0',
    width: 236,
    height: 55,
  },
  medium: {
    height: 55,
    width: 335,
  },
  mediumNoPadding: {
    height: 55,
    width: 335,
    padding: 0,
  },
  large: {
    height: 55,
    width: 368,
    marginTop: '20px',
  },
  width100: {
    height: 55,
    width: '100%',
  },
  width374: {
    height: 55,
    width: 374,
  },
  width374WithoutPadding: {
    height: 55,
    width: 374,
    padding: 0,
  },
  fullWidth: {
    height: 55,
    width: '100%',
    padding: '0',
  },
  noWidth: {
    height: 55,
    padding: '0 35px',
  },
  popUp: {
    height: 55,
    width: 160,
    padding: '0',
    marginTop: '24px',
  },
  fetchMore: {
    height: 55,
    width: '100%',
    marginBottom: '55px',
  },
  roundSmall: {
    height: 28,
    width: 161,
  },
  roundSmallFullWidth: {
    height: 28,
    width: '100%',
  },
  roundMedium: {
    height: 36,
    width: '100%',
  },
  round265: {
    height: 36,
    width: 265,
  },
  round218: {
    height: 36,
    width: 218,
  },
  round148: {
    height: 28,
    width: 148,
  },
  round114: {
    height: 36,
    width: 114,
  },
}

export const fontVariants = {
  // small: {
  //   fontSize: 14,
  // },
  medium: {
    fontWeight: 600,
    fontSize: '18px',
  },
  small: {
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '25px',
  },
  popUp: {
    fontWeight: 600,
    fontSize: '13px',
    lineHeight: '20px',
  },
  roundSmall: {
    fontWeight: 500,
    fontSize: '10px',
    lineHeight: '16px',
  },
  roundMedium: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '16px',
  },
}
