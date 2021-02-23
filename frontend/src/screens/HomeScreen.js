import React from 'react';
import {View, SafeAreaView, StyleSheet,Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, Card, Divider } from 'react-native-elements';
import test from '../../json/test.json';
import styled from 'styled-components';



const HomeScreen = () => {

  return (
    <Card containerStyle={styles.card}>
				<Text style={styles.notes}>Test 1</Text>
				
				<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
					<Image style={{width:100, height:100}} source={require('../../images/validate.png')} />
					<Text style={styles.score}>Score</Text>
				</View>

				<Divider style={{ backgroundColor: '#dfe6e9', marginVertical:20}} />
				
				<View style={{flexDirection:'row', justifyContent:'space-between'}}>
					<Text style={styles.notes}>Best Score</Text>
					<Button style={styles.notes} title="Test" />
				</View>
			</Card>
		);
	}


const styles = StyleSheet.create({
	card:{
		backgroundColor:'#133353',
		borderWidth:0,
		borderRadius:20
	},
	score:{
		fontSize:38,
		color:'#fff'
	},
	notes: {
		fontSize: 18,
		color:'#fff',
		textTransform:'capitalize'
	}
});


export default HomeScreen;