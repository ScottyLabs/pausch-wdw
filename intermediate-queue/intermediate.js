import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  Stitch,
  RemoteMongoClient,
  UserPasswordCredential
} from "mongodb-stitch-browser-sdk";
import './intermediate.css';
import panelImage from "./panel-design.jpg";


function Panel(props) {
  return (
      <div className="panel" style={{backgroundColor: props.color}}>
        <img src={panelImage} alt="panel" />
      </div>
    );
}

function Panels(props) {
  const panels = Object.values(props.panels);
  const colorPanels = panels.map((v, i) => {
      return <Panel color={v} key={i} />
    }
    );
  return (<div className="panels">{colorPanels}</div>);
}

class PanelViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    }
    this.handleNextCue = this.handleNextCue.bind(this);
    this.handlePrevCue = this.handlePrevCue.bind(this);
  }


  handleNextCue() {
    var len = Object.keys(this.props.entry['design']).length;
    const c = (this.state.current + 1) % len;
    this.setState({
      current: c
    });
  }
  handlePrevCue() {
    var len = Object.keys(this.props.entry['design']).length;
    const c = (this.state.current + len - 1) % len;
    this.setState({
      current: c
    });
  }

  render() {
    const cueStack = this.props.entry['design'];
    const c = this.state.current;
    const currentCue = cueStack[c + ""];
    return (
    <div className="viewer">
      <p className="designBy">Design by {this.props.entry['user_id']}</p>
      <Panels panels={currentCue.colors} />
      <div className="viewer-controls">
      <p>Cue {c} of {Object.keys(cueStack).length}</p>
      <p>Duration: {currentCue.duration}s</p>
      <button onClick={() => this.handlePrevCue()}>prev</button>
      <button onClick={() => this.handleNextCue()}>next</button>
      </div>
      </div>
    )
  }
}

function QueueEntry(props) {
  let classes = "undecided";
  const did = props.did;
    if (did === props.currentView) {
      classes = "viewing";
    }
    return (
      <div className="entry">
        <p className={classes}>{props.uid}</p>
        <ul className="options">
          <li className="view" onClick={() => props.view(did)}>view</li>
          <li className="accept" onClick={() => props.acc(did)}>accept</li>
          <li className="reject" onClick={() => props.rej(did)}>reject</li>
        </ul>
      </div>
    );
}

class Queue extends Component {
  render() {
    const queue = Object.values(this.props.queue);
    const entries = queue.map(
      (entry) => {
        return <QueueEntry did={entry['_id']} 
                          uid={entry['user_id']}
                          acc={this.props.onAccept}
                          rej={this.props.onReject}
                          view={this.props.onView} 
                          currentView={this.props.view}
                          key={entry['_id']} />
      }
    );
    if (queue.length === 0) {
      return (<div className="panel-queue" >
      <p>No entries</p>
      </div>)
    }
    return (
      <div className="panel-queue" >
      {entries}
      </div>
    );

  }
}

class QueueView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: [],
      currentViewID: null
    }


    this.getRequests = this.getRequests.bind(this);
    this.removeDesignID = this.removeDesignID.bind(this);
    this.removeFromQueue = this.removeFromQueue.bind(this);
    this.getEntryFromID = this.getEntryFromID.bind(this);
    this.sendTheme = this.sendTheme.bind(this);
    this.handleAccept = this.handleAccept.bind(this);
    this.handleReject = this.handleReject.bind(this);
    this.handleView = this.handleView.bind(this);

  }

  componentDidMount() {
    this.collection = this.props.collection;
    this.getRequests();
  }

  getRequests() {
    this.collection
      .find()
      .toArray()
      .then((results) => {
        const queue = results.map((res) => {
            res['_id'] = res['_id'].toHexString();
            return res;
          })
        this.setState({ 
          queue: queue
        });
      })
      .catch((err) => console.error("Failed to get requests" + { err }));
  }

  removeDesignID(id) {
    this.collection.deleteOne({ '_id': {'$oid': id} });

  }

  removeFromQueue(id, queue) {
    return queue.filter(obj => (obj['_id'] !== id));
  }

  getEntryFromID(id, queue) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i]['_id'] === id) {
        return queue[i];
      }
    }
  }

  async sendTheme(id) {
    const entry = this.getEntryFromID(id, this.state.queue);
      // code copied from previous sendTheme button in front end
    const res = await fetch("http://pbridge.adm.cs.cmu.edu:5000/theme", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: entry['user_id'], panels: entry['design'] }), 
    });

    const ans = await res.json();
    console.log(ans);
  }

  handleAccept(id) {
    let c = this.state.currentViewID;
    if (id === c) {
      c = null;
    }
    this.setState({
      queue: this.removeFromQueue(id, this.state.queue),
      currentViewID: c
    });

    this.sendTheme(id);
    this.removeDesignID(id);
  }

  handleReject(id) {
    let c = this.state.currentViewID;
    if (id === c) {
      c = null;
    }
    this.setState({
      queue: this.removeFromQueue(id, this.state.queue),
      currentViewID: c
    });

    this.removeDesignID(id);
  }

  handleView(id) {
    if (id === this.state.currentViewID) {
      this.setState({
        currentViewID: null,
      });
    }
    else {
      this.setState({
        currentViewID: id,
      });
    }
    
  }



  render() {
    let currentView;
    if (this.state.currentViewID === null) {
      currentView = <p>No current view</p>;
    }
    else {
      const entry = this.getEntryFromID(this.state.currentViewID, this.state.queue);
      currentView = <PanelViewer entry={entry} key={entry['_id']} />
    }



    return (
      <div className="queue-view">
        <div className="queue">
        <div className="loadmore"><button onClick={() => this.getRequests()}>Load more</button></div>
          <Queue queue={this.state.queue} 
                onAccept={(i) => this.handleAccept(i)}
                onReject={(i) => this.handleReject(i)} 
                onView={(i) => this.handleView(i)} 
                view={this.state.currentViewID} />
        </div>
        {currentView}
      </div>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.checkLogin = this.checkLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
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
  }

  handleChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  checkLogin(user, pass) {
    this.client.auth
      .loginWithCredential(new UserPasswordCredential(user, pass))
      .then(() => {

        console.log("Authenticated");
        this.props.success(<QueueView collection={this.collection} />);
        

      })
      .catch((error) => {
        console.log(error);
        alert('Incorrect password.')
        this.setState({
          username: "",
          password: ""
        });
      });

  }

  handleLogin(event) {
    event.preventDefault();
    this.checkLogin(this.state.username, this.state.password);
  }

  render() {
    return (
    <div id="login">
      <form onSubmit={(e) => this.handleLogin(e)}>
        <label>Username:</label><br />
        <input type="text" name="username" 
            value={this.state.username} onChange={(e) => this.handleChange(e)} />
        <br />

        <label>Password:</label><br />
        <input type="password" name="password" 
            value={this.state.password} onChange={(e) => this.handleChange(e)} />
        <br />
        <input type="submit" value="Submit" />
      </form>

    </div> )
  }
}

export default class Intermediate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: <Login success={(e) => this.success(e)} />
		}
		this.success = this.success.bind(this);
	}
	success(e) {
		this.setState({
			display: e
		})
	}
	render() {
		return this.state.display;
	}
}


// ========================================

// ReactDOM.render(
//   <Login />,
//   document.getElementById('root')
// );
