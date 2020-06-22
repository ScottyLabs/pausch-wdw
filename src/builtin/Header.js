import React, { Component } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  Realm,
  RemoteMongoClient,
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";
import PropTypes from "prop-types";

const styles = () => ({
  flex: { flex: 1 },
  button: { marginLeft: 50 },
  header: { marginBottom: 30 },
});

const appId = "pausch-bridge-pmulj";
const appConfig = {
  id: appId,
  timeout: 10000,
}

const TaskModel = {

}

class Header extends Component {
  /*
  props = {
    user_id: 'acarnegie',
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
    // initialie MongoDB database: https://docs.mongodb.com/realm/node/quick-start/
    const app = new Realm.App(appConfig);
    const credentials = Realm.Credentials.anonymous();
    try {
      const user = await app.logIn
    } catch(err) {
      console.error("Failed to log in", err);
    }
    // Get a reference to the todo database
    this.collection = mongodb.db("bridge").collection("designs");
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => console.log("Authenticated"))
      .catch(console.error);
  }

  async run() {
    let user;
    try {
      const app = new Realm.App(appConfig);

      const credentials = Realm.Credentials.anonymous();
      user = await app.logIn(credentials);

      console.log('Logged in with the user: ' + user.identity);
    } catch(err) {
      console.error("Failed to log in", err);
    } finally {
      // ...
    }
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
            <b>Status</b>: {this.state.statusTextText}
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
