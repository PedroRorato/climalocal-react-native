import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const InfoBlock = ({ title, content }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.content}>{content}</Text>
        </View>
    );
};

export default InfoBlock;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: 'white',
        fontSize: 16,
        marginBottom: 5,
    },
    content: {
        color: 'white',
        fontSize: 30,
        fontWeight: 'bold',
    }
});
