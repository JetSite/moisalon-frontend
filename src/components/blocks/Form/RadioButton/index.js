import { FormControlLabel, Radio } from "@material-ui/core";

const RadioButton = ({ color = "default", ...rest }) => (
  <FormControlLabel control={<Radio color={color} />} {...rest} />
);

export default RadioButton;
