import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text
} from 'react-native';
import styled from 'styled-components';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color:  #133353;
`;
const Indicator = styled.ActivityIndicator`
    align-items: center;
    height: 80px;
`;
const Logo = styled.Image`
    width: 90%;
    resize-mode: contain;
    margin: 30px;
`;


const SplashScreen = ({navigation}) => {

    const [animating, setAnimating] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            //Check if user_id is set or not
            //If not then send for Authentication
            //else send to Home Screen
            AsyncStorage.getItem('user_id').then((value) =>
                navigation.replace(
                value === null ? 'Auth' : 'DrawerNavigationRoutes'
                ),
            );
        }, 5000);
    }, []);

    return (
     <Container>
         <Logo source={require('../../images/gowod.png')}/>
         <Indicator animating={animating}
        color="#FFFFFF"
        size="large"/>
     </Container>  
    )
    
}

export default SplashScreen;
