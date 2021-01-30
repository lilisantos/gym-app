import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  ThemeProvider, 
  Container, 
  Typography,
Box} from '@material-ui/core';  
import PropTypes from 'prop-types';

const styles = ({
  table: {
    minWidth: 700,
  },
});

class Invoice extends React.Component{
  
  render(){
    
    return (
      <ThemeProvider >
      <Container justifyContent='center'>
        <Typography variant="h" color="secondary">Your invoice</Typography>     
        <Box justifyContent="center">
        <Typography variant="h4" color="secondary">
            FitnessGym
        </Typography>
        <Typography variant="h6" color="primary">
            Liliane Santos
        </Typography>
        <Typography variant="body1" color="primary">
            Date generated: 30/01/2021
        </Typography>
          <TableContainer component={Paper} fullWidth>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="left" colSpan={4}>
                    Details
                  </TableCell>
                  <TableCell align="right">Price</TableCell>
                </TableRow>                
              </TableHead>
              <TableBody>
                  <TableRow>
                    <TableCell colSpan={4}>Individual training on 30/01/2021</TableCell>
                    <TableCell align="right">€50</TableCell>
                  </TableRow>
              
                <TableRow>
                  <TableCell colSpan={4} align="right">Total</TableCell>
                  <TableCell align="right">€50</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Container>
      </ThemeProvider>   
    );
  }
  
}
Invoice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Invoice);