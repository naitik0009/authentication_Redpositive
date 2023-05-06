import {createContext,useEffect,useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthContextProvider = ({children})=>{
    const [token,setToken] = useState("");
    const [isAuthenticated,setAuth]  = useState(false);
    
    useEffect(()=>{
         async function retrieve (){ 
            const token = await AsyncStorage.getItem('token');
            if(token){
                setToken(token);
            }
        }
        retrieve();
    },[]);

    const Authenticate = (token)=>{
        setToken(token);
        AsyncStorage.setItem('token',token);
    };
    const logout = ()=>{
        setToken(null);
        AsyncStorage.removeItem('token');
    }
    const value = {
        token,
        Authenticate,
        logout,
        isAuthenticated:!!token,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};