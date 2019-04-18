import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/Header'
import CheckboxList from './components/CheckboxList';
import CalendarFull from './components/CalendarFull';

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

function FullCalendar(){
  return <div className="container">
    <CalendarFull/>
  </div>
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
                    <Link to="/calendar-full/">Calendar (FullCalendar)</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={Dashboard} />
              <Route path="/todos/" component={Todos} />
              <Route path="/calendar-full/" component={FullCalendar} />
            </div>
          </Router>
       

      </div>
    );
  }
}

export default App;
