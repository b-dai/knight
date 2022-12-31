import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';

export default function App() {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  const leftX = SCREEN_WIDTH / 4 - 75/2;
  const rightX = SCREEN_WIDTH / 4 * 3 - 75/2;
  const playerHeadY = SCREEN_HEIGHT / 3 * 2;

  const [vis, setVis] = useState([true, false]);
  const [onStartModal, setStartModalVis] = useState(true);
  
  const onLeftPress = () => {
    setVis([true, false]);
  };
  const onRightPress = () => {
    setVis([false, true]);
  };

  return (
    <ImageBackground source={require('./assets/back_image.png')} style={styles.container}>
      <Modal style={styles.startScreen} animationType='slide' visible={onStartModal}>

      </Modal>
      <AnimatedSprite
        sprite={knightSprite}
        animationFrameIndex={knightSprite.animationIndex('LEFT_IDLE')}
        loopAnimation={true}
        coordinates={{
          top: playerHeadY,
          left: leftX,
        }}
        size={{
          width: 75,
          height: 75,
        }}
        visible={vis[0]}
      />
      <AnimatedSprite
        sprite={knightSprite}
        animationFrameIndex={knightSprite.animationIndex('RIGHT_IDLE')}
        loopAnimation={true}
        coordinates={{
          top: playerHeadY,
          left: rightX,
        }}
        size={{
          width: 75,
          height: 75,
        }}
        visible={vis[1]}
      />
      <View style={styles.touchRegions}>
        <TouchableOpacity activeOpacity={0.0} onPress={onLeftPress}>
          <Text>
            .                                                                                                                                                   .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.0} onPress={onRightPress}>
          <Text>
            .                                                                                                                                                   .
          </Text>
        </TouchableOpacity>
      </View>
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
  touchRegions: {
    flex: 1,
    opacity: 0.0,
    flexDirection: 'row',
  },
  startScreen: {

  },
});
