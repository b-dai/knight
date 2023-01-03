import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import AnimatedSprite from 'react-native-animated-sprite';
import knightSprite from './components/knightSprite';
import { Swords } from './components/swords';

// get device screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const LEFT_X = SCREEN_WIDTH / 4 - 75/2;
const RIGHT_X = SCREEN_WIDTH / 4 * 3 - 75/2;
const PLAYER_HEAD_Y = SCREEN_HEIGHT / 3 * 2;

// global game variables
var framesPassed = 0;
var curSpeed = 5;

export default function App() {

  // game state variables
  const [vis, setVis] = useState([false, false]);
  const [onStartModal, setStartModalVis] = useState(true);
  const [onGameOverModal, setGameOverVis] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);
  
  // game engine calculation variables
  const BASE_SPEED = 5;
  const SCORE_MULT = 0.3;
  const engine = useRef(null);
  const [score, setScore] = useState(0);

  // game engine logic (happens each frame)
  function GameLoop (entities, { events, dispatch }) {

    // update frames and score
    framesPassed++;
    setScore(Math.floor(framesPassed * SCORE_MULT));
  
    // update swords falling
    const leftSwords = entities.left;
    const rightSwords = entities.right;
    leftSwords.position[1] += curSpeed;
    rightSwords.position[1] += curSpeed;

    // detect swords collision with player
    const leftBottomY = leftSwords.position[1] + 100;
    const rightBottomY = rightSwords.position[1] + 100;
    if (vis[0] && leftBottomY > PLAYER_HEAD_Y && leftSwords.position[1] < PLAYER_HEAD_Y+75) {
      dispatch("GAME_OVER");
    }
    if (vis[1] && rightBottomY > PLAYER_HEAD_Y && rightSwords.position[1] < PLAYER_HEAD_Y+75) {
      dispatch("GAME_OVER");
    }

    // respawn swords once fallen off screen
    if (leftSwords.position[1] > SCREEN_HEIGHT && rightSwords.position[1] > SCREEN_HEIGHT) {
      if (Math.random() > 0.5) {
        leftSwords.position[1] = -100;
      } else {
        rightSwords.position[1] = -100;
      }
      // handle increasing game difficulty
      const diffFrac = (framesPassed) / (3500 / SCORE_MULT);
      const calcNewSpeed = BASE_SPEED * 7 * diffFrac;
      curSpeed = calcNewSpeed >= BASE_SPEED ? calcNewSpeed : BASE_SPEED;
    }
  
    return entities;
  }
  
  // when left side screen pressed
  const onLeftPress = () => {
    if (gameRunning)
      setVis([true, false]);
  };

  // when right side screen pressed
  const onRightPress = () => {
    if (gameRunning)
      setVis([false, true]);
  };

  // on initial Start clicked
  const startGame = () => {
    setStartModalVis(false);
    setGameRunning(true);
    setVis([true, false]);
  };
  
  // on Play Again clicked
  const restartGame = () => {
    const toSwap = Math.random() > 0.5 ?
      {left: { position: [-180, -100], renderer: <Swords/>},
      right: { position: [5, -1000], renderer: <Swords/>}} :
      {left: { position: [-180, -1000], renderer: <Swords/>},
      right: { position: [5, -100], renderer: <Swords/>}};
    engine.current.swap(toSwap);
    framesPassed = 0;
    curSpeed = BASE_SPEED;
    setScore(0);
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
          left: { position: [-180, -100], renderer: <Swords/>},
          right: { position: [5, -1000], renderer: <Swords/>}
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
