import React, { Component } from "react";
import {
  addTodo,
  getTodos,
  getTodosByStatus,
  updateTodo,
  deleteTodo,
} from "../reducer";
import { connect } from "react-redux";
import "./todos.css";

class Todos extends Component {
  state = {
    value: "",
  };

  componentDidMount() {
    this.props.getTodos();
  }

  todoHandler = (event) => {
    event.preventDefault();
    this.props.addTodo({ text: this.state.value });
    this.setState({ value: "" });
  };

  handleInput = ({ target: { value } }) => this.setState({ value });

  handleLogout = () => {
    fetch("/logout").then(() => this.props.history.push("/login"));
  };

  handleArrowClick = (status) => (todo) => () => {
    this.props.updateTodo(todo.id, status);
  };

  deleteTodo = (todo) => () => {
    this.props.deleteTodo(todo.id);
  };

  render() {
    const { value } = this.state;

    return (
      <div>
        <button onClick={this.handleLogout}>Logout</button>
        <h1> To do list</h1>
        <form onSubmit={this.todoHandler}>
          Do you have anything to do?
          <input onChange={this.handleInput} value={value} />
          <button type="submit">Add to do</button>
        </form>
        <div>
          <h1>My To Do's</h1>
          {this.props.isLoading ? (
            <h2>Loading Todos...</h2>
          ) : (
            <div className="container">
              <TodoColumn
                title="Pending"
                todos={this.props.pendingTodos}
                onClickRight={this.handleArrowClick("in progress")}
                deleteTodo={this.deleteTodo}
              />
              <TodoColumn
                title="In progress"
                todos={this.props.inProgressTodos}
                onClickRight={this.handleArrowClick("done")}
                onClickLeft={this.handleArrowClick("pending")}
                deleteTodo={this.deleteTodo}
              />
              <TodoColumn
                title="Done"
                todos={this.props.doneTodos}
                onClickLeft={this.handleArrowClick("in progress")}
                deleteTodo={this.deleteTodo}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

function TodoColumn({ title, todos, onClickRight, onClickLeft, deleteTodo }) {
  return (
    <div className="column">
      <div className="title">{title}</div>
      {todos.map((todo, index) => (
        <div className="gridItem" key={index}>
          {onClickLeft && (
            <div className="leftArrow" onClick={onClickLeft(todo)} />
          )}
          <span style={{ flex: "1", padding: "0 5px" }}>
            {todo.text}
            <button className="deleteButton" onClick={deleteTodo(todo)}>
              x
            </button>
          </span>
          {onClickRight && (
            <div className="rightArrow" onClick={onClickRight(todo)} />
          )}
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    todos: state.todos,
    error: state.error,
    isLoading: state.isLoading,
    pendingTodos: getTodosByStatus(state, "pending"),
    inProgressTodos: getTodosByStatus(state, "in progress"),
    doneTodos: getTodosByStatus(state, "done"),
  };
}
/*
function mapDispatchToProps(dispatch) {
  return {
    addTodo: (todo) => dispatch(addTodo(todo)), // dispatch({ type: "ADD_TODO", todo })
  };
}*/

const mapDispatchToProps = { addTodo, getTodos, updateTodo, deleteTodo };

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
