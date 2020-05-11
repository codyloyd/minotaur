# tiny-game

A teeny-tiny JavaScript game framework.

## WHAT? WHY?

Most JavaScript game frameworks do _too much_.  For small game prototypes and game-jam projects, you don't really need all the overhead and fuss associated with some of the other popular JavaScript game frameworks.

JavaScript, and the HTML Canvas API are quite capable by themselves.

This toolkit fills in the gap between manipulating the Canvas directly, and using a monolithic framework by setting up the canvas and a game-loop for you.

## Usage

Getting started is _simple_.
```
// install with npm
npm install tiny-game
```

Include and initialize: 
```javascript
import {Game} from 'tiny-game'

const game = new Game({
  width: 480,
  height:  360,
  parent: 'game'
})
// `parent` is the id of an element to which tiny-game will append the game-canvas


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

`tiny-game` simply exposes the native HTML Canvas API, so drawing images, shapes and text is as simple as referencing that API through the game object with `game.context`.

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