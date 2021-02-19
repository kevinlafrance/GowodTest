import React, {useState, createRef} from 'react';
import styled from 'styled-components';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Loader from '../components/Loader/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';




const MainView = styled.View`
  flex: 1;
  justify-content: center;
  background-color: #133353;
  align-content: center;
`;
const LogoWrapper = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  width: 700px;
  height: 300px;
  resize-mode: contain;
  margin-top: 40px;
`;

const FormSection = styled.View`
  flex-direction: row;
  height: 40px;
  margin-top: 20px;
  margin-left: 35px;
  margin-right: 35px;
  margin: 10px;
`;

const FormInput = styled.TextInput`
  flex: 1;
  color: #FFFFFF;
  padding: 0 10px;
  border-width: 1px;
  border-radius: 30px;
  border-color: #dadae8;
`;

const ErrorText = styled.Text`
  color: #e60000; 
  text-align: center;
  font-size: 14px;
`;

const LoginButton = styled.TouchableOpacity`
  background-color: #000000;
  color: #FFFFFF;
  height: 60px;
  align-items: center;
  border-radius: 15px;
  margin: 20px 35px 25px 35px;
`;

const LoginTextButton = styled.Text`
  color: #FFFFFF;
  padding: 18px;
  font-size: 20px;
  text-transform: uppercase;
`;

const SignInText = styled.Text`
  color: #FFFFFF;
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  align-self: center;
  padding: 10px;
`;




const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState('');

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    let dataToSend = {email: userEmail, password: userPassword};
    let formBody = [];
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://localhost:3000/api/user/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }) 
    .then((response) => response.json())
    .then((responseJson) => {
      //Hide Loader
      setLoading(false);
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        AsyncStorage.setItem('user_id', responseJson.data.email);
        console.log(responseJson.data.email);
        navigation.replace('DrawerNavigationRoutes');
      } else {
        setErrortext(responseJson.msg);
        console.log('Please check your email id or password');
      }
    })
    .catch((error) => {
      //Hide Loader
      setLoading(false);
      console.error(error);
    });
};


  return (
    <MainView>
       <Loader loading={loading} />
       <ScrollView
        keyboardShouldPersistTaps="handled">
          <View>
          <KeyboardAvoidingView enabled>
          <LogoWrapper>
              <Logo
                source={require('../../images/gowod.png')}
              />
            </LogoWrapper>
            <FormSection>
              <FormInput
              onChangeText={(userEmail) => 
                setUserEmail(userEmail)
              }
              placeholder="E-mail"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </FormSection>
            <FormSection>
              <FormInput
              onChangeText={(userPassword) => 
                setUserPassword(userPassword)
              }
              placeholder="Mot de Passe"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
              />
              </FormSection>
              {errortext != '' ? (
              <ErrorText>
                {errortext}
              </ErrorText>
            ) : null}
              <LoginButton
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
                <LoginTextButton>connexion avec email</LoginTextButton>
              </LoginButton>
              <SignInText
              onPress={() => navigation.navigate('RegisterScreen')}>
              Vous êtes nouveau ? Inscrivez vous ! 
            </SignInText>
          </KeyboardAvoidingView>
          </View>
      </ScrollView>
    </MainView>
  );
};

export default LoginScreen;
