import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Queue extends React.Component {
  renderEntry(value, index, acc, rej, view) {
    let classes = "undecided";
    if (value.accepted === null) {
      if (index === this.props.view) {
        classes = "viewing";
      }
    }
    else if (value.accepted) {
      classes = " accepted";
    }
    else {
      classes = "rejected";
    }

    return (
      <div className="entry" key={index}>
        <p className={classes}>{value.name}</p>
        <ul className="options">
          <li className="view" onClick={() => view(index)}>view</li>
          <li className="accept" onClick={() => acc(index)}>accept</li>
          <li className="reject" onClick={() => rej(index)}>reject</li>
        </ul>
      </div>
    );
  }
  render() {
    let queue = this.props.queue.map(
      (value, index) => {
        return this.renderEntry(value, index, this.props.onAccept, this.props.onReject, this.props.onView);
      }
    );

    return (
      <div className="panel-queue">
      {queue}
      </div>
    );

  }
}

let QUEUE = [
  {
    "name": "Jerry",
    "panels": [
    { "duration": 5, "panel": (100,0,0) },
    { "duration": 5, "panel": (0,100,0) },
    { "duration": 5, "panel": (0,0,100) },
    ],
    "accepted": null
  },
  {
    "name": "Kerry",
    "panels": [
    { "duration": 3, "panel": (100,0,0) },
    { "duration": 3, "panel": (0,100,0) },
    { "duration": 3, "panel": (0,0,100) },
    ],
    "accepted": null
  },
  {
    "name": "Lerry",
    "panels": [
    { "duration": 1, "panel": (100,0,0) },
    { "duration": 1, "panel": (0,100,0) },
    { "duration": 1, "panel": (0,0,100) },
    ],
    "accepted": null
  },
  {
    "name": "Merry",
    "panels": [
    { "duration": 5, "panel": (100,0,0) },
    { "duration": 5, "panel": (0,100,0) },
    { "duration": 5, "panel": (0,0,100) },
    ],
    "accepted": null
  },
  {
    "name": "Nerry",
    "panels": [
    { "duration": 3, "panel": (100,0,0) },
    { "duration": 3, "panel": (0,100,0) },
    { "duration": 3, "panel": (0,0,100) },
    ],
    "accepted": null
  },
  {
    "name": "Oerry",
    "panels": [
    { "duration": 1, "panel": (100,0,0) },
    { "duration": 1, "panel": (0,100,0) },
    { "duration": 1, "panel": (0,0,100) },
    ],
    "accepted": null
  }
]

class QueueView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      queue: QUEUE,
      accepted: [],
      rejected: [],
      currentView: null
    }
  }

  handleAccept(i) {
    let queue = this.state.queue.slice();
    queue[i].accepted = true;
    this.state.accepted.push(i);
    this.setState({
      queue: queue,
    });
    console.log(`accepted ${i}`);
  }

  handleReject(i) {
    let queue = this.state.queue.slice();
    queue[i].accepted = false;
    this.state.rejected.push(i);
    this.setState({
      queue: queue,
    });
    console.log(`rejected ${i}`);
  }

  handleView(i) {
    this.setState({
      currentView: i,
    });
    console.log(`viewed ${i}`);
  }



  render() {
    console.log(this.state);
    let currentView;
    if (this.state.currentView === null) {
      currentView = "No current view";
    }
    else {
      currentView = `You're viewing ${this.state.currentView}.`;
    }

    return (
      <div className="queue-view">
        <div className="queue">
          <Queue queue={this.state.queue} 
                onAccept={(i) => this.handleAccept(i)}
                onReject={(i) => this.handleReject(i)} 
                onView={(i) => this.handleView(i)} 
                view={this.state.currentView} />
        </div>
        <div className="viewer">
          <p>{currentView}</p>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <QueueView />,
  document.getElementById('root')
);
// How do you force this to render every time handle___() is called?