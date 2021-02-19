import React from 'react';
import styled from 'styled-components';
import {View, Modal, ActivityIndicator} from 'react-native';


const IndicatorWrapper = styled.View`
    background-color: #FFFFFF;
    height: 100px;
    width: 100px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: space-around;
`;
const Indicator = styled.ActivityIndicator`
    align-items: center;
    height: 80px;
`;

const Background = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    background-color: #00000040;
`;

const Loader = (props) => {
    const {loading, ...attributes} = props;
  
    return (
      <Modal
        transparent={true}
        animationType={'none'}
        visible={loading}
        onRequestClose={() => {
          console.log('OK ferme');
        }}>
        <Background>
          <IndicatorWrapper>
            <Indicator
              animating={true}
              color="#000000"
              size="large"
            />
          </IndicatorWrapper>
        </Background>
      </Modal>
    );
  };
  
  export default Loader;
  