// Supply knight character animation assets and frames
const knightSprite = {
    name: "knight",
    size: { width: 200, height: 200 },
    animationTypes: ['LEFT_IDLE', 'LEFT_TELEPORT', 'RIGHT_IDLE', 'RIGHT_TELEPORT'],
    frames: [
        require('../assets/knight_left_idle01.png'),
        require('../assets/knight_left_idle02.png'),
        require('../assets/knight_left_idle03.png'),
        require('../assets/knight_left_teleport01.png'),
        require('../assets/knight_left_teleport02.png'),
        require('../assets/knight_right_idle01.png'),
        require('../assets/knight_right_idle02.png'),
        require('../assets/knight_right_idle03.png'),
        require('../assets/knight_right_teleport01.png'),
        require('../assets/knight_right_teleport02.png'),
    ],
    animationIndex: function getAnimationIndex(animationType) {
        switch (animationType) {
            case 'LEFT_IDLE':
                return [0,1,2,1];
            case 'LEFT_TELEPORT':
                return [3,4];
            case 'RIGHT_IDLE':
                return [5,6,7,6];
            case 'RIGHT_TELEPORT':
                return [8,9];
        }
    },
};

export default knightSprite;