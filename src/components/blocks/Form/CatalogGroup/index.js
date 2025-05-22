import { useRouter } from "next/router";
import { memo } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { makeStyles } from "@mui/styles";
import { Field } from "react-final-form";
import CatalogGroupItem from "../CatalogGroupItem";
import IconArrow from "./IconArrow";
import { styled } from "@mui/material/styles";

const BpIcon = styled("span")(() => ({
  borderRadius: 3,
  width: 23,
  height: 23,
  backgroundColor: "#fff",
  border: "1px solid #E3E3E3",
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

const useStyles = makeStyles(() => ({
  root: {
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  heading: {
    margin: 0,
    fontSize: 18,
  },
  panel: {
    padding: 0,
    "& .MuiAccordionActions-root": {
      display: "block",
    },
    "& .MuiFormControlLabel-root": {
      marginLeft: 0,
    },
    "& .MuiAccordionSummary-content.Mui-expanded": {
      margin: "12px 0",
    },
    "& .MuiAccordionSummary-root.Mui-expanded": {
      minHeight: 48,
    },
    "& .MuiAccordionSummary-expandIcon.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiCheckbox-root": {
      paddingLeft: 0,
      paddingRight: 18,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
  summary: {
    padding: 0,
  },
  details: {
    padding: 0,
  },
  fields: {
    "& .MuiFormControlLabel-root": {
      display: "flex",
      alignItems: "flex-start",
      marginBottom: 5,
    },
  },
}));

const CatalogGroup = ({ fields, group, meta }) => {
  const router = useRouter();
  const isSalonCabinet = router.pathname === "/salonCabinet";

  const classes = useStyles();
  const { items = [] } = group;

  const groupFields = fields
    .map((name, index) => {
      if (items === null) return null;
      const groupItem = items?.find((item) =>
        fields.value ? fields.value[index].id === item.id : false
      );
      if (groupItem !== undefined) {
        return (
          <Field key={groupItem.id} name={name}>
            {(field) => {
              return (
                <CatalogGroupItem
                  {...field}
                  item={groupItem}
                  index={index}
                  update={fields.update}
                />
              );
            }}
          </Field>
        );
      }
      return null;
    })
    .filter((el) => el !== null);

  return (
    <div>
      <Accordion elevation={0} className={classes.panel}>
        <AccordionSummary
          expandIcon={isSalonCabinet ? null : <IconArrow />}
          aria-controls={`panel${group.id}-content`}
          id={`panel${group.id}-content`}
          className={classes.summary}
        >
          {/* <Checkbox
            checked={true}
            className={classes.root}
            icon={<BpIcon />}
            checkedIcon={<BpCheckedIcon />}
          /> */}
          <h5 className={classes.heading}>{group.title}</h5>
        </AccordionSummary>
        <AccordionDetails className={classes.details}>
          <div className={classes.fields}>{groupFields}</div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default memo(CatalogGroup, (prev, next) => {
  if (prev.group !== next.group) {
    return true;
  }
  let {
    group: { items = [] },
  } = prev;
  if (items === null) {
    items = [];
  }
  const { value: prevValue = [] } = prev.fields;
  const { value: nextValue = [] } = next.fields;
  const groupPrevValue = prevValue.filter((t) =>
    items?.find((item) => item.id === t.id)
  );
  const groupNextValue = nextValue.filter((t) =>
    items?.find((item) => item.id === t.id)
  );

  if (groupPrevValue.length !== groupNextValue.length) {
    return true;
  }

  var propsAreEqual = true;
  groupNextValue.forEach((value) => {
    if (
      groupPrevValue?.find(
        (t) => t.id === value.id && t.value === value.value
      ) === undefined
    ) {
      propsAreEqual = false;
    }
  });

  return propsAreEqual;
});
