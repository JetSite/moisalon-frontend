import { Wrapper, InputField } from "./styled";

const Input = ({
  value,
  type,
  name,
  onChange,
  onBlur,
  placeholder,
  disabled,
  mb,
  error,
}) => {
  return (
    <Wrapper mb={mb} error={error}>
      <InputField
        type={type}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        error={error}
        placeholder={placeholder}
      />
    </Wrapper>
  );
};

export default Input;
