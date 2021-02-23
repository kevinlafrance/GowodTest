import React, {useEffect, useState, createRef} from 'react';
import {View, Text, SafeAreaView, ScrollView,KeyboardAvoidingView,
  Keyboard,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styled from 'styled-components';
import Loader from '../components/Loader/Loader';



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

const SuccessText = styled.Text`
  color: 	#32CD32; 
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

const SettingsScreen = () => {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userId, setUserId] = useState('');
  const [successText, setSuccessText] = useState('');
  const [loading, setLoading] = useState('');


  // new values for update
  const [newUserFirstName, setNewUserFirstName] = useState('');
  const [newUserLastName, setNewUserLastName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAge, setNewUserAge] = useState('');

  // GET user informations
    AsyncStorage.getItem('user_id').then(value =>
    setUserId(value));
    const body = {
      id: userId,
    }

      axios.post("http://localhost:3000/user/getById", body)
      .then((response) => {
       setUserFirstName(response.data.firstname),
        setUserLastName(response.data.lastname),
        setUserEmail(response.data.email),
        setUserAge(response.data.age)
      }).catch((error) => {
        console.error(error);
      });
      
      // UPDATE user informations
      const handleChangeInfo = () => {
        setSuccessText('');
        const userInfo = {
          firstname: newUserFirstName,
          lastname: newUserLastName,
          email: newUserEmail,
          age: newUserAge,
      };
      console.log(userInfo)
      axios.put(`http://localhost:3000/user/${userId}`, userInfo)
        .then((response) => {
        if (response.status === 201 ) {
       setSuccessText('Les modifications ont bien été enregistrées')
        }}
      )
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
            onChangeText={(newUserFirstName) => setNewUserFirstName(newUserFirstName)}
            underlineColorAndroid="#f000"
            placeholder="Prénom"
            defaultValue={userFirstName}
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            autoCompleteType="off"
            returnKeyType="next"
            blurOnSubmit={false} />
          </FormSection>
          <FormSection>
            <FormInput
            onChangeText={(newUserLastName) => setNewUserLastName(newUserLastName)}
            underlineColorAndroid="#f000"
            placeholder="Nom"
            defaultValue={userLastName}
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            autoCompleteType="off"
            returnKeyType="next"
            blurOnSubmit={false} />
          </FormSection>
          <FormSection>
            <FormInput 
            onChangeText={(newUserEmail) => setNewUserEmail(newUserEmail)}
            underlineColorAndroid="#f000"
            placeholder="E-mail"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            autoCompleteType="off"
            keyboardType="email-address"
            returnKeyType="next"
            defaultValue={userEmail}
            blurOnSubmit={false} />
          </FormSection>
          <FormSection>
            <FormInput 
            onChangeText={(newUserAge) => setNewUserAge(newUserAge)}
            underlineColorAndroid="#f000"
            placeholder="Age"
            placeholderTextColor="#8b9cb5"
            autoCapitalize="none"
            keyboardType="numeric"
            autoCompleteType="off"
            returnKeyType="next"
            defaultValue={userAge}
            onSubmitEditing={Keyboard.dismiss}
            blurOnSubmit={false} />
          </FormSection>
          {successText != '' ? (
              <SuccessText>
                {successText}
              </SuccessText>
            ) : null}
           <LoginButton
            activeOpacity={0.5}
            onPress={handleChangeInfo}
            >
              <LoginTextButton>Modifier les informations</LoginTextButton>
            </LoginButton>
        </KeyboardAvoidingView>
        </View>
      </ScrollView>
      
  </Container>
  );
};

export default SettingsScreen;