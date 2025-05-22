import { RadioGroup } from "@mui/material";

const RadioButtonGroup = ({ name, children, ...rest }) => {
  return (
    <RadioGroup aria-label={name} name={name} {...rest}>
      {children}
    </RadioGroup>
  );
};

export default RadioButtonGroup;
