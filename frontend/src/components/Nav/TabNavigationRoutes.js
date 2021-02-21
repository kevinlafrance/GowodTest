import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import SettingsScreen from '../../screens/SettingScreen';
import SidebarMenu from '../SideBarMenu/SideBarMenu';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();


const homeScreenStack = ({navigation, route}) => {
  

  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        userInfo={userInfo}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#307ede', 
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
    <Stack.Navigator
      initialRouteName="SettingsScreen">
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: 'Settings', 
          headerStyle: {
            backgroundColor: '#307ecc', 
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

const TabNavigationRoutes = ({route}) => {
 
 
  return (
    <Tab.Navigator
      screenOptions={{headerShown: true}}
      shifting={true}
      sceneAnimationEnabled={false}>

      <Tab.Screen
        name="homeScreenStack"
        component={homeScreenStack}
        
        
      />
      <Tab.Screen
        name="settingScreenStack"
        
        component={settingScreenStack}
      />
    </Tab.Navigator>
  );
};

export default TabNavigationRoutes;