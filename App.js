import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';
import { CountFrames, MoveSwords } from './components/systems';
import { Swords } from './components/renderers';

export default function App() {

  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
  const LEFT_X = SCREEN_WIDTH / 4 - 75/2;
  const RIGHT_X = SCREEN_WIDTH / 4 * 3 - 75/2;
  const PLAYER_HEAD_Y = SCREEN_HEIGHT / 3 * 2;

  const [vis, setVis] = useState([false, false]);
  const [onStartModal, setStartModalVis] = useState(true);
  const [onGameOverModal, setGameOverVis] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  
  const [score, setScore] = useState(0);
  
  const onLeftPress = () => {
    if (gameRunning)
      setVis([true, false]);
  };
  const onRightPress = () => {
    if (gameRunning)
      setVis([false, true]);
  };
  const startGame = () => {
    setStartModalVis(false);
    setGameRunning(true);
    setVis([true, false]);
  };

  return (
    <ImageBackground source={require('./assets/back_image.png')} style={styles.container}>
      <Text style={styles.scoreText}>{score}</Text>
      <Modal animationType='slide' visible={onStartModal} transparent={true}>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </Modal>
      <Modal animationType='slide' visible={onGameOverModal} transparent={true}>
        
      </Modal>
      <AnimatedSprite
        sprite={knightSprite}
        animationFrameIndex={knightSprite.animationIndex('LEFT_IDLE')}
        loopAnimation={true}
        coordinates={{
          top: PLAYER_HEAD_Y,
          left: LEFT_X,
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
          top: PLAYER_HEAD_Y,
          left: RIGHT_X,
        }}
        size={{
          width: 75,
          height: 75,
        }}
        visible={vis[1]}
      />
      <GameEngine
        systems={[CountFrames]}
        entities={{
          
        }}>
        
      </GameEngine>
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
  startButton: {
    marginTop: 500,
    marginHorizontal: 124,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#d0ffec',
    borderRadius: 16,
    backgroundColor: '#009f0e',
    alignItems: 'center',
  },
  startText: {
    color: '#d0ffec',
    fontWeight: 'bold',
    fontSize: 20,
  },
  scoreText: {
    color: '#000',
    marginTop: 128,
    fontWeight: 'bold',
    fontSize: 40,
  },
});
