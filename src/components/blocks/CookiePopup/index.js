import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrapper, Text } from "./styles";
import Button from "../../ui/Button";

const CookiePopup = () => {
  const [openCookie, setOpenCookie] = useState();

  useEffect(() => {
    setOpenCookie(!!!localStorage.getItem("cookie"));
  }, []);

  const handleCookieClose = () => {
    localStorage.setItem("cookie", "true");
    setOpenCookie(false);
  };

  return (
    <Wrapper openCookie={openCookie}>
      <Text>
        Мы используем файлы cookie, чтобы предоставить вам наилучший опыт.
        Продолжая использовать сайт, вы соглашаетесь с условиями{" "}
        <Link href="/legals">Пользовательского соглашения</Link>
      </Text>
      <Button
        onClick={handleCookieClose}
        variant="redWithRoundBorder"
        size="roundSmall"
        font="roundMedium"
      >
        Принять
      </Button>
    </Wrapper>
  );
};

export default CookiePopup;
