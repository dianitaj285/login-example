import React, { Component } from "react";
import { fetchPost, parseJsonResponse } from "../utils";
import { Link } from "react-router-dom";

export default class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  handleInput = (name) => ({ target: { value } }) =>
    this.setState({ [name]: value });

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    fetchPost("/login", {
      email,
      password,
    })
      .then((result) => {
        console.log(result);
        this.props.history.push("/todos");
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { email, password } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleLoginSubmit}>
          <div>
            <input
              placeholder="e-mail"
              value={email}
              onChange={this.handleInput("email")}
            />
          </div>
          <div>
            <input
              placeholder="password"
              type="password"
              value={password}
              onChange={this.handleInput("password")}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}
