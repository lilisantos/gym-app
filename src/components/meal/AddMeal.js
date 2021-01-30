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
  },

}));

async function catchFood(search){
  return new Promise((resolve, reject) => {
    const rows = [];

    if (search){    
      fetch('https://api.edamam.com/api/food-database/v2/parser?ingr='+search+'&app_id=84f0b650&app_key=717d2a04acb3c5c37eba37b2e06b74b2')
      .then(response => response.json())
      .then(response => {
        if (response.hints.length) { //get the length of the json returned

          //gets each element of the json and creates a new element in the array 
          response.hints.forEach(hint => {
            rows.push(createData(
              hint.food.label, 
              hint.food.nutrients.ENERC_KCAL, 
              hint.food.nutrients.PROCNT,
              hint.food.nutrients.FAT
              ))           
          })
          resolve(rows);
        }
      })
    }
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
function createData(name, calories, carbs, protein, fat) {
  return { name, calories, carbs, protein, fat };
}


export default function AddMeal() { 
  const classes = useStyles();

    let [type, setType] = useState(' ');  
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('');    
    const [food, setFood] = useState([]);
    const [cal, setCal] = useState([]);

    // Handle change on select field
    const handleChange = (event) => {
      const s = event.target.value.toString();
      setSearch(s);
      console.log("search: " + search)
    }; 

    const handleSubmit = async e => {
      e.preventDefault();     
      console.log("search submit: " + search)
     
      try{
        const foods = await catchFood(search);
        console.log("foods: " + JSON.stringify(foods));
        setData(foods);
      }catch(ex){
        console.log("====error submit: " + ex);
      }      
    }

    const [selectedIndex, setSelectedIndex] = useState(1);
    //Handle selected item
    const handleRowClick = (event, index, food) => {
      setSelectedIndex(index);
    };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h4" color="secondary" component={'span'}>Add a meal</Typography>   
          <Box justifyContent="center">  
            <form 
              className={classes.formControl}
              onSubmit={handleSubmit} 
            >
              <InputLabel id="meal-type-label">Meal type</InputLabel>
              <Select
                labelId="meal-type-label"
                id="meal-type"
                value={type}
                // onChange={handleChange}
                className={classes.selectEmpty}
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
                onChange={handleChange}
              />
              <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    <SearchIcon />
                </Button>
            </form>      
            <div style={{ height: 400, width: '100%' }}>
              <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
            </div>
            {/* <TableContainer component={Paper}>
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
                  {data
                  ?
                  data.map((food, index) => (
                    <TableRow 
                      key={food.name} 
                      onRowClick={(event) => handleRowClick(event, food.name)} 
                    >
                      <TableCell component="th" scope="row">
                        {food.name}
                      </TableCell>
                      <TableCell align="right">{food.calories}</TableCell>
                      <TableCell align="right">{food.fat}</TableCell>
                      <TableCell align="right">{food.carbs}</TableCell>
                      <TableCell align="right">{food.protein}</TableCell>
                    </TableRow>
                  ))
                  :
                  <TableRow key={food.name}>
                      <TableCell component="th" scope="row">
                        No results found
                      </TableCell>
                    </TableRow>
                  }
                </TableBody>
              </Table>
            </TableContainer> */}


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

