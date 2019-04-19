import { ADD_TODO } from "../constants/actionTypes";

export function addTodo(payload) {
    return { type: ADD_TODO, payload }
  };