const SPEED = 2;
var framesPassed = 0;

const CountFrames = () => {
    framesPassed++;
    console.log(framesPassed);
};

const MoveSwords = (entities, { touches }) => {
  
    // entities.forEach(swords => {
    //   if (swords && swords.position) {
    //     swords.position = [
    //       swords.position[0],
    //       swords.position[1] + SPEED
    //     ];
    //   }
    // });
    // entities[1].position = [swords.position[0],
    //       swords.position[1] + SPEED];
  
    return entities;
  };
  
  export { CountFrames };
  export { MoveSwords };
