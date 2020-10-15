import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import api from '../services/api';

import LocationPicker from '../components/LocationPicker';

const InitialScreen = () => {
    return (
        <View>
            <Text>Bom dia</Text>
            <LocationPicker />
        </View>
    );
};

export default InitialScreen;

const styles = StyleSheet.create({

});
