import {useState,useContext} from 'react';
import {
  View,
  Alert,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {signInUser} from '../utils/firebase';
import { AuthContext } from '../context/auth.context';
export const LoginScreen = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading,setLoading] = useState(false);
  const {Authenticate} = useContext(AuthContext);
  const handleSubmit = () => {
   setLoading(true);
   try {
    setTimeout(async () => {
       const token = await signInUser(email, password);
       Authenticate(token);
       setLoading(false);
    }, 2000);
   } catch (error) {
    Alert.alert(`${error.message}`,`Couldn't Login ,Please check your credentials.`);
   }

  };

  const toogleVisible = () => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
    {isLoading ? 
    <View style={styles.activityContainer}>
       <ActivityIndicator size={'large'}/>
       <Text>Logging in.........</Text>
       </View> 
       :<>
      <Text style={styles.header}>Login screen</Text>
      <View style={styles.form}>
        <View style={styles.emailContainer}>
          <Text style={styles.emailLabel}>Email</Text>
          <TextInput
            value={email}
            onChangeText={email => setEmail(email.trim())}
            style={styles.emailInput}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Password</Text>
          <View style={styles.passwordInputContainer}>
            <TextInput
              value={password}
              onChangeText={password => setPassword(password.trim())}
              style={styles.passwordInput}
              secureTextEntry={visible === true ? false : true}
              maxLength={8}
              keyboardType="default"
            />
            <TouchableOpacity
              onPress={toogleVisible}
              style={styles.iconContainer}>
              <Icon
                name={visible === true ? 'eye' : 'eye-slash'}
                size={20}
                color={'grey'}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={handleSubmit} style={styles.btn}>
            <Text style={{color: 'white'}}>Sign In</Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text>haven't created an account, </Text>
            <TouchableOpacity onPress={() => navigation.replace('Register')}>
              <Text style={{color: 'blue'}}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityContainer:{
    top:200,
    justifyContent:'center',
    alignItems:'center',
  },
  header: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  form: {
    justifyContent: 'center',
    width: 350,
    maxWidth: 400,
    height: 250,
    borderWidth: 2,
    padding: 10,
  },
  emailContainer: {
    margin: 5,
  },
  emailLabel: {
    fontSize: 15,
    color: 'black',
  },
  emailInput: {
    height: 40,
    width: 280,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  passwordContainer: {
    margin: 5,
  },
  passwordLabel: {
    fontSize: 15,
    color: 'black',
  },
  passwordInput: {
    height: 40,
    width: 280,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
  },
  passwordInputContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 255,
  },

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
    color: 'white',
  },
});
