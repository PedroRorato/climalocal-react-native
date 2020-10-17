import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import * as Location from 'expo-location';
import * as Permissions from 'expo-location';

import { Feather } from '@expo/vector-icons';

import api from '../services/api';

import ButtonContainer from '../components/ButtonContainer';
import InfoRow from '../components/InfoRow';
import InfoBlock from '../components/InfoBlock';

const weather = {
    clear: {color: '#eeaa39', icon: 'sun'}, // Céu Limpo
    clouds: {color: '#a6b4c5', icon: 'cloud'}, // Nublado
    drizzle: {color: '#7795e8', icon: 'cloud-drizzle'}, // Garoa
    rain: {color: '#516296', icon: 'cloud-rain'}, //Chuva
    snow: {color: '#bcccff', icon: 'cloud-snow'}, // Neve
    thunderstorm: {color: '#272f48', icon: 'cloud-lightning'}, // Tempestade
    other: {color: '#a6b4c5', icon: 'wind'},
    default: {color: '#000', icon: 'download-cloud'},
}

const defaultWeather = {
    weather: [
        {
            "id": 803,
            "main": "Clouds",
            "description": "broken clouds",
            "icon": "04d"
        }
    ],
    main: {
        "temp": 28.25,
        "feels_like": 27.92,
        "temp_min": 28.25,
        "temp_max": 28.25,
        "pressure": 1016,
        "humidity": 42,
        "sea_level": 1016,
        "grnd_level": 1000
    },
    visibility: 10000,
    wind: {
        "speed": 2.32,
    },
    sys: {
        "country": "BR",
        "sunrise": 1602924876,
        "sunset": 1602971163
    },
    name: "- - -",
}

const InitialScreen = () => {

    const [pickedLocation, setPickedLocation] = useState();
    const [currentStyle, setCurrentStyle] = useState('default');
    const [currentWeather, setCurrentWeather] = useState(defaultWeather);


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

    const getApiInfo = async (lat, lon) => {
        return await api.get(
            `/weather?lat=${lat}&lon=${lon}&lang=pt_br&appid=fd76d38854859b84b47b4a5e29b0170f`
        );
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({timeout: 7000});
            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            });

            const response = await getApiInfo(
                location.coords.latitude, 
                location.coords.longitude
            );

            console.log('####### Name: ', response.data.base);
            setCurrentWeather(response.data);
        } catch (err) {
            console.log('####################deu ruim')
            Alert.alert(
                'Could not fetch location!',
                'Please try again later',
                [{ text: 'Okay' }]
            );
        }
        
    };
    
    return (
        <>
            <ScrollView style={{...styles.container, backgroundColor: weather[currentStyle].color}}>
                <Text style={styles.cityText}>{currentWeather.name}</Text>
                <Text style={styles.descriptionText}>{currentWeather.weather[0].description}</Text>
                <View style={styles.mainBlock}>
                    <View style={styles.tempContainer}>
                        
                        <Text style={styles.bigTempText}>28º</Text>
                        <Text style={styles.tempsText}>20º - 28º</Text>
                    </View>

                    <View style={styles.iconContainer}>
                        <Feather name={weather[currentStyle].icon} size={70} color="white" />
                        
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
            
            <ButtonContainer onPress={getLocationHandler} />
        </>
    );
};
    
    export default InitialScreen;
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
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
    