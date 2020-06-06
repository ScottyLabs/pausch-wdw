import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  flex: { flex: 1 },
  button: { marginLeft: 50 }
});

const Header = props => {
  /*
  props = {
    name: 'Srinu Lade',
    colors: {
      0: '#808080',
      1: '#808080',
      ...
    },
  }
  */
  const [status, setStatus] = React.useState("Unsent");
  const classes = useStyles();

  const sendTheme = async () => {
    setStatus("Pending");
    const res = await fetch("http://pbridge.adm.cs.cmu.edu:5000/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: props.name, panels: props.colors })
    });

    const ans = await res.json();
    setStatus(ans);
    console.log(ans);
  };

  return (
    <AppBar position="static" style={{ marginBottom: 30 }}>
      <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.flex}>
          Bridge UI Editor - {props.name}
        </Typography>
        <Typography variant="h7" color="inherit">
          <b>Status</b>: {status}
        </Typography>
        {/* <Button color="inherit">Status: {status}</Button> */}
        <Button color="inherit" onClick={sendTheme} className={classes.button}>
          Send Theme
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
