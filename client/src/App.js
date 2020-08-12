import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Todos from "./pages/Todos";

export default class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/todos" component={Todos} />
        <Redirect to="/" />
      </Switch>
    );
  }
}
