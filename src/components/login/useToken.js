import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        //Takes a key as an argument and returns the string
        const tokenString = localStorage.getItem('token');

        //Convert the string to an object with JSON.parse
        const userToken = JSON.parse(tokenString);
        
        return userToken?.token
    };  

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        //Save userToken into localStorage
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken.token);
      };

    return {
    setToken: saveToken,
    token
    }

}