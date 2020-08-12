import {
  fetchPost,
  parseJsonResponse,
  fetchPut,
  fetchGet,
  fetchDelete,
} from "./utils";

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
};

const ACTIONS = {
  ADD_TODO_SUCCES: "ADD_TODO_SUCCES",
  ADD_TODO_FAIL: "ADD_TODO_FAIL",
  GET_TODOS_SUCCESS: "GET_TODOS_SUCCESS",
  GET_TODOS_FAIL: "GET_TODOS_FAIL",
  GET_TODOS_STARTED: "GET_TODOS_STARTED",
  UPDATE_TODO_SUCCESS: "UPDATE_TODO_SUCCESS",
  UPDATE_TODO_FAIL: "UPDATE_TODO_FAIL",
  DELETE_TODO_SUCCES: "DELETE_TODO_SUCCES",
  DELETE_TODO_FAIL: "DELETE_TODO_FAIL",
};

//Selectors
export function getTodosByStatus(state, status) {
  return state.todos.filter((todo) => todo.status === status);
}

// Action creators
function getTodosSucces(todos) {
  return { type: ACTIONS.GET_TODOS_SUCCESS, todos };
}

function getTodosFail(error) {
  return { type: ACTIONS.GET_TODOS_FAIL, error };
}

function getTodosStart() {
  return { type: ACTIONS.GET_TODOS_STARTED };
}

function addTodoSucces(todo) {
  return { type: ACTIONS.ADD_TODO_SUCCES, todo };
}

function addTodoFail(err) {
  return { type: ACTIONS.ADD_TODO_FAIL, err };
}

function updateTodoSucces(todo) {
  return { type: ACTIONS.UPDATE_TODO_SUCCESS, todo };
}
function updateTodoFail(err) {
  return { type: ACTIONS.UPDATE_TODO_FAIL, err };
}
function deleteTodoSucces(todoId) {
  return { type: ACTIONS.DELETE_TODO_SUCCES, todoId };
}
function deleteTodoFail(error) {
  return { type: ACTIONS.DELETE_TODO_FAIL, error };
}

// Thunk

export function addTodo(todo) {
  return (dispatch) => {
    fetchPost("/todo", todo)
      .then((result) => dispatch(addTodoSucces(result)))
      .catch((err) => {
        dispatch(addTodoFail(err));
      });
  };
}

export function getTodos() {
  return (dispatch) => {
    dispatch(getTodosStart());
    fetchGet("/todo")
      .then((todos) => {
        return dispatch(getTodosSucces(todos));
      })
      .catch((err) => {
        return dispatch(getTodosFail(err));
      });
  };
}

export function updateTodo(id, newStatus) {
  return (dispatch) => {
    fetchPut("/todo", { id, newStatus })
      .then((todo) => {
        return dispatch(updateTodoSucces(todo));
      })
      .catch((err) => {
        return dispatch(updateTodoFail(err));
      });
  };
}

export function deleteTodo(id) {
  return (dispatch) => {
    fetchDelete("todo", { id })
      .then((result) => {
        if (result.ok) {
          return dispatch(deleteTodoSucces(id));
        }
      })
      .catch((error) => {
        return dispatch(deleteTodoFail(error));
      });
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] };
    case ACTIONS.GET_TODOS_SUCCESS:
      return { ...state, todos: action.todos, isLoading: false };
    case ACTIONS.GET_TODOS_FAIL:
      return { ...state, error: action.error.message, isLoading: false };
    case ACTIONS.GET_TODOS_STARTED:
      return { ...state, isLoading: true };
    case ACTIONS.ADD_TODO_SUCCES:
      return { ...state, todos: [...state.todos, action.todo] };
    case ACTIONS.ADD_TODO_FAIL:
      return { ...state, error: action.err.message };
    case ACTIONS.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todos: [
          ...state.todos.filter((todo) => todo.id !== action.todo.id),
          action.todo,
        ],
      };
    case ACTIONS.UPDATE_TODO_FAIL:
      return { ...state, error: action.err.message };
    case ACTIONS.DELETE_TODO_SUCCES:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.todoId),
      };
    case ACTIONS.DELETE_TODO_FAIL:
      return { ...state, error: action.error.message };
    default:
      return state;
  }
};

export default reducer;
