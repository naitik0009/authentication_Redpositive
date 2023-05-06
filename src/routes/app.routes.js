import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "../screens/home.screen";
import { LoginScreen } from "../screens/login.screen";
import { RegisterScreen } from "../screens/register.screen";
import {useContext} from 'react';
import { AuthContext } from "../context/auth.context";
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const Authenticated = ()=>{
 return   <Stack.Navigator>
        <Stack.Screen component={HomeScreen} name='Home'/>
    </Stack.Navigator>
}

const UnAuthenticated = ()=>{
 return  <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name='Login' component={LoginScreen}/>
        <Stack.Screen name='Register' component={RegisterScreen}/>
    </Stack.Navigator>
};

export const CurrentNavigation = ()=>{
    const {isAuthenticated} = useContext(AuthContext);
    return <NavigationContainer>
        {isAuthenticated? <Authenticated/> : <UnAuthenticated/> }
    </NavigationContainer>
}

