import React, { memo } from "react";
import { List, Paper, Grid } from "@material-ui/core";

import TodoListItem from "./TodoItem";

function sortTodos(todos){
  if (todos.length >= 1){
    return todos.sort((a, b) => (a.id < b.id) ? 1 : -1)
  }else{
    return todos
  }
}


const TodoList = memo(props => {  
  console.log("props.todos: ", props)
    return (
    <div>
        {props.todos && props.todos.length > 0 && (
        <Paper style={{ margin: 16 }}>
            <List style={{ overflow: "scroll" }}>
            {props.todos.map((todo, idx) => (
                <TodoListItem
                  todo={todo}
                  key={`TodoItem.${idx}`}
                  divider={idx !== props.todos.length - 1}
                  deleteTodo={props.deleteTodo}
                  updateTodo={props.updateTodo}
                />
            ))}
            </List>
        </Paper>
        )}
    </div>
)});

export default TodoList;