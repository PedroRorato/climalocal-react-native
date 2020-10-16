import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';

import InitialScreen from './src/screens/InitialScreen';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <InitialScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
