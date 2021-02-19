import React from 'react';
import {View, Text, Button} from 'react-native';
import styled from 'styled-components';

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const CreateAccountScreen = ({navigation}) => {
 
  
  return (
    <MainView>
      <Text>CreateAccount</Text>
      <Button title="Create user"  />
      <Button title="Log in" onPress={() => navigation.navigate('Login')} />
    </MainView>
  );
};

export default CreateAccountScreen;
