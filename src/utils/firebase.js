import axios from 'axios';
const API_KEY = 'AIzaSyBfG4RX7WLUCBAHmKuIfQWwc_BfmnY0Ewo';

export const createUser = async (email,password)=>{
  const response =  await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,{
      email,
      password,
      returnSecureToken:true,
    });
    console.log(response);
    const token = response.data.idToken;
    return token;
};

export const signInUser = async (email,password)=>{
  const response =  await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,{
      email,
      password,
      returnSecureToken:true,
    });
    console.log(response.data);
    const token = response.data.idToken;
    return token;
};
