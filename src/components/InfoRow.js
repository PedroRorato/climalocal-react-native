import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const InfoRow = ({children}) => {
    return (
        <View style={styles.container}>
            {children}
        </View>
    );
};

export default InfoRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 20,
    },
});
