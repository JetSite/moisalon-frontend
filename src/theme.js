import { withStyles } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },

  typography: {
    fontFamily: ["Montserrat", "sans-serif"].join(",")
  },

  shape: {
    borderRadius: 10
  },

  palette: {
    divider: "#D8D8D8",
    text: {
      primary: "#222222",
      secondary: "#9A9A9A"
    }
  }
});

export const MuiComponentsCss = withStyles({
  "@global": {
    ".MuiInputBase-root, .MuiInputBase-input": {
      fontFamily: "Montserrat, sans-serif"
    },
    ".MuiInput-underline": {
      "&:after": {
        borderBottom: "2px solid black"
      }
    },
    ".MuiInputLabel-formControl.Mui-focused": {
      color: "#979797"
    }
  }
})(() => null);

export default theme;
