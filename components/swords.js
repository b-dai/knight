import React from "react";
import { Image } from "react-native";

function Swords ({position}) {
    return (
        <Image source={require('../assets/swords.png')}
            style={
                {
                    width: 175,
                    height: 100,
                    position: "absolute",
                    resizeMode: "stretch",
                    left: position[0],
                    top: position[1],
                }
            }/>
    );
}

export { Swords };