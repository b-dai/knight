import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/back_image.png')} style={styles.gameBackground}>
        <Text>setup test</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameBackground: {
    flex: 1,
  },
});
