import React, {useState} from 'react';
import useToken from '../login/useToken';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const SendBooking = (slotId, slotDate, slotPersonalId) => { 
    // Booking info
    let [userEmail, setUserEmail] = useState();

    // Get userEmail
    const tokenUser = JSON.parse(localStorage.getItem('token'))['user'];
    setUserEmail(tokenUser);

    //Post info to backend API
    return fetch('http://localhost:8000/bookings/add', {
        mode: 'no-cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {
          slotId,
          userEmail, 
          slotPersonalId,
          slotDate
        }
      })
      .then(response => {
        if(response.status === 200){
            const result = response.result;
            console.log("result sendBooking: " + result);
            return result;
        }        
     })  
}

export default SendBooking

