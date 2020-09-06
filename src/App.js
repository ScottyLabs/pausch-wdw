import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import './styles/global.css';

// Components
import BasicApp from './BasicApp';
import FramesApp from './FramesApp';
import IntermediateApp from './IntermediateApp';

export default function App() {
    return (
    <Router>
      <Switch>
      <Route path="/frames">
          <div id="frames-app"><FramesApp /></div>
      </Route>
      <Route path="/intermediate">
          <div id="intermediate-app"><IntermediateApp /></div>
      </Route>
      <Route path="/">
          <div id="basic-app"><BasicApp /></div>
      </Route>
      </Switch>
    </Router>
    );
}
