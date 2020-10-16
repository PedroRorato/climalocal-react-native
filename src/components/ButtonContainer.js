import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonContainer = () => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>ATUALIZAR</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonContainer;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    button: {
        backgroundColor: '#222',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 15,
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
