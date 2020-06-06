import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import {
  Stitch,
  AnonymousCredential,
  RemoteMongoClient
} from "mongodb-stitch-browser-sdk";

const useStyles = makeStyles({
  flex: { flex: 1 },
  button: { marginLeft: 50 }
});


class Header extends Component {
  constructor() {
    super();
    this.state = {
      /*
      todos: [],
      value: "",
      */
      status = "",
      classes = useStyles()
    };

    this.handleChange = this.handleChange.bind(this);
    this.displayTodos = this.displayTodos.bind(this);
    this.addTodo = this.addTodo.bind(this);
  }

  sendTheme = async () => {
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

  componentDidMount() {
    // Initialize the App Client
    this.client = Stitch.initializeDefaultAppClient("pausch-bridge-pmulj");
    // Get a MongoDB Service Client
    // This is used for logging in and communicating with Stitch
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    // Get a reference to the todo database
    this.db = mongodb.db("pausch-bride");
  }
  
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  
  render() {
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
  }
}

export default Header;

/*
class Header extends Component {
  /*
  props = {
    name: 'Srinu Lade',
    colors: {
      0: '#808080',
      1: '#808080',
      ...
    },
  }
  
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
    
  );
};

export default Header;
*/