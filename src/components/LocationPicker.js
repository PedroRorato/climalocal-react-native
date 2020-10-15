import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-location';

const LocationPicker = () => {
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermissions = async () => {
        const result = await Permissions.requestPermissionsAsync(Permissions.Location);
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;
    };

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({timeout: 5000});
            console.log(location);
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later',
                [{ text: 'Okay' }]
            );
        }
        
    };

    return (
        <View style={styles.container}>
            <Text>No location choosen yet</Text>
            <Button title="Get Location" onPress={getLocationHandler} color='blue' />
        </View>
    )
}

export default LocationPicker;

const styles = StyleSheet.create({
    container: {
    }
});
