import * as React from "react"
import { 
    IconButton,  
    Drawer, 
    createMuiTheme, 
    ThemeProvider  } from "@material-ui/core"
import { Menu } from "@material-ui/icons"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Dashboard from '../dashboard/Dashboard'
import App from '../../App';
import Booking from '../booking/Booking'
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Typography from '@material-ui/core/Typography';
import { Route, MemoryRouter as Router } from 'react-router';
import { Link  } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EventIcon from '@material-ui/icons/Event';

import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
    list: {
    //   width: 250,
    },
    linkText: {
      textDecoration: `none`,
      textTransform: `uppercase`,
      color: `black`,
    },
  });

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

const SideDrawer = ({navLinks}) => {
    const classes = useStyles();

    const [state, setState] = useState({ right: false })

    const toggleDrawer = (anchor, open) => (event) => {
        if (
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return
        }
        setState({ [anchor]: open })
    };

    const sideDrawerList = (anchor) => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >        
    {/* <Router>
      <List 
          component="nav" 
          aria-labelledby="main navigation"
          className={classes.navDisplayFlex}                                    
      >                                       
       
              <ListItem button>
                  <Link to='/' className={classes.linkText}>Home</Link>
              </ListItem>    
              <ListItem button>
                  <Link to='/dashboard' className={classes.linkText}>Dashboard</Link>
              </ListItem>    
              <ListItem button>
                  <Link to='/booking' className={classes.linkText}>Booking</Link>
              </ListItem>           
              <Route exact path='/' component={App}/>
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/booking' component={Booking} />                                              
          
      </List>
  </Router>  */}
     <List component="nav">
      {navLinks.map(({ title, path }) => (
        <a href={path} key={title} className={classes.linkText} /*Add this*/>
          <ListItem button>
            <ListItemText primary={title} />
          </ListItem>
        </a>
      ))}
    </List>
          
        </div>
      );     

    return(
        <ThemeProvider theme={theme}>
            <React.Fragment>
                <IconButton 
                    edge="start" 
                    arial-lable="menu"
                    onClick={toggleDrawer("right", true)}
                >
                    <Menu fontSize="large" color= "secondary" />
                </IconButton>
                <Drawer
                    anchor="right"
                    open={state.right}
                    onOpen={toggleDrawer("right", true)}
                    onClose={toggleDrawer("right", false)}
                >
                    {sideDrawerList("right")}
                </Drawer>
            </React.Fragment>
        </ThemeProvider>
    )
}

export default SideDrawer