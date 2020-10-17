import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Feather, Ionicons } from '@expo/vector-icons';

import * as Location from 'expo-location';
import * as Permissions from 'expo-location';

import api from '../services/api';

import LocationPicker from '../components/LocationPicker';
import ButtonContainer from '../components/ButtonContainer';
import InfoRow from '../components/InfoRow';
import InfoBlock from '../components/InfoBlock';

// lat: '-29.690557738733677',  
// lon: '-53.8148801644215',
// appid: 'fd76d38854859b84b47b4a5e29b0170f',

const weather = {
    Clear: {color: '#eeaa39', icon: 'sun'}, // Céu Limpo
    Clouds: {color: '#a6b4c5', icon: 'cloud'}, // Nublado
    Drizzle: {color: '#7795e8', icon: 'cloud-drizzle'}, // Garoa
    Rain: {color: '#516296', icon: 'cloud-rain'}, //Chuva
    Snow: {color: '#bcccff', icon: 'cloud-snow'}, // Neve
    Thunderstorm: {color: '#272f48', icon: 'cloud-lightning'}, // Tempestade
    Other: {color: '#fff', icon: 'wind'},
}

const currentWeather = 'Clear';

const InitialScreen = () => {

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
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.cityText}>Santa Maria</Text>
                <Text style={styles.descriptionText}>Chuvoso</Text>
                <View style={styles.mainBlock}>
                    <View style={styles.tempContainer}>
                        
                        <Text style={styles.bigTempText}>28º</Text>
                        <Text style={styles.tempsText}>20º - 28º</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Feather name={weather[currentWeather].icon} size={70} color="white" />
                        
                    </View>
                </View>

                <InfoRow>
                    <InfoBlock title="O SOL NASCE" content="7:17 am" />
                    <InfoBlock title="O SOL SE PÕE" content="16:17 pm" />
                </InfoRow>

                <InfoRow>
                    <InfoBlock title="UMIDADE" content="51 %" />
                    <InfoBlock title="PRESSÃO" content="1019 hPa" />
                </InfoRow>

                <InfoRow>
                    <InfoBlock title="VISIBILIDADE" content="10000" />
                    <InfoBlock title="VENTO" content="4.3 m/s" />
                </InfoRow>
                
            </ScrollView>
            
            <ButtonContainer />
        </>
    );
};
    
    export default InitialScreen;
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: weather[currentWeather].color,
            paddingHorizontal: 20,
            paddingTop: 15,
        },
        cityText: {
            color: 'white',
            fontSize: 30,
            fontWeight: '600',
            textAlign: 'center',
            marginBottom: 5,
        },
        descriptionText: {
            color: 'white',
            fontSize: 17,
            textAlign: 'center',
            textTransform: 'uppercase',
            marginBottom: 15,
            
        },
        mainBlock: {
            height: 190,
            flexDirection: 'row',
            paddingBottom: 30,
        },
        tempContainer: {
            flex: 3,
            justifyContent: 'center'
        },
        
        bigTempText: {
            color: 'white',
            fontSize: 70,
            fontWeight: 'bold',
        },
        tempsText: {
            color: 'white',
            fontSize: 25,
        },
        iconContainer: {
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
        },
        

    });
    