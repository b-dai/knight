import React, { PureComponent } from "react";
import { StyleSheet, Image } from "react-native";

class Swords extends PureComponent {
  render() {
    const x = this.props.position[0]-540/2;
    const y = this.props.position[1]-200/2;
    return (
        <Image style={[styles.swords, { left: x, top: y }]} source={require('../assets/swords.png')}/>
    );
  }
}

const styles = StyleSheet.create({
  swords: {
    width: 540,
    height: 200,
    position: "absolute",
    resizeMode: "stretch",
  },
});

export { Swords };