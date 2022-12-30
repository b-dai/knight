import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';

export default function App() {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  const leftX = SCREEN_WIDTH / 4 - 75/2;
  const rightX = SCREEN_WIDTH / 4 * 3 - 75/2;
  const playerHeadY = SCREEN_HEIGHT / 3 * 2;

  const [curAnim, setAnim] = useState('LEFT_IDLE');
  const [curPosX, setPosX] = useState(leftX);

  const animHandler = () => {
    setAnim('LEFT_TELEPORT');
  }

  const onAnimFinished = () => {
    if (curAnim == 'LEFT_TELEPORT')
      setAnim('LEFT_IDLE');
    else if (curAnim == 'RIGHT_TELEPORT')
      setAnim('RIGHT_IDLE');
  }

  return (
    <ImageBackground source={require('./assets/back_image.png')} style={styles.container}>
      <AnimatedSprite
        sprite={knightSprite}
        animationFrameIndex={knightSprite.animationIndex(curAnim)}
        loopAnimation={true}
        coordinates={{
          top: playerHeadY,
          left: curPosX,
        }}
        size={{
          width: 75,
          height: 75,
        }}
        onAnimationFinish={onAnimFinished}
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
