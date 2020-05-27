# Minotaur Game Toolkit

A minimal JavaScript game toolkit.

## WHAT? WHY?

Most JavaScript game frameworks do _too much_.  For small game prototypes and game-jam projects, you don't really need all the overhead and fuss associated with some of the other popular JavaScript game frameworks.

JavaScript, and the HTML Canvas API are quite capable by themselves.

This toolkit fills in the gap between manipulating the Canvas directly, and using a monolithic framework by setting up the canvas and a game-loop for you.

## Usage

Getting started is _simple_.
```
// install with npm
npm install @codyloyd/minotaur-base
```

Include and initialize: 
```javascript
import {Game} from '@codyloyd/minotaur-base'

const game = new Game({
  width: 480,
  height:  360,
  parent: 'game'
})
// `parent` is the id of an element to which Minotaur will append the game-canvas


game.update = function(dt) {
  // update game state here
}

game.draw = function() {
  // draw game elements here
}

// call game.start() to start the game loop!
game.start()
```

### drawing to the canvas

Minotaur simply exposes the native HTML Canvas API, so drawing images, shapes and text is as simple as referencing that API through the game object with `game.context`.

this example draws a "darkblue" rectangle to the canvas
```javascript
const game = new Game({
  width: 480,
  height:  360,
  parent: 'game'
})

game.draw = function() {
  game.context.fillStyle = "darkblue"
  const x = 100
  const y = 100
  const width = 25
  const height = 75
  game.context.fillRect(x,y,width,height)
}
```

Refer to documentation for the [HTML Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) for everything you can do here. 

### make it GO!
Making a proper game requires things to move around! JavaScript already includes everything you need to create and update variables to make things animate across your canvas.
```javascript
let rectangle = {x: 10, y: 10, width: 20, height: 20}

game.update = function(dt) {
  rectangle.x += 50 * dt
  rectangle.y += 50 * dt
}

game.draw = function() {
  // clears the screen so each frame gets a clear canvas
  game.context.clearRect(0, 0, game.width, game.height)

  game.context.fillStyle = "darkblue"
  game.context.fillRect(
    rectangle.x,
    rectangle.y,
    rectangle.width,
    rectangle.height
  )
}
```
the `update` and `draw` functions attempt to run at 60fps... so in the above example the rectangle object is updated consistently so that it moves across the screen as it is drawn.

the function parameter `dt` stands for Delta Time. It is the amount of time that has passed between each frame, in milliseconds.  Use this variable when manipulating variables so that the speed of your animation does not fluctuate if the animation framerate fluctuates.  For more details see (this article)[https://www.isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing].

## Drawing images

Drawing individual images with the HTML Canvas API is not difficult ([docs here](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)), however most games deal with _large_ numbers of images, and often bundle them into spritesheets.  We've created our SpriteSheet module to make slicing and sorting spritesheets a little easier.

```javascript
const spriteSheet = new SpriteSheet({
  path: "/img/spritesheet.png",
  context: game.context,
  // the size of each sprite in the spritesheet only used for 'getSprite'
  // if your sheet has some sprites that don't fit into the grid, you can
  // use `createSprite` to get them with specific pixel values
  colSize: 32,
  rowSize: 32,
  // optional property, if there is a margin around your sprites
  margin: 0
});

// get a sprite by putting in it's row/column on the spritesheet
const player = spriteSheet.getSprite(0, 0);
const enemy = spriteSheet.getSprite(5, 0);

// alternatively put in actual pixel values, x,y,w,h
const enemy2 = spriteSheet.createSprite(128, 0, 32, 32);

game.draw = function () {
  //Sprites reference the context passed into the 'spritesheet' constructor
  //draw takes the standard x, y, width, height, parameters
  player.draw(100, 100, 100, 100);
  enemy.draw(300, 200, 100, 100);
  enemy2.draw(250, 400, 100, 100);
};
```

## User Input

This library does not handle user input.  JavaScript is perfectly capable of handling that all by itself.  Here is a naive example: 

```javascript
const position = {x:10, y:10}

window.onkeydown = function({key}) {
  if (key=='ArrowRight') {
    position.x += 10
  }
  if (key=='ArrowLeft') {
    position.x -= 10
  }
  if (key=='ArrowUp') {
    position.y -= 10
  }
  if (key=='ArrowDown') {
    position.y += 10
  }
}

game.draw = function() {
  game.context.fillRect(position.x, position.y, 10, 10)
}
```

See [this example](https://github.com/codyloyd/tiny-pong/blob/master/src/index.js#L15) for a more nuanced handling of user input.
