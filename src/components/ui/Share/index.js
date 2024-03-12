import { useState, useRef } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import {
  VKShareButton,
  VKIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  ViberShareButton,
  ViberIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "next-share";
import {
  Wrapper,
  WrapperItems,
  IconWrapper,
  Icon,
  WrapperSocials,
  Title,
  SocialItem,
} from "./styles";

const Share = ({ link, imageLink = "", title = "" }) => {
  const [showSocials, setShowSocials] = useState(false);
  const shareWrapperRef = useRef();

  const openSocials = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSocials(!showSocials);
  };

  const btnClick = () => {
    setShowSocials(false);
  };

  return (
    <Wrapper>
      <IconWrapper onClick={openSocials}>
        <Icon src="/share.svg" />
      </IconWrapper>
      <OutsideClickHandler
        onOutsideClick={() => {
          setShowSocials(false);
        }}
      >
        {showSocials ? (
          <WrapperSocials ref={shareWrapperRef}>
            {/* <CloseBtn>
            <Close src="/close-cross-red.svg" />
          </CloseBtn> */}
            <Title>Поделиться</Title>
            <WrapperItems>
              <SocialItem>
                <VKShareButton url={link} image={imageLink} onClick={btnClick}>
                  <VKIcon size={32} round />
                </VKShareButton>
              </SocialItem>
              <SocialItem>
                <TelegramShareButton
                  url={link}
                  title={title}
                  onClick={btnClick}
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </SocialItem>
              <SocialItem>
                <ViberShareButton url={link} title={title} onClick={btnClick}>
                  <ViberIcon size={32} round />
                </ViberShareButton>
              </SocialItem>
              <SocialItem>
                <WhatsappShareButton
                  url={link}
                  title={title}
                  separator=" "
                  onClick={btnClick}
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
              </SocialItem>
              <SocialItem>
                <TwitterShareButton url={link} title={title} onClick={btnClick}>
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
              </SocialItem>
              {/* <SocialItem>
              <EmailShareButton
                url={title}
                subject={"Next Share"}
                body="body"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>
            </SocialItem> */}
            </WrapperItems>
          </WrapperSocials>
        ) : null}
      </OutsideClickHandler>
    </Wrapper>
  );
};

export default Share;
