import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TodosContainer from './components/TodosContainer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Header from './components/Header'
import CheckboxList from './components/CheckboxList';

function Todos() {
  return  <div>
      <div className="container">
        <div className="header">
          <h1>Todo List</h1>
        </div>
        <CheckboxList />
        {/* <TodosContainer /> */}
    </div>
  </div>;
}

function Dashboard() {
  return <h2>Dashboard</h2>;
}

function Calendar() {
  return <h2>Calendar</h2>;
}


class App extends Component {
  render() {
    return (
      <div>
          <Header />
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/todos/">Todos</Link>
                  </li>
                  <li>
                    <Link to="/calendar/">Calendar</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={Dashboard} />
              <Route path="/todos/" component={Todos} />
              <Route path="/calendar/" component={Calendar} />
            </div>
          </Router>
       

      </div>
    );
  }
}

export default App;
