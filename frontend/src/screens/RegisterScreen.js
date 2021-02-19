import React, {useState, createRef} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
    Alert,
  } from 'react-native';
import { create } from 'react-test-renderer';
import Loader from '../components/Loader/Loader';
import SuccessSignIn from '../components/SuccessSignIn/SuccessSignIn';


const RegisterScreen = (props) => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isSignInSuccess, SetIsSignInSuccess] = useState(false);
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const password = createRef();

    const handleSubmit = () => {
        setErrorText('');
        if (!userFirstName) {
            Alert('Oups il manque le prénom')
            return;
        }
        if (!userLastName) {
            Alert('Oups il manque le nom')
            return;
        }
        if (!userEmail) {
            Alert('Minute papillon il nous faut ton email')
            return; 
        }
        if (!userAge) {
            Alert('Oups il nous faut ton âge')
            return;
        }
        if (!userPassword) {
            Alert('Allez un petit effort il faut un mot de passe :)')
            return;
        }
        setLoading(true);
        const userInfo = {
            firstname: userFirstName,
            lastName: userLastName,
            email: userEmail,
            age: userAge,
            password: "bob",
        };
        console.log(userInfo);
        const body = [];
        for (var key in userInfo) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(dataToSend[key]);
            body.push(encodedKey + '=' + encodedValue);
          }
          body = body.join('&');
          fetch('http://localhost:3000/api/user/register', {
            method: 'POST',
            body: body,
            headers: {
              'Content-Type':
              'application/x-www-form-urlencoded;charset=UTF-8',
            },
          }) 
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            console.log(responseJson);
            if (responseJson.status === 'success') {
              setSignInSuccess(true);
              console.log(
                'Vous êtes prêt à utiliser notre application, veuillez vous authentifiez'
              );
            } else {
              setErrortext(responseJson.msg);
            }
          })
          .catch((error) => {
            //Hide Loader
            setLoading(false);
            console.error(error);
          });
      };
      if (isSignInSuccess) {
        return (
            <SuccessSignIn />
        );
      }
    
 return (
    <View>

    </View>
 )
 }


export default RegisterScreen;

