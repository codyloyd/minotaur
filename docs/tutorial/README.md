# Tutorial

In this tutorial, we are going to build a straightforward clone of the game 'PONG' using tiny-game.

### A basic outline of what we're going to cover.

1. Project setup.
2. Drawing shapes with the Canvas API.
3. Animating those shapes.
4. Accepting user input.
5. Object collision.
6. Game states.

## Project setup

Tiny-game is intended to be used with modern JavaScript build-tools. You can get as far into setting up your environment as you want, but for this tutorial, we're going to keep things pretty basic.

We'll be using webpack to build our project and "http-server" to serve it so we can view it in the browser.  If you know what you're doing, feel free to use any other combination of bundler and server.

### Installations

Create a folder for the project and inside it run the following command to install the dependencies we'll need to build our game.
```
npm install @codyloyd/tiny-game

npm install --save-dev webpack webpack-cli

npm install -g simple-http-server
```

Run the following commands to create the files we'll be using.
```
touch index.html

mkdir src
touch src/index.js
```

Add the following basic boilerplate to your `index.html`:
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <title>TinyGame!</title>
</head>
<body>
  <style>
    body {
      background: blue;
    }
    canvas {
      border: 4px solid black ;
      background: white;
    }
  </style>
  <div id="game"></div>
  <script src="dist/main.js"></script>
</body>
</html>
```

Feel free to set up your HTML and CSS however you like. The critical item here is the `<div id="game">` which TinyGame uses to set up the game canvas.

In `src/index.js`, add the following code to import and initialize a new `Game` object.

```javascript
// src/index.js
import {Game} from '@codyloyd/tiny-game'

const game = new Game({
  width: 400,
  height: 400,
  parent: 'game'
})

game.update = function(dt) {
}

game.draw = function() {
}

game.start()
```

At this point, if you build the code with webpack, you should be able to run it in your browser, and see a blank canvas! Run the following in the project folder:
```
npx webpack --mode=development --watch
```
in another terminal run
```
http-server
```

Watch the output as the server command runs and look for a URL.  The default at the time of this writing is `http://localhost:8080`, but depending on the specifics of your system, it might be slightly different.  Whatever the URL is, open it in your browser. You should see this:

![blank canvas](./img/blank.png)

## Drawing shapes

To draw shapes to our canvas, we are going to reference the native HTML Canvas API.
- [Here is an introduction](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage) to Canvas if you've never seen it
- [This page](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) is probably the most useful documentation page.

You don't need to know everything about Canvas to get started here. The general overview provided by the links above should be good enough for now.

Instead of re-implementing all of these canvas drawing functions, tiny-game exposes the rendering context of the game canvas that is created when you run `new Game()`. Therefore, to draw shapes, all you need to do is reference that context and use the built-in methods!

In your `src/index.js` file, add a `fillRect` function to your game.draw() function like this:

```javascript
game.draw() {
  game.context.fillRect(20,20,100,100)
}
```

When you refresh your browser, you should now see a 100px wide black square in the upper corner of your Canvas! 

Most Canvas drawing functions, and therefore most tiny-game functions take a similar set of arguments.  In this case, the arguments are, in order: 

1. `x`: the x coordinates of the top-left corner of our shape
2. `y`: the y coordinates of the top-left corner of our shape
3. `width`: the width of our shape
4. `height`: the height of our shape

Which means, we've drawn a rectangle that starts at `x:20, y:20` and is `100px/100px`.

### Game Objects

For our PONG clone, we're going to need 3 shapes:
- 2 rectangle paddles 
- a ball. 

To keep our code organized and to make moving these shapes around easier later, we're going to store them in JavaScript objects.

Add these objects to your `src/index.js` and then draw them inside your `game.draw()` function:

```javascript
const ball = {
  x: 200,
  y: 200,
  radius: 15
}

const leftPaddle = {
  x: 10,
  y: 10,
  w: 10,
  h: 100
}

const rightPaddle = {
  x: game.width - 20,
  y: 10,
  w: 10,
  h: 100
}

game.draw = function() {
  game.context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h)
  game.context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h)

  // this is the code for drawing a circle for our ball.
  game.context.beginPath()
  game.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  game.context.fill()
}
```

The code for drawing a circle is a little tedious, so if it's something that you're going to be doing a lot you may want to abstract it out to it's own function like so:
```javascript
function drawCircle(x,y,radius) {
  game.context.beginPath()
  game.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  game.context.fill()
}
```

Since we only need to draw one ball, we don't need to worry about this for now.

### Color

Drawing in color with Canvas is easy. Before doing a drawing operation, set a `fillStyle` using a css-color string. For something as simple as PONG, we don't need much color, but just to keep things interesting, let's pick a couple of colors for our paddles and ball. You can use any color that would be recognized in a css file such as an `rgb` or `hsl` color.  Even [named colors](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Color_keywords) are recognized.

Let's use a couple of hex colors for now.

```javascript
game.draw = function() {
  // this fillRect covers the entire screen and is the 'background' for our game
  game.context.fillStyle = "#003049"
  game.context.fillRect(0,0,game.width, game.height)
  game.context.fillStyle = "#eae2b7"
  game.context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.w, leftPaddle.h)
  game.context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.w, rightPaddle.h)

  // this is the code for drawing a circle for our ball.
  game.context.fillStyle = "#fcbf49"
  game.context.beginPath()
  game.context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  game.context.fill()
}
```

At this point, your code should [look like _this_](https://gist.github.com/codyloyd/0dae073b76753afe578cbd618c875fd7)

And running the game gives us this:
![color](./img/colors.png)


## Animation
To set things into motion, update each game object's position variables inside of the `game.update()` function.

To begin with, moving the ball across the screen is as simple as doing something like this:
```javascript
game.update(dt) {
  ball.x += 1
}
```
The above code runs every frame and increment the `x` position of the ball by 1px. However, the following issues arise:
- The movement speed is dependent on the game's framerate.
- The speed of the ball is constant and cannot be changed.

Updating our ball object and the `game.update()` function fixes both of these issues.

First, add variables to your ball object for x and y velocity.  Call them `vx` and `vy` and then use those variables to control the speed of the ball:

```javascript
const ball = {
  x: 200,
  y: 200,
  vx: 50,
  vy: 60,
  radius: 15
}

game.update = function(dt) {
  // update ball position
  ball.x += ball.vx * dt
  ball.y += ball.vy * dt
}
```
Notice that in the above snippet, we multiply the velocity by `game.update`'s `dt` parameter.  This parameter stands for the amount of time that has elapsed since the last time `game.update` has been called.  Doing this calculation keeps the speed of the ball consistent, even if the framerate lags and the time between each iteration of the update function are inconsistent.

### Wall Bounce

Making the ball bounce off of the walls requires checking the position of the ball and changing its direction once it hits the edge of the game canvas. We can do this check inside of the update function like so:

``` javascript
game.update = function(dt) {
  // update ball position
  ball.x += ball.vx * dt
  ball.y += ball.vy * dt
  
  if (ball.x > game.width - ball.radius || ball.x < ball.radius) {
    ball.vx *= -1
  }
  if (ball.y > game.width - ball.radius || ball.y < ball.radius) {
    ball.vy *= -1
  }
}
```
With circles, the `x` and `y` coordinates refer to the center of the circle, and the `radius` is the distance from the center to the edge. Therefore when we do the calculation we have to take ball.radius into account.

On our game canvas, the ball is considered out of bounds if `ball.x` is bigger than `game.width - ball.radius` or if it is smaller than `ball.radius`.

If you run the game now, the ball should move and bounce around the screen.  Feel free to update the velocity variables inside the ball object to fine-tune the speed.

## User input
Next up is taking user input to control the movement of the paddles.

TODO

## Object collision

TODO

## Score and Game states

TODO
