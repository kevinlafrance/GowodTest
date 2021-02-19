import React from 'react';
import {Button, Text} from 'react-native';
import styled from 'styled-components';

const MainView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const HomeScreen = ({navigation}) => {
  return (
    <MainView>
      <Text>Home Screen</Text>
      <Button
        title="Se Déconnecter"
        onPress={() => navigation.navigate('Login')}
      />
    </MainView>
  );
};

export default HomeScreen;
