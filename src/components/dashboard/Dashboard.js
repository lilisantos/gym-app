import React, {useState} from 'react';
import { 
  createMuiTheme, 
  ThemeProvider, 
  Container, 
  Typography,
  IconButton, 
Box} from '@material-ui/core';  
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import DataUsageIcon from '@material-ui/icons/DataUsage';

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

export default function Dashboard(){
  const classes = useStyles();

  let [nextBooking, setNextBooking] = useState([]);
  var dateFormat = require("dateformat");
  var date = new Date();    
  
  React.useEffect(() => {
    fetch(`http://localhost:8000/bookings/getFirst`)
      .then((response) => response.json())
      .then((json) => setNextBooking(json));
  }, []);

  console.log("book: " + nextBooking);

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

        {/* Card 1 - Current Booking*/}
        <Grid item xs={6}>
          <Grid container justify="center" spacing={0}>          
              <Grid>
              <Card className={classes.root}>
                <CardContent>  
                 {/* Check if there is at least one item stored in the array */}
                 {
                 nextBooking[0] 
                 ?  nextBooking.map((booking) => (
                    <React.Fragment>
                      <Typography variant="h5" >
                        Your next workout
                      </Typography>
                    <Typography className={classes.pos} color="textSecondary" variant="h6">
                        {  date = dateFormat(booking.date, "dddd, mmmm dS @ h:MM TT")}
                      </Typography>
                    </React.Fragment>
                ))
                : <Typography variant="h5" component="h2">
                    There are no upcoming workouts
                  </Typography>                 
                 }             
                 
                </CardContent>               
              </Card>
              </Grid>           
          </Grid>
        </Grid>

         {/* Card 2 */}
        <Grid item xs={6}>
          <Grid container justify="center" spacing={0}>           
              <Grid>
              <Card className={classes.root} justify="center">
                <CardContent>
                <IconButton >
                {/* <EventIcon style={{ fontSize: 40 }}  color="secondary"/>     */}
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
     
        <Card className={classes.root}>
          <CardContent>
          <IconButton >
              <Typography variant="h5">
                <a href='/invoice' className={classes.linkText}> Your invoices </a>              
              </Typography>   
              {/* <DescriptionIcon color="secondary" style={{ fontSize: 40 }}/>                          */}
          </IconButton>     
          </CardContent>              
        </Card>
      </Box> 
       
      </Container>
    </ThemeProvider>
   
  );
}
