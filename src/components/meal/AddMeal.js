import React, {useState} from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
  IconButton, 
  Container, 
  Typography,
  Box } from '@material-ui/core';
import { spacing } from '@material-ui/system';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

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
    '& > *': {
      margin: theme.spacing(1),
      minWidth: 120,  

    },
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 220,  
    width: '100%',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 120
  },

}));

export default function AddMeal() { 
  const classes = useStyles();
    let [type, setType] = useState();  
    const [data, setData] = useState( [{ foods:[] }]);
    const [query, setQuery] = useState('');
    const [search, setSearch] = useState('');    
    const [food, setFood] = useState([]);
    const [cal, setCal] = useState([]);

    function catchFood(){
      if (query != null){
        
          fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${query}&app_id=84f0b650&app_key=717d2a04acb3c5c37eba37b2e06b74b2`)
          .then((response) => {       
            return response.json();
          })
          .then((json) => {
            setFood(json.hints[1].food.label);
            setCal(json.hints[1].food.nutrients.ENERC_KCAL);
          })
      }
    }  

    // Handle change on select field
    const handleChange = (event) => {
      setType(event.target.value);
    }; 

    const handleSubmit = async e => {
      e.preventDefault();
      const dataReturned = catchFood(query);
      // setData(dataReturned);

      console.log("data json: " + dataReturned);

      // setFood(dataReturned.hints[1].food.label);
      // setCal(dataReturned.hints[1].food.nutrients.ENERC_KCAL);
    }


    console.log("1- search: " + search);
    console.log("2- query: " + query); 

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" color="secondary">Add a meal</Typography>   
          <Box justifyContent="center">  
            <form 
              className={classes.formControl}
              noValidate
              onSubmit={handleSubmit}
            >
              <InputLabel id="meal-type-label">Meal type</InputLabel>
              <Select
                labelId="meal-type-label"
                id="meal-type"
                value={type}
                onChange={handleChange}
                className={classes.selectEmpty}
              >
                <MenuItem value="" disabled>Select a meal type</MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
              </Select>
              
              <TextField 
                id="search" 
                label="Search for a food" 
               
              />
              <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <SearchIcon />
                </Button>
            </form>                 
                  
            {/* Check if there is at least one item stored in the returned array */}
              {
              data[0] 
              ?  data.map((item) => (
                <React.Fragment>                
                  <List 
                      component="nav" 
                      className={classes.root} 
                      aria-label="mailbox folders"
                    >
                      <ListItem button>            
                        <ListItemText primary={food} />
                      </ListItem>
                      <Divider />   
                  </List>  
                </React.Fragment>                   
                    
                
            ))
            : <Typography variant="h5" component="h2">
                Sorry, there are no available slots on this date
              </Typography>                 
              }               
         </Box>
      </Container>
    </ThemeProvider>   
  );
}

