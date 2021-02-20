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
import styled from 'styled-components';
import Loader from '../components/Loader/Loader';
import SuccessSignIn from '../components/SuccessSignIn/SuccessSignIn';

const Container = styled.View`
  flex: 1;
  background-color: #133353;
  align-content: center;
  justify-content: center;
`;

const LogoWrapper = styled.View`
  align-items: center;
`;

const Logo = styled.Image`
  width: 300px;
  height: 200px;
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


const RegisterScreen = (props) => {
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userAge, setUserAge] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isSignInSuccess, SetIsSignInSuccess] = useState(false);
    const lastNameInputRef = createRef();
    const emailInputRef = createRef();
    const ageInputRef = createRef();
    const passwordInputRef = createRef();

    const handleSubmitForm = () => {
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
            password: userPassword,
        };
        console.log(userInfo);
        const formSignIn = [];
        for (var key in userInfo) {
            var encodedKey = encodeURIComponent(key);
            var encodedValue = encodeURIComponent(userInfo[key]);
            formSignIn.push(encodedKey + '=' + encodedValue);
          }
          body = formSignIn.join('&');
          fetch('http://localhost:3000/api/user/signin', {
            method: 'POST',
            body: formSignIn,
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
              setIsSignInSuccess(true);
              console.log(
                'Vous êtes prêt à utiliser notre application, veuillez vous authentifiez'
              );
            } else {
              setErrorText(responseJson.msg);
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
    <Container>
      <Loader loading={loading} />
      <ScrollView 
        keyboardShouldPersistTaps="handled">
          <View>
           <KeyboardAvoidingView enabled>
          <LogoWrapper>
            <Logo source={require('../../images/gowod.png')}/>
          </LogoWrapper>
         
            <FormSection>
              <FormInput 
              onChangeText={(userFirstName) => setUserFirstName(userFirstName)}
              underlineColorAndroid="#f000"
              placeholder="Prénom"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameInputRef.current && lastNameInputRef.current.focus()
              }
              blurOnSubmit={false} />
            </FormSection>
            <FormSection>
              <FormInput 
              onChangeText={(userLastName) => setUserLastName(userLastName)}
              underlineColorAndroid="#f000"
              placeholder="Nom"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              ref={lastNameInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false} />
            </FormSection>
            <FormSection>
              <FormInput 
              onChangeText={(userEmail) => setUserEmail(userEmail)}
              underlineColorAndroid="#f000"
              placeholder="E-mail"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false} />
            </FormSection>
            <FormSection>
              <FormInput 
              onChangeText={(userPassword) => setUserPassword(userPassword)}
              underlineColorAndroid="#f000"
              placeholder="Mot de Passe"
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current &&
                ageInputRef.current.focus()
              }
              blurOnSubmit={false} />
            </FormSection>
            <FormSection>
              <FormInput 
              onChangeText={(userAge) => setUserAge(userAge)}
              underlineColorAndroid="#f000"
              placeholder="Age"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false} />
            </FormSection>
            {errorText != '' ? (
              <ErrorText>
                {errorText}
              </ErrorText>
            ) : null}
             <LoginButton
              activeOpacity={0.5}
              onPress={handleSubmitForm}>
                <LoginTextButton>S'inscrire</LoginTextButton>
              </LoginButton>
          </KeyboardAvoidingView>
          </View>
        </ScrollView>
        
    </Container>
 )
 }


export default RegisterScreen;

