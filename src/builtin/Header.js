import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential
} from "mongodb-stitch-browser-sdk";
import PropTypes from "prop-types";


const styles = theme => ({
  flex: { flex: 1 },
  button: { marginLeft: 50 }
});


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Unsent",
      sending: false
    };

    this.sendTheme = this.sendTheme.bind(this);
  }

  sendTheme() {
    this.setState({status: "Pending", sending: true});
    this.collection.insertOne({user_id: this.props.name, design: this.props.frames})
    .then(result => this.setState({status: "Sent", sending: false}))
    .catch(err => {console.error("Failed to insert item:" + {err}); this.setState({status: "Failed", sending: false});});
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
    this.collection = mongodb.db("bridge").collection("designs");
    this.client.auth.loginWithCredential(new AnonymousCredential()).then(() => console.log("Authenticated")).catch(console.error);
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" style={{ marginBottom: 30 }}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.flex}>
          Bridge UI Editor - {this.props.name}
        </Typography>
        <Typography variant="subtitle1" color="inherit">
          <b>Status</b>: {this.state.status}
        </Typography>
        <Button color="inherit" onClick={this.sendTheme} className={classes.button} disabled={this.state.sending}>
          Send Theme
        </Button>
      </Toolbar>
    </AppBar>

    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);

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