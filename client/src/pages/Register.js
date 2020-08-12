import React, { Component } from "react";
import { fetchPost, parseJsonResponse } from "../utils";
import { Link } from "react-router-dom";

export default class Register extends Component {
  state = { email: "", password: "" };

  handleInput = (name) => ({ target: { value } }) =>
    this.setState({ [name]: value });

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    fetchPost("/register", {
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
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
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
          <button type="submit">Register</button>
        </form>
        <Link to="/">Login</Link>
      </div>
    );
  }
}
