import React, { memo } from "react";
import { List, Paper } from "@material-ui/core";
import TodoItem from "./TodoItem";
import moment from 'moment';

import ItemEditable from './../components/ItemEditable';

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
          <Paper >
              <List dense={true}>
                {sorted.map((todo, idx) => {
                  // return <TodoItem
                  //     key={`TodoItem.${idx}`}
                  //     showDate={props.showDate}
                  //     todo={todo}
                  //     user={props.user}
                  //     divider={idx !== props.todos.length - 1}
                  //     deleteTodo={props.deleteTodo}
                  //     updateTodo={props.updateTodo} />
                  return <ItemEditable 

                      key={idx} 
                      item={todo}
                      showDate={props.showDate}
                      showDateSelect={true}
                      label="Add to-do"
                      handleUpdate={props.handleUpdate}
                      handleDelete={() => props.handleDelete(todo.id)} />
                })}
              </List>
          </Paper>
        )}
    </div>
)});

export default TodoList;
