import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import api from '../services/api';

import LocationPicker from '../components/LocationPicker';

// lat: '-29.690557738733677',  
// lon: '-53.8148801644215',
// appid: 'fd76d38854859b84b47b4a5e29b0170f',

const InitialScreen = () => {
    const fHandler = async () => {
        const response = await api.get(
            '/weather?lat=-29.690557738733677&lon=-53.8148801644215&appid=fd76d38854859b84b47b4a5e29b0170f'
        );
        console.log(response);
    }
    
    return (
        <View>
        <Button title="API" color='red' onPress={fHandler} />
        <Text>Bom dia</Text>
        <LocationPicker />
        </View>
        );
    };
    
    export default InitialScreen;
    
    const styles = StyleSheet.create({
        
    });
    