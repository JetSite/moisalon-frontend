import React, { useCallback, memo } from "react";
import { FormControlLabel, Checkbox, styled } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
});

const BpIcon = styled("span")(() => ({
  borderRadius: 3,
  width: 23,
  height: 23,
  backgroundColor: "#fff",
  border: "1px solid #E3E3E3",
  "&:hover": { bgcolor: "transparent" },
  "input:hover ~ &": {
    backgroundColor: "#ebf1f5",
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: "#E3E3E3",
  border: "1px solid #E3E3E3",
  "&:before": {
    display: "block",
    width: 23,
    height: 19,
    background: "url(/icon-check.svg) no-repeat center",
    content: '""',
  },
});

const CatalogGroupItem = ({ input, item, index, update }) => {
  const classes = useStyles();

  const { value } = input;

  const onChange = useCallback(
    (_event, checked) => {
      if (!checked) {
        update(index, { id: value.id, value: 0 });
      } else {
        update(index, { id: value.id, value: 1 });
      }
    },
    [update, index, value.id]
  );

  const checked = value.value === 1;

  const props = {
    checked,
    label: item.title,
    control: (
      <Checkbox
        className={classes.root}
        icon={<BpIcon />}
        checkedIcon={<BpCheckedIcon />}
      />
    ),
    onChange,
  };

  return <FormControlLabel {...props} />;
};

export default memo(CatalogGroupItem, (prev, next) => {
  const { value: prevValue } = prev.input;
  const { value: nextValue } = next.input;
  return prevValue.value === nextValue.value;
});
