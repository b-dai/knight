import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';
import { Swords } from './components/swords';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const LEFT_X = SCREEN_WIDTH / 4 - 75/2;
const RIGHT_X = SCREEN_WIDTH / 4 * 3 - 75/2;
const PLAYER_HEAD_Y = SCREEN_HEIGHT / 3 * 2;

export default function App() {

  const [vis, setVis] = useState([false, false]);
  const [onStartModal, setStartModalVis] = useState(true);
  const [onGameOverModal, setGameOverVis] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  
  const SPEED = 5;
  const SCORE_MULT = 0.3;
  const engine = useRef(null);
  const [score, setScore] = useState(0);

  var framesPassed = 0;

  function GameLoop (entities, { events, dispatch }) {

    framesPassed++;
    setScore(Math.floor(framesPassed * SCORE_MULT));
  
    const leftSwords = entities.left;
    //const rightSwords = entities.right;
    leftSwords.position[1] += leftSwords.yspeed;
    //rightSwords.position[1] += rightSwords.yspeed;
  
    return entities;
  }
  
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
  const restartGame = () => {
    setVis([true, false]);
    setGameOverVis(false);
    setGameRunning(true);
  };

  return (
    <ImageBackground source={require('./assets/back_image.png')} style={styles.container}>
      {!onStartModal && <Text style={styles.scoreText}>{score}</Text>}
      <Modal animationType='slide' visible={onStartModal} transparent={true}>
        <TouchableOpacity style={styles.startButton} onPress={startGame}>
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>
      </Modal>
      <Modal animationType='slide' visible={onGameOverModal} transparent={true}>
        <TouchableOpacity style={styles.startButton} onPress={restartGame}>
          <Text style={styles.startText}>Play Again</Text>
        </TouchableOpacity>
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
        style={styles.engine}
        ref={engine}
        systems={[GameLoop]}
        entities={{
          left: { position: [-180, -100], yspeed: SPEED, renderer: <Swords/>},
        }}
        running={gameRunning}
        onEvent={(e) => {
          if (e == "GAME_OVER") {
            setGameRunning(false);
            setVis([false, false]);
            setGameOverVis(true);
          }
        }}/>
      <View style={styles.touchRegions}>
        <TouchableOpacity style={styles.leftRegion} activeOpacity={0.0} onPress={onLeftPress}>
          <Text>
            .                                                                                                                                                   .
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rightRegion} activeOpacity={0.0} onPress={onRightPress}>
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
    flex: null,
    opacity: 0.0,
    flexDirection: 'row',
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  leftRegion: {
    flex: 1,
    backgroundColor: "#f00",
  },
  rightRegion: {
    flex: 1,
    backgroundColor: "#0f0",
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
    flex: null,
    color: '#000',
    top: 128,
    fontWeight: 'bold',
    fontSize: 40,
    position: "absolute",
  },
  engine: {
    flex: 1,
  },
});
