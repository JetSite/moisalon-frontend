import { LinearProgress, withStyles } from "@material-ui/core";

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#FF0033",
  },
  barColorPrimary: {
    backgroundColor: "#F696A3",
  },
})(LinearProgress);

export default ColorLinearProgress;
