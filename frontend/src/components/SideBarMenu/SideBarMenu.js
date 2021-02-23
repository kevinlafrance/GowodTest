import React, {Component, useState} from 'react';
import {View, Text, Alert, StyleSheet} from 'react-native';
import styled from 'styled-components';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #133353;
    padding-top: 40px;
    color: white;
`;
const Header = styled.View`
    flex-direction: row;
    background-color: #133353;
    padding: 15px;
    text-align: center;
`;
const InitialCircle = styled.View`
    width: 60px;
    height: 60px;
    borderRadius: 60px;
    color: white;
    background-color: #ffffff;
    text-align: center;
    justify-content: center;
    align-items: center;
`;
const UserName = styled.Text`
    color: white;
    align-self: center;
    padding-horizontal: 10px;
    font-weight: bold;
    text-transform: uppercase;
`;
const Line = styled.View`
    height: 1px;
    margin-horizontal: 20px;
    background-color: #e2e2e2;
    margin-top: 15px;
`;

const SidebarMenu = (props) => {
 
  return (
    <Container>
      <Header>
        <InitialCircle>
          <Text style={{fontSize: 20, color: '#307ecc', textTransform: 'uppercase'}}>
          {props.userFirstNameLetter.concat('', props.userLastNameLetter) } </Text>
        </InitialCircle>
        <UserName>
          {props.userName}
        </UserName>
      </Header>
      <Line  />

      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label={({color}) => 
            <Text style={{color: '#d8d8d8'}}>
              Se Déconnecter
            </Text>
          }
          onPress={() => {
            props.navigation.toggleDrawer();
            Alert.alert(
              'Se Déconnecter',
              'Etes vous sûr de vouloir vous déconnectez ?',
              [
                {
                  text: 'Annuler',
                  onPress: () => {
                    return null;
                  },
                },
                {
                  text: 'Se Déconnecter',
                  onPress: () => {
                    AsyncStorage.clear();
                    props.navigation.replace('Auth');
                  },
                },
              ],
              {cancelable: false},
            );
          }}
        />
      </DrawerContentScrollView>
    </Container>
  );
};

export default SidebarMenu;

