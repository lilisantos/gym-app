import React, {useState, useRef } from 'react';
import { 
  createMuiTheme, 
  ThemeProvider, 
  Container, 
  Typography,
  IconButton, 
  Button,
Box} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Invoice from '../booking/Invoice';
import ReactToPrint from 'react-to-print';
import ReceiptIcon from '@material-ui/icons/Receipt';


export default function Dashboard(){
  const classes = useStyles();
  const componentRef = useRef();
  const [nextBooking, setNextBooking] = useState([]);
  const userEmail = JSON.parse(localStorage.getItem('token'))['user'];
  let [displayInvoice, setDisplayInvoice] = useState(false);
  var dateFormat = require("dateformat");
  var date = new Date();    
  
  //Get next booking
  React.useEffect(() => {
    fetch(`https://fitness-api-cct.herokuapp.com/bookings/getFirst`)
      .then((response) => response.json())
      .then((json) => setNextBooking(json));
  }, []);
  
  const renderInvoice = () => {
    setDisplayInvoice(true);
}

  return (    
    <ThemeProvider theme={theme}>      
      <Container justifyContent='center'>
      <Typography variant="h4" color="secondary">Dashboard</Typography>
      <Box justifyContent="center">
        {/* Grid container */}
      <Grid container 
            className={classes.root} 
            spacing={0} 
            direction="row"
            justify="center"
            alignItems="flex-start" 
      >

        {/* Card 1 - Next Booking*/}
        <Grid item xs={6}>
          <Grid container justify="center" spacing={0}>          
              <Grid>
              <Card className={classes.root}>
                <CardContent>  
                 {/* Check if there is at least one item stored in the array */}
                 {
                 nextBooking[0]  ? 
                    <React.Fragment>
                      <Typography variant="h5" >
                        Your next workout
                      </Typography>
                    <Typography className={classes.pos} color="textSecondary" variant="h6">
                        {  date = dateFormat(nextBooking[0].date, "dddd, mmmm dS @ h:MM TT")}
                      </Typography>
                    </React.Fragment>
               
                : 
                // Shows message if there is no upcoming bookings
                <Typography variant="h5" component="h2">
                    There are no upcoming workouts
                  </Typography>                 
                 }             
                 
                </CardContent>               
              </Card>
              </Grid>           
          </Grid>
        </Grid>

         {/* Card 2 - Link to Booking Component */}
        <Grid item xs={6}>
          <Grid container justify="center" spacing={0}>           
              <Grid>
              <Card className={classes.root} justify="center">
                <CardContent>
                <IconButton >                
                  <Typography variant="h5" component="h2">
                    <a href='/booking' className={classes.linkText}> Book a workout </a>
                  </Typography>          
                </IconButton>     
                </CardContent>              
              </Card>
              </Grid>            
          </Grid>
        </Grid>
      </Grid>      
        
        {/* Nutritional Intake
        ** This features was not completed, but the layout has already been set for further development
        */}
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h3">
              Your daily nutrition goal
            </Typography>    
            <Grid container className={classes.root} spacing={0} className={classes.pos}>
            
              <Grid item xs={3}>
                <Grid container justify="center" spacing={0} >          
                    <Grid>
                    <Typography variant="subtitle1" >
                      Calories
                    </Typography>   
                    <Typography variant="body2" component="b1">
                      2100cal
                    </Typography>   
                    <DataUsageIcon color="secondary" className={classes.pos}/>
                    </Grid>           
                </Grid>
              </Grid>
              
              <Grid item xs={3}>
                <Grid container justify="center" spacing={0} >           
                    <Grid>
                    <Typography variant="subtitle1" >
                      Protein
                    </Typography>  
                    <Typography variant="body2" >
                      135g
                    </Typography>   
                    <DataUsageIcon color="secondary" className={classes.pos} />
                    </Grid>            
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container justify="center" spacing={0} >           
                    <Grid>
                    <Typography variant="subtitle1" >
                      Carbs
                    </Typography> 
                    <Typography variant="body2" >
                      246g
                    </Typography> 
                    <DataUsageIcon color="secondary" className={classes.pos} />
                    </Grid>            
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container justify="center" spacing={0} >           
                    <Grid>
                    <Typography variant="subtitle1" >
                      Fats
                    </Typography>  
                    <Typography variant="body2" >
                      73g
                    </Typography> 
                    <DataUsageIcon color="secondary" className={classes.pos}/>
                    </Grid>            
                </Grid>
              </Grid>
            </Grid>                   
            
          </CardContent>              
        </Card>
     
      {/* Render invoice component */}
        <Card className={classes.invoice}>
          <CardContent >
            <Typography variant="h5" component="h3">
              Your invoices
            </Typography> 
            <IconButton
              onClick={renderInvoice}
            >            
              <ReceiptIcon/>              
              <Typography variant="subtitle1" component="h2">
                View invoice
              </Typography> 
            </IconButton>  
            {displayInvoice &&
                <div>
                  <ReactToPrint
                      trigger={() => 
                        <Button
                        variant="contained"
                        color="primary"
                        >
                            Print invoice
                        </Button>
                      }
                      content={() => componentRef.current}
                  />
                  <Invoice ref={componentRef} />
                </div>
            }
          </CardContent>              
        </Card>
      </Box> 
       
      </Container>
    </ThemeProvider>
   
  );
}
//Theme styles
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
    height: 150,
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
   
  },
  invoice: {    
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,   
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginTop: 10,
    marginBottom: 15,
  },
  control: {
    padding: theme.spacing(2),
  },
  linkText: {
    textDecoration: `none`,
    color: `black`
},
}));
