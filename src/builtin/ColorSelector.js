import React from "react";
import { Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { ChromePicker, SwatchesPicker } from "react-color";

const styles = (theme) => ({
  root: {
    padding: "20px",
    backgroundColor: theme.palette.background.paper,
    width: "830px",
    height: "300px",
    margin: "25px auto 0 auto",
  },
});

class ColorSelector extends React.Component {
  /*
  props = {
    selectedColor: '#808080',
    updateColor: color_string -> ()
  }
  */

  constructor(props) {
    super(props);
    // the binding is necessary to make 'this' work in the callback
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeIndex = this.handleChangeIndex.bind(this);
  }

  render() {
    const { classes, selectedColor, updateColor } = this.props;

    return (
      <Paper className={classes.root}>
        <div id="colorSelector">
          <ChromePicker
            color={selectedColor}
            onChangeComplete={(color) => updateColor(color.hex)}
            //remove slider option on picker
            disableAlpha={true}
          />
          <SwatchesPicker
            color={selectedColor}
            onChangeComplete={(color) => updateColor(color.hex)}
            width={500}
            height={230}
          />
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(ColorSelector);
