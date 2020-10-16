import React from 'react';
import { Button, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import api from '../services/api';

import LocationPicker from '../components/LocationPicker';
import ButtonContainer from '../components/ButtonContainer';

// lat: '-29.690557738733677',  
// lon: '-53.8148801644215',
// appid: 'fd76d38854859b84b47b4a5e29b0170f',

const weather = {
    Clear: '#eeaa39', // Céu Limpo
    Clouds: '#a6b4c5', // Nublado
    Drizzle: '#7795e8', // Garoa
    Rain: '#516296', //Chuva
    Snow: '#bcccff', // Neve
    Thunderstorm: '#272f48', // Tempestade
    Other: '#fff',
}

const InitialScreen = () => {

    
    
    
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.city}>Santa Maria</Text>
            </View>
            
            <ButtonContainer />
        </>
    );
};
    
    export default InitialScreen;
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: weather['Snow'],
            paddingHorizontal: 20,
        },
        city :{
            fontSize: 18,
        }



    });
    