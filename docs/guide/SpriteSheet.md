## Drawing Images

Drawing individual images to the canvas using the basic Canvas API is not difficult. ([docs here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage))) However, most games deal with many images at once, and often organize those images into single-file spritesheets, which makes using the native API somewhat tedious.

Our `SpriteSheet` module provides some nice tools to make drawing images a little simpler.

```javascript
import {SpriteSheet} from '@codyloyd/minotaur-base'

const spriteSheet = new SpriteSheet({
  path: "/img/spritesheet.png",
  context: game.context,
  // the colSize and rowSize refer to the size of each sprite. 
  // they are used for 'getSprite' and 'animatedSprite' 
  // if your sheet has some sprites that don't fit into the grid, 
  // you can use `createSprite` to get them with specific pixel values
  colSize: 32,
  rowSize: 32,
  // optional property, if there is a margin between your sprites
  margin: 0
});

// get a sprite by putting in it's row/column on the spritesheet
// `0,0` refers to the image in the top-left corner of the spritesheet
const player = spriteSheet.getSprite(0, 0);
// `5,0` refers to the sprite in the 6th column, on the first row
const enemy = spriteSheet.getSprite(5, 0);

// alternatively put in actual pixel values, x,y,w,h
// useful for sprites that do not fit nicely into your grid
const enemy2 = spriteSheet.createSprite(128, 0, 32, 32);

game.draw = function () {
  // Sprites reference the context passed into the 'spritesheet' constructor
  // draw takes the standard x, y, width, height, parameters
  player.draw(100, 100, 100, 100);
  enemy.draw(300, 200, 100, 100);
  enemy2.draw(250, 400, 100, 100);
};
```

## Animated Sprites

The `getAnimatedSprite` function returns an `AnimatedSprite` object which can be used to draw animations

<!-- TODO: finish this -->