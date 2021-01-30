import React, {useState} from 'react';
import {
  createMuiTheme, 
  ThemeProvider, 
  Container, 
  Typography,
  Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';
import Alert from '@material-ui/lab/Alert';

const API_ID = process.env.REACT_APP_FOOD_DB_API_ID;
const API_KEY = process.env.REACT_APP_FOOD_DB_API_KEY;

async function catchFood(search){
  console.log("inside catch: " + search)
  return new Promise((resolve, reject) => {
    const rows = [];

    if (search){    
      fetch(`https://api.edamam.com/api/food-database/v2/parser?ingr=${search}&app_id=${API_ID}&app_key=${API_KEY}`)
      .then(response => response.json())
      .then(response => {
        if (response.hints.length) { //get the length of the json returned

          //gets each element of the json and creates a new element in the array 
          response.hints.forEach(hint => {
            rows.push(createData(
              hint.food.foodId,
              hint.food.label, 
              hint.food.nutrients.ENERC_KCAL, 
              hint.food.nutrients.CHOCDF,
              hint.food.nutrients.PROCNT,              
              hint.food.nutrients.FAT
              ))           
          })
          console.log("row: " + JSON.stringify(rows))
          resolve(rows);
        }else{
          resolve(rows);
        }
      })
    }
  })
}

async function sendMeal({type, food, calories, carbs, protein, fat}){ 
  //Get data from localStorage
  const userEmail  = JSON.parse(localStorage.getItem('token'))['user'];
  const token = JSON.parse(localStorage.getItem('token'));

  //Post info to backend API
   fetch('http://localhost:8000/member_meals/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `jwt=${token}`
      },
      body: JSON.stringify({type, food, calories, carbs, protein, fat, userEmail})
    })    
    .then(response => {
      console.log(response.status);
      return response.status;
    })   
}

//Setup datagrid to display the elements returned
const columns = [
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'calories', headerName: 'Calories', width: 100, },
  { field: 'protein', headerName: 'Protein&nbsp;(g)', width: 90, },
  { field: 'carbs', headerName: 'Carbs&nbsp;(g)', width: 90, },
  { field: 'fat', headerName: 'Fat&nbsp;(g)', width: 90, },
  
];

//Creates each element to display on the list
function createData(foodId, name, calories, carbs, protein, fat) {
  return { foodId, name, calories, carbs, protein, fat };
}

//Formats the text coming for the api response
function capitalize(str){
  //Capitalize the first letter and set lower case for the rest
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function formatDecimal(num){
  return Number.parseFloat(num).toFixed(0);
} 

export default function AddMeal() { 
  const classes = useStyles();

    let [type, setType] = useState(' ');  
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');    
    const [food, setFood] = useState('');
    const [calories, setCalories] = useState('');
    const [carbs, setCarbs] = useState('');
    const [protein, setProtein] = useState('');
    const [fat, setFat] = useState('');

     //Validation and error checking variables
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    let [showError, setShowError] = useState(false);
    let [showSuccess, setShowSuccess] = useState(false);
    let [isSubmitted, setIsSubmitted] = useState();

    // Handle change on select field
    const handleChangeSearch = (event) => {
      const s = event.target.value.toString();
      setSearch(s);    
    }; 
    // Handle change on select field
    const handleChangeType = (event) => {
      setType(event.target.value);     
    }; 

    const handleSubmitSearch = async e => {
      e.preventDefault();    
      console.log("search sub: " + search)
      try{
        const foods = await catchFood(search);     
      
        setData(foods);
      }catch(ex){
       return {error: ex}
      }      
    }

  const [selectedIndex, setSelectedIndex] = useState();
  //Handle selected item
  const handleRowClick = (event, 
    index, 
    name, 
    calories,
    carbs,
    protein,
    fat) => {

    setSelectedIndex(index);
    setFood(name);
    setCalories(calories);
    setCarbs(carbs);
    setProtein(protein);
    setFat(fat);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    //Calls function to post new booking
   console.log("== SUBMIT - food: " + food + "   - cal: " + calories + "  - carbs: " + carbs+ "  - protein: " + protein+ "  - fat: " + fat);

   try{
    const responseMeal = await sendMeal({type, food, calories, carbs, protein, fat});  
    setIsSubmitted(true); 
   }catch(ex){
    console.log("response error:" + ex); 
   }

  }


  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" color="secondary" component={'span'}>Add a meal</Typography>   
          <Box justifyContent="center">  
            {/* Form to execute search for a food */}
            <form 
              className={classes.formControl}
              onSubmit={handleSubmitSearch} 
            >
              <InputLabel id="meal-type-label">Meal type</InputLabel>
              <Select
                labelId="meal-type-label"
                id="meal-type"
                value={type}
                onChange={handleChangeType}
                className={classes.selectEmpty}
                required
              >
                <MenuItem value="" disabled>Select a meal type</MenuItem>
                <MenuItem value="Breakfast">Breakfast</MenuItem>
                <MenuItem value="Lunch">Lunch</MenuItem>
                <MenuItem value="Dinner">Dinner</MenuItem>
                <MenuItem value="Snack">Snack</MenuItem>
              </Select>
              
              <TextField 
                type="text"
                id="search" 
                name="search"
                label="Search for a food"               
                onChange={handleChangeSearch}
                required
              />
              <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <SearchIcon />
                </Button>
            </form>      
           
           {/* Form to submit food */}
            <form
              className={classes.formControl}
              onSubmit={handleSubmit}
              error={error} 
            >
              <FormHelperText>{helperText}</FormHelperText>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                    Add selected meal
                  </Button>     
                  {isSubmitted &&
                      <Alert severity="success">Meal added!</Alert>
                  }

            <TableContainer component={Paper}>
              <Table className={classes.table}  className={classes.root} size="small" aria-label="foods">
                <TableHead>               
                  <TableRow>
                    <TableCell>Food</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>                    
                  </TableRow>
                </TableHead>
                <TableBody>
                

                  {data[0]
                  ?
                  data.map((food, index) => (
                    <TableRow 
                      key={food.food_id} 
                    >
                      <TableCell component="th" scope="row">
                      <ListItem 
                        button
                        key={food.foodId}
                        selected={selectedIndex === index}
                        onClick={(event) => handleRowClick(
                          event, 
                          index, 
                          food.name, 
                          food.calories,
                          food.carbs,
                          food.protein,
                          food.fat,
                        )} 
                      >
                          <ListItemText
                              primary={capitalize(food.name)} 
                          />
                        </ListItem>
                      
                      </TableCell>
                      <TableCell align="right" >{formatDecimal(food.calories)}</TableCell>
                      <TableCell align="right">{formatDecimal(food.carbs)}</TableCell>
                      <TableCell align="right">{formatDecimal(food.protein)}</TableCell>
                      <TableCell align="right">{formatDecimal(food.fat)}</TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow>
                      <TableCell component="th" scope="row">
                        No results found
                      </TableCell>
                    </TableRow>
                  }
                   
                </TableBody>
              </Table>
            </TableContainer>
            </form>  
           


              {/* { data 
                ?  data.map(() => (
                  <React.Fragment>        
                    <List 
                        component="nav" 
                        className={classes.root} 
                        aria-label="foods"
                      >
                        <ListItem button>            
                          <ListItemText 
                            primary={food.label} 
                            secondary={
                              <React.Fragment>
                                <div class="row">                                
                                  <Typography variant="h6" component={'span'}>
                                      Label
                                  </Typography>   
                                  <div key={food.calories} class="column">cal{food.calories}</div>
                                  <div key={food.divrotein}  class="column">protein{food.protein}</div>
                                  <div key={food.carbs}  class="column">carbs{food.carbs}</div>
                                  <div key={food.fat}  class="column">fat{food.fat}</div>  
                                </div>
                              </React.Fragment>
                                
                              
                            }
                          />
                        </ListItem>
                        <Divider />   
                    </List> 
                    </React.Fragment>  
                ))
                : 
                <Typography variant="h5" component={'span'}>
                    No results
                </Typography>   
              
                }                        */}
                    
         </Box>
      </Container>
    </ThemeProvider>   
  );
}

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
  table: {
    minWidth: 650,
    textTransform: 'capitalize',
  },

}));


