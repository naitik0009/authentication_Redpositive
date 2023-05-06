import axios from 'axios';
import {useContext,useEffect} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { AuthContext } from '../context/auth.context';
export const HomeScreen = ()=>{
    const {logout,token} = useContext(AuthContext);
    useEffect(() => {
     axios.get('https://authentication-a5f80-default-rtdb.asia-southeast1.firebasedatabase.app/message.json?auth='+token).then((response)=>{
        console.log(response.data)
     }).catch((error)=>{
        console.log(error.message);
     });
    }, [token])
    
    return (
        <View>
            <Text>Welcome to the user screen</Text>
            <View style={styles.btnContainer}>
            <TouchableOpacity onPress={logout} style={styles.btn}>
                <Text>Logout</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    btnContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      btn: {
        width: 150,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
      },
})