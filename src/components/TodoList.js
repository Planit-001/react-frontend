import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";
import TodoItem from "./TodoItem";
import moment from 'moment';

function sortTodos(todos){
  if (todos.length >= 1){
    return todos.sort((a, b) => {
      if(a.done === b.done){
        return a.id < b.id ? 1 : -1
      }
      return a.done ? 1 : -1 
    })
  }else{
    return todos
  }
}

function sortByDate(todos){
  if (todos.length >= 1){
    return todos.sort((a,b) => moment(a.due_date).format('YYYYMMDD') - moment(b.due_date).format('YYYYMMDD'))
  }else{
    return todos
  }
}


const TodoList = memo(props => {
  const sorted = props.sortByDate ? sortByDate(props.todos) : sortTodos(props.todos);
    return (
    <div>
        {props.todos && props.todos.length > 0 && (
          <Paper style={{ margin: 16 }}>
              <List dense={true}>
                {sorted.map((todo, idx) => (
                    <TodoItem
                      showDate={props.showDate}
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
