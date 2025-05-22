import { FormControlLabel, Radio } from "@mui/material";

const RadioButton = ({ color = "default", ...rest }) => (
  <FormControlLabel control={<Radio color={color} />} {...rest} />
);

export default RadioButton;
