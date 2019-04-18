import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Header from './components/Header'
import CheckboxList from './components/CheckboxList';
import CalendarFull from './components/CalendarFull';
import CalendarToast from './components/CalendarToast';
import CalendarBig from './components/CalendarBig';


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

function BigCalendar() {
  return <div>
    <CalendarBig />
  </div>;
}

function FullCalendar(){
  return <div className="amazebert" style={{height: '800px', width: '800px'}}>
    <CalendarFull/>
  </div>
}


function ToastCalendar(){
  return <div className="amazebert" style={{height: '800px'}}>
    <CalendarToast/>
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
                  <li>
                    <Link to="/calendar-toast/">Calendar (Toast Calendar)</Link>
                  </li>
                  <li>
                    <Link to="/calendar-big/">Calendar (Big Calendar)</Link>
                  </li>
                </ul>
              </nav>

              <Route path="/" exact component={Dashboard} />
              <Route path="/todos/" component={Todos} />
              <Route path="/calendar-full/" component={FullCalendar} />
              <Route path="/calendar-toast/" component={ToastCalendar} />
              <Route path="/calendar-big/" component={BigCalendar} />
            </div>
          </Router>
       

      </div>
    );
  }
}

export default App;
