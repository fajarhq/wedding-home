import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./Home";
import Edit from "./Edit";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/edit" component={Edit} />
      </HashRouter>
    );
  }
}

export default App;
