import * as React from "react"
import { 
    IconButton,     
    Container,
    Hidden, 
    Toolbar, 
    AppBar, 
    Fab, 
    createMuiTheme, 
    ThemeProvider, 
    Typography
     } from "@material-ui/core"
import { KeyboardArrowUp } from "@material-ui/icons"
import { makeStyles } from "@material-ui/core/styles"
import SideDrawer from "./SideDrawer"
import HideOnScroll from "./HideOnScroll"
import BackToTop from "./BackToTop";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
      },
    navDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    },
    root: {
        width: 360,
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

const navLinks = [
    // { title: `App`, path: `/` },
    { title: `Dashboard`, path: `/` },
    { title: `Booking`, path: `/booking` },
    { title: `Food Diary`, path: `/diary` },
    // { title: `Logout`, path: `/logout` },
  ];

  const Header = () => {

    const classes = useStyles(); 

    return (
        
        <ThemeProvider theme={theme}> 
            <HideOnScroll>
                <AppBar position="fixed">
                    <Toolbar>
                        <Container className={classes.navbarDisplayFlex}>
                            <IconButton edge="start" aria-label="home" >
                                <Typography variant="h4" color="secondary">
                                    FitnessApp
                                </Typography>
                            </IconButton>
                            {/* Renders menu bar on small port views  */}
                            <Hidden smDown>
                                 <List
                                    component="nav"
                                    aria-labelledby="main navigation"
                                    className={classes.navDisplayFlex} // this
                                    >
                                    {navLinks.map(({ title, path }) => (
                                        <a href={path} key={title} className={classes.linkText}>
                                        <ListItem button>
                                            <ListItemText primary={title} />
                                        </ListItem>
                                        </a>
                                    ))}
                                </List>
                            
                            </Hidden>

                             {/* Renders hamburg icon on medium port views  */}
                            <Hidden mdUp>
                                <SideDrawer navLinks={navLinks} /> 
                            </Hidden>
                        </Container>            
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            
            <Toolbar id="back-to-top-anchor" />    
            <BackToTop>
                <Fab color="secondary" size="large" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </Fab>
            </BackToTop>   
        </ThemeProvider>      
       
        
         
    )
  }
  export default Header