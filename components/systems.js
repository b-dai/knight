var framesPassed = 0;

const MoveSwords = (entities, { events, dispatch }) => {

    framesPassed++;
  
    const leftSwords = entities.left;
    const rightSwords = entities.right;
    leftSwords.position[1] += leftSwords.yspeed;
    rightSwords.position[1] += rightSwords.yspeed;
  
    return entities;
  };
  
  export { MoveSwords };
