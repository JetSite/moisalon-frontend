import React, { useCallback, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MuiSelect from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { laptopBreakpoint } from "../../../../../styles/variables";

const MenuItemStyled = styled(MenuItem)`
  display: block;
  padding: 5px 10px;
  font-size: 16px;
`;

const useStyles = makeStyles({
  root: (mode) => ({
    fontSize: "1.6rem",
    color: mode.color,
    "& &:before": {
      borderBottomColor: mode.color,
    },
    "& &:hover:before": {
      borderBottomColor: mode.color,
    },
    "& &:after": {
      borderBottomColor: mode.color,
    },
    "& &$focused": {
      color: mode.color,
    },
  }),
  input: (mode) => ({
    color: mode.color,
  }),
  icon: (mode) => ({
    color: mode.color,
  }),
  focused: (mode) => ({}),
});

const Select = forwardRef((props, ref) => {
  const {
    input,
    value,
    name,
    onChange,
    showError,
    label,
    options,
    errorText,
    color,
    ...rest
  } = props;

  const classes = useStyles({ color: color });

  const optionsList = options.map((option) => (
    <MenuItemStyled value={option.value} key={option.value}>
      {option.label}
    </MenuItemStyled>
  ));

  const handleChange = useCallback(
    (event) => {
      if (value !== event.target.value) {
        onChange(event);
      }
    },
    [value, onChange]
  );

  return (
    <FormControl
      error={showError}
      fullWidth={true}
      classes={{
        root: classes.root,
      }}
    >
      <InputLabel
        htmlFor={name}
        classes={{
          root: classes.root,
          focused: classes.focused,
        }}
      >
        {label}
      </InputLabel>
      <MuiSelect
        // IconComponent={(props) => (
        //   <ExpandMoreIcon className={`${props.className}`} />
        // )}
        inputRef={ref}
        value={value}
        onChange={handleChange}
        classes={{
          root: classes.root,
          icon: classes.icon,
        }}
        input={<Input classes={{ root: classes.root }} name={name} />}
        error={showError}
        {...rest}
      >
        {optionsList}
      </MuiSelect>
      {showError ? <FormHelperText>{errorText}</FormHelperText> : null}
    </FormControl>
  );
});

export default Select;
