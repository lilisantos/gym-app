import React, {Component, useState} from 'react';
import { createMuiTheme, ThemeProvider, Button, Container, Typography } from '@material-ui/core';
import Header from '../src/components/navbar/Header';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Dashboard from '../src/components/dashboard/Dashboard'
import Booking from '../src/components/booking/Booking'
import AddMeal from '../src/components/meal/AddMeal'
import Login from './components/login/Login'
import useToken from './components/login/useToken'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#343a40"
    },
    secondary: {
      main: "#F7855B"
    }
  }
});



export default function App() {      
  const { token, setToken } = useToken();

  if(!token) {
    return <Login setToken={setToken} />
  }
 
  return (
    <div className="wrapper">
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <div className="container mt-2" style={{ marginTop: 40 }}>
          <Switch>
            {/* <Route exact path="/">
              <App />
            </Route> */}
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route path="/booking">
              <Booking />
            </Route>
            <Route path="/diary">
              <AddMeal />
            </Route>
            {/* <Route path="/logout">
              <Logout />
            </Route> */}
          </Switch>
        </div>
      </BrowserRouter>
    </ThemeProvider>
    </div>
  );
}