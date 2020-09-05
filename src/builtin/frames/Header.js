import React, { Component } from "react";

// MUI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import PropTypes from "prop-types";

// MongoDB
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";

const styles = () => ({
  flex: { flex: 1 },
  button: { marginLeft: 50 },
  header: { amrginBottom: 30 },
});

const appId = "pausch-bridge-pmulj";

class Header extends Component {
  /*
  props = {
    user_id: 'Andrew Carnegie',
    design: {
      0: {
        colors: {
          0: '#808080',
          1: '#808080',
          ...
        },
        duration: 1
      },
      ...
    },
  }
  */

  constructor(props) {
    super(props);
    this.state = {
      statusText: "Unsent",
      sending: false,
    };
    this.sendTheme = this.sendTheme.bind(this);
  }

  sendTheme() {
    // insert design into database
    console.log(this.props.design);
    this.setState({ statusText: "Pending", sending: true });
    this.collection
      .insertOne({ user_id: this.props.user_id, design: this.props.design })
      .then(() => this.setState({ statusText: "Sent", sending: false }))
      .catch((err) => {
        console.error("Failed to insert item:" + { err });
        this.setState({ statusText: "Failed", sending: false });
      });
  }

  componentDidMount() {
    // reference: http://stitch-sdks.s3-website-us-east-1.amazonaws.com/stitch-sdks/js/4/index.html
    this.client = Stitch.initializeDefaultAppClient(appId);
    const mongodb = this.client.getServiceClient(
      RemoteMongoClient.factory,
      "mongodb-atlas"
    );
    this.collection = mongodb.db("bridge").collection("designs");
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => console.log("Authenticated"))
      .catch(console.error);
  }

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.header}>
        <Toolbar>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            Bridge UI Editor - {this.props.user_id}
          </Typography>
          <Typography variant="subtitle1" color="inherit">
            <b>Status</b>: {this.state.statusText}
          </Typography>
          <Button
            color="inherit"
            onClick={this.sendTheme}
            className={classes.button}
            disabled={this.state.sending}
          >
            Send Theme
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
