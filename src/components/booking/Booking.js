import React, {useState} from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
  Button, 
  Container, 
  Typography,
  Box } from '@material-ui/core';
import 'react-date-picker/dist/DatePicker.css';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#343a40"
    },
    secondary: {
      main: "#F7855B"
    }
  },
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

async function sendBooking({slotId, slotDate, slotPersonalId}){ 
  //Get data from localStorage
  const userEmail  = JSON.parse(localStorage.getItem('token'))['user'];
  const token = JSON.parse(localStorage.getItem('token'));

  //Post info to backend API
   fetch('http://localhost:8000/bookings/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `jwt=${token}`
      },
      body: JSON.stringify({slotId, slotDate, slotPersonalId, userEmail})
    })    
    .then(response => {
      console.log(response.status);
      return response.status;
    })
    // .then(json => setShowSuccess(true))    
    // .catch(err => {
    //   console.log(err);    
    //   //Change the state here which will show your Alert
    //   setShowError(true)
    // })
}

export default function Booking() { 
  const classes = useStyles();
  
  let [selectedDay, setSelectedDay] = useState('');  
  let [queryDay, setQueryDay] = useState('');  
  let [slotList, setSlotList] = useState([]);
  let [slotId, setSlotId] = useState(null);
  let [slotPersonalId, setSlotPersonalId] = useState('');
  let [slotDate, setSlotDate] = useState('');

  //Validation and error checking variables
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  let [showError, setShowError] = useState(false);
  let [showSuccess, setShowSuccess] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState();

  var dateFormat = require("dateformat");
  var date = new Date('');

    React.useEffect(() => {
      fetch(`http://localhost:8000/slots/getByDate/${queryDay}`)
        .then((response) => response.json())
        .then((json) => setSlotList(json));
    }, [queryDay]);          
          
    const handleDayClick = (day) => {
      setSelectedDay(day);
      setQueryDay(dateFormat(selectedDay, "yyyy-mm-dd")); 
  };
  
  const [selectedIndex, setSelectedIndex] = useState(1);
  //Handle selected item
  const handleListItemClick = (event, index, slot_id, slot_personal, slot_date) => {
    setSelectedIndex(index);
    setSlotId(slot_id);
    setSlotPersonalId(slot_personal);
    setSlotDate(slot_date);
  };
 
  const handleSubmit = async e => {
    e.preventDefault();

    //Validates if a slot has been selected
    if(!slotId){
      setHelperText('Please select a slot');
      setError(true);
    }
    //Sets variable to check and render component SendBooking
    // setIsSubmitted(true);
      //Calls component to post new booking
    // <SendBooking slotId={slotId} slotPersonalId={slotPersonalId} slotDate={slotDate}/>
   console.log("== SUBMIT - slotId: " + slotId + "   - personal: " + slotPersonalId + "  - slotDate: " + slotDate);

   try{
    const responseBooking = await sendBooking({slotId, slotDate, slotPersonalId});  
    setIsSubmitted(true); 
   }catch(ex){
    console.log("response error:" + isSubmitted); 
   }

  }

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
                          onDayClick={handleDayClick}        
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
                      <Typography variant="h6" >
                        { dateFormat(slotList[0].date, "dddd, mmmm dS")}
                      </Typography> 
                    : 
                    <Typography variant="h6">
                      Sorry, there are no available slots on this date
                      </Typography> 
                    }
                    <form 
                        className={classes.form} 
                        onSubmit={handleSubmit}
                        error={error}
                    >
                        
                    {/* Check if there is at least one item stored in the returned array */}
                    {
                      slotList[0] 
                      ?  slotList.map((slot, index) => (
                         //Increase the counter for index
                         <React.Fragment>  
                           <List 
                              component="nav" 
                              className={classes.root} 
                              aria-label="mailbox folders"
                            > 
                              <ListItem 
                                button
                                key={slot._id}
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index, slot._id, slot.personal, slot.date)} 
                              >
                               
                                <ListItemText
                                   primary={date = dateFormat(slot.date, "hh:MM TT")}
                                />
                              </ListItem>
                              <Divider color="primary"/>  
                              </List>     
                        </React.Fragment>     
                                       
                    ))
                    : <Typography variant="h5" component="h2">
                      </Typography>  
                      }    
                      <FormHelperText>{helperText}</FormHelperText>
                       <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                      >
                         Book selected slot
                      </Button>                                       
                      </form>  

                      {isSubmitted &&
                         <Alert severity="success">Booking added!</Alert>
                        
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

