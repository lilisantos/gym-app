import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './components/navbar/Header';
import Dashboard from './components/dashboard/Dashboard';
import Booking from './components/booking/Booking';

const rootElement = document.getElementById("root");

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>  
        <li>
          <Link to="/booking">Booking</Link>
        </li>       
      </ul>
      <Route exact path="/" component={App} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/booking" component={Booking} />
    </div>
  </Router>

);


ReactDOM.render(
  <React.StrictMode>
    {/* <Header /> */}
    <App />
  </React.StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
