
import React, { useEffect, useState } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import SettingsScreen from '../../screens/SettingScreen';
import SidebarMenu from '../SideBarMenu/SideBarMenu';
import NavigationDrawerHeader from '../NavigationDrawerHeader/NavigationDrawerHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const homeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Mon compte',
          headerLeft: () => (
            <NavigationDrawerHeader navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#133353', 
          },
          headerTintColor: '#fff', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      />
    </Stack.Navigator>
  );
};

const settingScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="SettingsScreen">
    <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Mes Parametres',
          headerLeft: () => (
          <NavigationDrawerHeader navigationProps={navigation} />
        ), 
        headerStyle: {
          backgroundColor: '#133353', 
        },
        headerTintColor: '#fff', 
        headerTitleStyle: {
          fontWeight: 'bold', 
        },
      }}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigatorRoutes = (props) => {
  const [userId, setUserId] = useState('');

    AsyncStorage.getItem('user_id').then(value =>
    setUserId(value));
    
  
  console.log(userId);
    
  const [userFirstNameLetter, setUserFirstNameLetter] = useState('');
  const [userLastNameLetter, setUserLastNameLetter] = useState('');
  const [userName, setUserName] = useState('')

    const body = {
      id: userId,
    }

      axios.post("http://localhost:3000/user/getById", body)
      .then((response) => {
       setUserFirstNameLetter(response.data.firstname.charAt(0)),
        setUserLastNameLetter(response.data.lastname.charAt(0))
        setUserName(response.data.firstname.concat(' ', response.data.lastname))
        
      }).catch((error) => {
        console.error(error);
      });

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#cee1f2',
        color: '#cee1f2',
        userFirstNameLetter: userFirstNameLetter,
        userLastNameLetter: userLastNameLetter,
        userName: userName,
        itemStyle: {marginVertical: 5, color: 'white'},
        labelStyle: {
          color: '#d8d8d8',
        },
      }}
      screenOptions={{headerShown: false}}
      drawerContent={SidebarMenu}>
      <Drawer.Screen
        name="homeScreenStack"
        options={{drawerLabel: 'Accueil'}}
        component={homeScreenStack}
      />
      <Drawer.Screen
        name="settingScreenStack"
        options={{drawerLabel: 'Mon Compte'}}
        component={settingScreenStack}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigatorRoutes;