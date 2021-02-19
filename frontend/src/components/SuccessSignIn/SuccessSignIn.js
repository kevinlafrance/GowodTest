import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
    flex: 1;
    background-color: #307ecc;
    justify-content: center;
`;

const SuccessImage = styled.Image`
    height: 150, 
    resize-mode: contain;
    align-self: center;
`;

const SuccessText = styled.Text`
    color: #FFFFFF;
    text-align: center;
    font-size: 18px;
    padding: 30px;
`;

const Button = styled.TouchableOpacity`
    background-color: #7DE24E;
    color: #FFFFFF;
    height: 40px;
    align-items: center;
    border-radius: 30px;
    margin: 20px 35px 35px 20px;
`;

const ButtonText = styled.Text`
    color: #FFFFFF;
    padding: 10;
    font-size: 18px;
`;

const SuccessSignIn = () => {


    return (
    <Container>
        <SuccessImage
          source={require('../../../images/shuttle.png')}
        />
        <SuccessText>
          Bravo Vous faites désormais parti des notres ! 
        </SuccessText>
        <Button
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <ButtonText>Se connecter</ButtonText>
        </Button>
      </Container>
    )
}
export default SuccessSignIn;

