import { forwardRef } from 'react'
import styled from 'styled-components'
import { Field, FieldRenderProps } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import { TextField } from '..'
import {
  composeValidators,
  phone,
  required,
} from '../../../../utils/validations'
import Icon from './Icon'
import { FieldStyled } from '../../../pages/Salon/CreateSalon/components/RegistrationForm/styled'

const PhoneWrapper = styled(Grid)`
  position: relative;
`

const IcoContainer = styled.div`
  position: absolute;
  right: 12px;
  top: 24px;
`

const IcoWrapper = styled.div`
  display: inline-block;
  position: relative;
  margin-left: 10px;
`

const Checkbox = styled(Field)`
  cursor: pointer;
  width: 28px;
  height: 28px;
  margin: 0;
  outline: none;
  opacity: 0;
  &:checked + .icon {
    & .icon--telegram {
      fill: #33a9e4;
    }
    & .icon--whatsapp {
      fill: #48c658;
    }
    & .icon--viber {
      fill: #8f5db7;
    }
  }
`

interface Props {
  name: string
  label?: string
  validate?: (value: string) => string | undefined
  requiredField?: boolean
}

const PhoneField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const {
    name,
    label = 'Номер телефона',
    validate = phone,
    requiredField,
  } = props

  return (
    <PhoneWrapper container spacing={3}>
      <Grid item xs={12}>
        <FieldStyled
          name={`${name}.phoneNumber`}
          type="phone"
          render={(props: FieldRenderProps<any, HTMLElement, any>) => {
            return (
              <TextField {...props} maxLength="30" ref={ref} inputMode="tel" />
            )
          }}
          label={label}
          validate={requiredField ? composeValidators(required, validate) : ''}
          requiredField={requiredField}
        />
        <IcoContainer>
          <IcoWrapper>
            <Checkbox
              name={`${name}.haveTelegram`}
              component="input"
              type="checkbox"
            />
            <Icon type={'telegram'}>
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M19.64 6.801a1.95 1.95 0 00-.63.15c-.173.068-.791.328-1.776.74l-3.68 1.546-7.507 3.16c-.055.023-.278.09-.525.28-.247.188-.522.598-.522 1.046 0 .362.18.73.398.94.218.212.44.31.624.384v-.002l2.931 1.172c.158.472.833 2.49.994 2.998h-.002c.114.36.225.594.378.79a.919.919 0 00.42.323l.021.006-.019-.005.04.02c.024.007.04.007.071.013.11.034.22.056.32.056.435 0 .702-.235.702-.235l.017-.013 1.878-1.589 2.3 2.128c.042.06.372.505 1.133.505.455 0 .814-.225 1.044-.461.23-.236.373-.478.437-.805l.002-.001c.051-.265 2.253-11.32 2.253-11.32l-.005.018c.069-.306.09-.602.008-.903a1.296 1.296 0 00-.562-.75 1.32 1.32 0 00-.744-.19zm-.317 1.752c-.087.437-2.059 10.346-2.18 10.967l-3.323-3.073-2.245 1.898.622-2.431s4.29-4.343 4.548-4.596c.208-.202.252-.273.252-.343 0-.094-.048-.161-.16-.161-.1 0-.235.096-.307.14-.915.57-4.812 2.792-6.728 3.882-.116-.047-1.847-.742-2.78-1.114a35945.722 35945.722 0 0110.831-4.555c.83-.348 1.264-.529 1.47-.614z"
              />
            </Icon>
          </IcoWrapper>
          <IcoWrapper>
            <Checkbox
              name={`${name}.haveWhatsApp`}
              component="input"
              type="checkbox"
            />
            <Icon type={'whatsapp'}>
              <circle cx="14" cy="14" r="10" stroke="#FFF" strokeWidth="2" />
              <path
                fill="#FFF"
                fillRule="nonzero"
                d="M18.702 16.16c-.06-.098-.22-.158-.459-.277-.24-.119-1.418-.694-1.637-.773-.22-.08-.38-.119-.539.119-.16.238-.619.773-.759.932-.14.159-.28.179-.519.06-.24-.12-1.011-.37-1.926-1.18-.712-.63-1.193-1.408-1.333-1.646-.14-.238-.014-.366.105-.485.108-.106.24-.277.36-.416.12-.139.16-.238.239-.397.08-.158.04-.297-.02-.416s-.54-1.289-.739-1.765c-.2-.475-.399-.396-.539-.396s-.3-.02-.459-.02c-.16 0-.42.06-.639.297-.22.238-.838.813-.838 1.983 0 1.17.858 2.3.978 2.458.12.159 1.657 2.637 4.092 3.589 2.436.951 2.436.634 2.875.594.44-.04 1.417-.575 1.618-1.13.199-.555.199-1.031.14-1.13z"
              />
            </Icon>
          </IcoWrapper>
          <IcoWrapper>
            <Checkbox
              name={`${name}.haveViber`}
              component="input"
              type="checkbox"
            />
            <Icon type={'viber'}>
              <path
                fill="#FFF"
                d="M19.672 17.153c.58.468 1.314.858.967 1.84-.36 1.02-1.609 2.048-2.674 2.038-.15-.042-.446-.088-.713-.203-4.679-2.018-8.077-5.326-10.009-10.076-.647-1.593.029-2.938 1.66-3.488.294-.098.58-.105.869 0 .696.257 2.458 2.688 2.498 3.416.03.557-.348.86-.724 1.115-.709.482-.713 1.094-.41 1.777.685 1.543 1.855 2.603 3.37 3.291.55.25 1.075.225 1.45-.344.669-1.015 1.488-.966 2.384-.335.449.316.905.625 1.332.97zm-5.246-9.401c-.283-.044-.715.018-.694-.357.032-.557.545-.35.793-.386 3.286.111 6.115 3.125 6.075 6.376-.004.32.11.792-.364.783-.454-.009-.336-.489-.376-.807-.436-3.452-2.013-5.082-5.434-5.609zm.67.946c2.11.254 3.834 2.09 3.817 4.105-.032.239.107.647-.278.706-.52.079-.418-.398-.47-.704-.347-2.1-1.082-2.87-3.195-3.343-.311-.07-.795-.021-.715-.501.077-.458.511-.302.84-.263zm.193 1.649c.937-.023 2.034 1.101 2.019 2.074.01.266-.02.546-.333.583-.227.027-.376-.163-.399-.398-.086-.866-.543-1.378-1.41-1.518-.259-.041-.514-.125-.393-.477.081-.235.297-.259.516-.264z"
              />
            </Icon>
          </IcoWrapper>
        </IcoContainer>
      </Grid>
    </PhoneWrapper>
  )
})

export default PhoneField
