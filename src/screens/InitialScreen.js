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
    other: {color: '#a6b4c5', icon: 'wind'}
}

const InitialScreen = () => {

    const [currentStyle, setCurrentStyle] = useState('other');
    const [currentWeather, setCurrentWeather] = useState(null);


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
            `/weather?lat=${lat}&lon=${lon}&lang=pt_br&units=metric&appid=fd76d38854859b84b47b4a5e29b0170f`
        );
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if(!hasPermission) {
            return;
        }

        try {
            const location = await Location.getCurrentPositionAsync({timeout: 7000});

            const response = await getApiInfo(
                location.coords.latitude, 
                location.coords.longitude
            );

            const temp = Math.round( response.data.main.feels_like );

            let sunriseTime = new Date(response.data.sys.sunrise * 1000);
            let sunsetTime = new Date(response.data.sys.sunset * 1000);

            let sunrise =  sunriseTime.toLocaleTimeString();
            let sunset =  sunsetTime.toLocaleTimeString();

            const speed = Math.round( response.data.wind.speed );

            setCurrentWeather({
                name: response.data.name,
                description: response.data.weather[0].description,
                temp,
                sunrise: sunrise.toString().slice(0, 5),
                sunset: sunset.toString().slice(0, 5),
                humidity: response.data.main.humidity,
                pressure: response.data.main.pressure,
                visibility: response.data.visibility,
                speed,
            });
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
            {!currentWeather ? 
                <View style={styles.noDataContainer}>
                    <Text style={styles.noDataText}>
                        Clique em ATUALIZAR para carregar as informações climáticas da sua região!
                    </Text>
                </View> 
                : 
                <ScrollView style={{
                    ...styles.container, 
                    backgroundColor: weather[currentStyle].color
                }}>
                    <Text style={styles.cityText}>{currentWeather.name}</Text>
                    <Text style={styles.descriptionText}>
                        {currentWeather.description}
                    </Text>
                    <View style={styles.mainBlock}>
                        <View style={styles.tempContainer}>
                            
                            <Text style={styles.bigTempText}>
                                {currentWeather.temp}º
                            </Text>
                        </View>

                        <View style={styles.iconContainer}>
                            <Feather 
                                name={weather[currentStyle].icon} 
                                size={70} 
                                color="white" 
                            />
                        </View>
                    </View>

                    <InfoRow>
                        <InfoBlock title="O SOL NASCE" content={currentWeather.sunrise} />
                        <InfoBlock title="O SOL SE PÕE" content={currentWeather.sunset} />
                    </InfoRow>

                    <InfoRow>
                        <InfoBlock title="UMIDADE" content={currentWeather.humidity+" %"} />
                        <InfoBlock title="PRESSÃO" content={currentWeather.pressure+" hPa"} />
                    </InfoRow>

                    <InfoRow>
                        <InfoBlock title="VISIBILIDADE" content={currentWeather.visibility} />
                        <InfoBlock title="VENTO" content={currentWeather.speed+" m/s"} />
                    </InfoRow>
                    
                </ScrollView>
            }
            <ButtonContainer onPress={getLocationHandler} />
        </>
    );
};
    
    export default InitialScreen;
    
    const styles = StyleSheet.create({
        noDataContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30,
        },
        noDataText: {
            fontSize: 18,
            textAlign: 'center',
        },
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
            flex: 1,
            justifyContent: 'center'
        },
        
        bigTempText: {
            color: 'white',
            fontSize: 80,
            fontWeight: 'bold',
        },
        tempsText: {
            color: 'white',
            fontSize: 25,
        },
        iconContainer: {
            //backgroundColor: '#333',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    