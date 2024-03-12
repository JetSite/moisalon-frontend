import { ButtonCustom } from "./styled";

const Button = ({
  variant = "dark",
  size = "small",
  as,
  onClick,
  children,
  ...rest
}) => {
  return (
    <ButtonCustom
      as={as}
      size={size}
      variant={variant}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ButtonCustom>
  );
};

export default Button;
