import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Stack = createStackNavigator();


const Auth = () => {
    // Nav pour toute la partie Authentification
    return (
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          // Pour chaque Screen dans la nav rajouter ce style
          // TODO: Refacto avec styled component
          options={{
            title: "S'inscrire", //Title de la nav page inscription
            headerStyle: {
              backgroundColor: '#845ded', // couleur de fond
            },
            headerTintColor: '#fff', // couleur de text
            headerTitleStyle: {
              fontWeight: 'bold', // style text 
            },
          }}
        />
      </Stack.Navigator>
    );
  };

  export default Auth;