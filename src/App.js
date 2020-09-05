import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


// Components
import BasicApp from './BasicApp';
import FramesApp from './FramesApp';
import IntermediateApp from './IntermediateApp';

export default function App() {
    return (
    <Router>
      <Switch>
      <Route path="/frames">
          <FramesApp />
      </Route>
      <Route path="/intermediate">
          <IntermediateApp />
      </Route>
      <Route path="/">
          <BasicApp />
      </Route>
      </Switch>
    </Router>
    );
}
