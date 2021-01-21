import React, {useState} from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
  Button, 
  Container, 
  Typography,
  Box } from '@material-ui/core';
import Header from '../navbar/Header';
import Calendar from 'react-calendar';
import 'react-date-picker/dist/DatePicker.css';
import { spacing } from '@material-ui/system';

import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#343a40"
    },
    secondary: {
      main: "#F7855B"
    }
  },
  backgroundColor: "#F7855B"
});


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: 600,
    display:`flex`,    
    backgroundColor: theme.palette.background.paper,
    marginTop: 20,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 200,
  },
}));


export default function Booking() { 
  const classes = useStyles();

    let [selectedDay, setSelectedDay] = useState('');  
    let [bookingList, setBookingList] = useState([]);
    let [slotList, setSlotList] = useState([]);

    var dateFormat = require("dateformat");
    var date = new Date('');
  
    React.useEffect(() => {
      fetch(`http://localhost:8000/slots/get/${selectedDay}`)
        .then((response) => response.json())
        .then((json) => setSlotList(json));
    }, [selectedDay]);     

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" color="secondary">Book a workout</Typography>     
        <Box justifyContent="center">
        {/* Grid container */}
          <Grid container
                direction="row"
                justify="center"
                alignItems="flex-start" 
                className={classes.root} 
                spacing={2} >

            {/* Card 1 - Current Booking*/}
            <Grid item>
              <Grid container item justify="center" spacing={2}>          
                  <Grid>
                    <Card className={classes.root}>
                      <CardContent>          
                        <DayPicker        
                          id="date"
                          label="Date"
                          onDayClick={setSelectedDay}       
                          className={classes.root}        
                        />                    
                      </CardContent>               
                    </Card>
                  </Grid>           
              </Grid>
            </Grid>

            {/* Card 2 */}
            <Grid item>
              <Grid container justify="center" spacing={2}>           
                  <Grid>
                  <Card className={classes.root} justify="center">
                    <CardContent>
                    { slotList[0] 
                    ? 
                      <Typography variant="h5">
                        { dateFormat(slotList[0].date, "dddd, mmmm dS")}
                      </Typography> 
                    : 
                    <Typography variant="h5">
                      </Typography> 
                    }
                  
                    {/* Check if there is at least one item stored in the returned array */}
                    {
                      slotList[0] 
                      ?  slotList.map((slot) => (
                        <React.Fragment>
                        
                          <List 
                              component="nav" 
                              className={classes.root} 
                              aria-label="mailbox folders"
                            >
                              <ListItem button>            
                                <ListItemText primary={  
                                    date = dateFormat(slot.date, "hh:MM")
                                } />
                              </ListItem>
                              <Divider />   
                          </List>  
                        </React.Fragment>                   
                            
                        
                    ))
                    : <Typography variant="h5" component="h2">
                        Sorry, there are no available slots on this date
                      </Typography>                 
                      }               
                    </CardContent>              
                  </Card>
                  </Grid>            
              </Grid>
            </Grid>
          </Grid>      
      </Box>    
     
        
    </Container>
    </ThemeProvider>   
  );
}

