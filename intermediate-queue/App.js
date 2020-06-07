import React, { Component } from "react";
import {
  Stitch,
  RemoteMongoClient,
  AnonymousCredential,
} from "mongodb-stitch-browser-sdk";

class Queue extends Component {
  renderEntry(value, index) {
    let status = "undecided";
    if (value.accepted) {
        status = " accepted";
    } else if (value.rejected) {
        status = "rejected";
    } else if (index === this.props.currentViewIndex) {
        status = "viewing";
    }

    return (
      <div className="entry" key={index}>
        <p className={status}>{value.user_id}</p>
        <ul className="options">
          <li className="view" onClick={() => this.props.onView(index)}>
            view
          </li>
          <li className="accept" onClick={() => this.props.onAccept(index)}>
            accept
          </li>
          <li className="reject" onClick={() => this.props.onReject(index)}>
            reject
          </li>
        </ul>
      </div>
    );
  }

  render() {
    let queue = this.props.queue.map((value, index) => {
      return this.renderEntry(
        value,
        index
      );
    });

    return <div className="panel-queue">{queue}</div>;
  }
}

// let QUEUE = [
//   {
//     name: "Jerry",
//     panels: [
//       { duration: 5, panel: (100, 0, 0) },
//       { duration: 5, panel: (0, 100, 0) },
//       { duration: 5, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
//   {
//     name: "Kerry",
//     panels: [
//       { duration: 3, panel: (100, 0, 0) },
//       { duration: 3, panel: (0, 100, 0) },
//       { duration: 3, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
//   {
//     name: "Lerry",
//     panels: [
//       { duration: 1, panel: (100, 0, 0) },
//       { duration: 1, panel: (0, 100, 0) },
//       { duration: 1, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
//   {
//     name: "Merry",
//     panels: [
//       { duration: 5, panel: (100, 0, 0) },
//       { duration: 5, panel: (0, 100, 0) },
//       { duration: 5, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
//   {
//     name: "Nerry",
//     panels: [
//       { duration: 3, panel: (100, 0, 0) },
//       { duration: 3, panel: (0, 100, 0) },
//       { duration: 3, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
//   {
//     name: "Oerry",
//     panels: [
//       { duration: 1, panel: (100, 0, 0) },
//       { duration: 1, panel: (0, 100, 0) },
//       { duration: 1, panel: (0, 0, 100) },
//     ],
//     accepted: null,
//   },
// ];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queue: [],
      currentViewIndex: null, // renamed currentView to currentViewIndex
    };

    this.getRequests = this.getRequests.bind(this);
    this.sendTheme = this.sendTheme.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleView = this.handleView.bind(this);
  }

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
    this.client.auth
      .loginWithCredential(new AnonymousCredential())
      .then(() => console.log("Authenticated"))
      .catch(console.error);
  }

  // call to refresh requests page
  getRequests() {
    this.collection
      .find()
      .toArray()
      .map(req => {req[accepted] = false; req[rejected] = false;})
      .then((results) => this.setState({ queue: results, currentViewIndex: null }))
      .catch((err) => console.error("Failed to get requests" + { err }));

    /* each entry originally has the following formatting:
    {
        "_id":  {"$oid":"5edc39064754c6a2c030e10f"}, // unique for each request
        "user_id":  "Srinu Lade",
        "design":   {
            "0":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            },
            "1":{
                "colors":{"0":"#808080","1":"#808080","2":"#808080","3":"#808080","4":"#808080","5":"#808080","6":"#808080","7":"#808080","8":"#808080","9":"#808080","10":"#808080","11":"#808080","12":"#808080","13":"#808080","14":"#808080","15":"#808080","16":"#808080","17":"#808080","18":"#808080","19":"#808080","20":"#808080","21":"#808080","22":"#808080","23":"#808080","24":"#808080","25":"#808080","26":"#808080","27":"#808080","28":"#808080","29":"#808080","30":"#808080","31":"#808080","32":"#808080","33":"#808080","34":"#808080","35":"#808080","36":"#808080","37":"#808080","38":"#808080","39":"#808080","40":"#808080","41":"#808080","42":"#808080","43":"#808080","44":"#808080","45":"#808080","46":"#808080","47":"#808080","48":"#808080","49":"#808080","50":"#808080","51":"#808080"},
                "duration":{"$numberInt":"1"}
            }
        }
    }
    accepted: false and rejected: false attributes mapped to each entry
    */
  }

  // send design to server
  async sendTheme(i) {
      // code copied from previous sendTheme button in front end
    const res = await fetch("http://pbridge.adm.cs.cmu.edu:5000/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.queue[i][user_id], panels: this.state.queue[i][design] }), // this should be written however necessary to match backend code
    });

    const ans = await res.json();
    console.log(ans);
  }

  // set accepted to true and remove from db
  handleAccept(i) {
    let queue = this.state.queue.slice();
    queue[i].accepted = true;
    this.setState({
      queue: queue,
    });

    this.sendTheme(i);

    // use this.collection.remove or this.collection.delete (https://docs.mongodb.com/manual/reference/method/js-collection/) to remove the request by its _id

    console.log(`accepted ${i}`);
  }

  // set rejected to true and remove from db
  handleReject(i) {
    let queue = this.state.queue.slice();
    queue[i].rejected = true;
    this.setState({
      queue: queue,
    });

    // use this.collection.remove or this.collection.delete (https://docs.mongodb.com/manual/reference/method/js-collection/) to remove the request by its _id

    console.log(`rejected ${i}`);
  }

  // set currentViewIndex index
  handleView(i) {
    this.setState({
      currentViewIndex: i,
    });
    console.log(`viewed ${i}`);
  }

  render() {
    return (
      <div className="queue-view">
        <div className="queue">
          <Queue
            queue={this.state.queue}
            onAccept={(i) => this.handleAccept(i)}
            onReject={(i) => this.handleReject(i)}
            onView={(i) => this.handleView(i)}
            currentViewIndex={this.state.currentViewIndex}
          />
        </div>
        <div className="viewer">
          <p>{(this.state.currentViewIndex === null) ? "No current view" : "You're viewing " + this.state.currentViewIndex}</p>
        </div>
        <button onClick={this.getRequests}>
            Refresh Requests
        </button>
      </div>
    );
  }
}

export default App;
