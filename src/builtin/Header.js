import React from 'react';
import { AppBar, Toolbar, Typography, Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  flex: {flex: 1},
});

const Header = (props) => {

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

  const classes = useStyles();

  const sendTheme = async () => {
    const res = await fetch('http://pbridge.adm.cs.cmu.edu:5000/theme', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: props.name, panels: props.colors })
    });

    const ans = await res.json();
    console.log(ans);
  };

  return (
    <AppBar position="static" style={{marginBottom : 30}}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.flex}>
            Bridge UI Editor - {props.name}
        </Typography>
        <Button color="inherit" onClick={sendTheme}>Send Theme</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
