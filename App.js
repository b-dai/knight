import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';

export default function App() {

  const [curAnim, setAnim] = useState('LEFT_IDLE');
  const [curLoopAnim, setLoopAnim] = useState(true);

  const animHandler = () => {
    setAnim('LEFT_TELEPORT');
  }

  return (
    <ImageBackground source={'./assets/back_image.png'} style={styles.container}>
      <AnimatedSprite
        sprite={knightSprite}
        animationFrameIndex={knightSprite.animationIndex(curAnim)}
        loopAnimation={curLoopAnim}
        coordinates={{
          top: 0,
          left: 0,
        }}
        size={{
          width: knightSprite.size.width,
          height: knightSprite.size.width,
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
