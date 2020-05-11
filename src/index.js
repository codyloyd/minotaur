class Game {
  constructor({width, height, scale=1, parent="game"}) {
    this.width = width
    this.height = height
    this.parent = document.getElementById(parent)

    this.canvas = document.createElement('canvas')
    this.canvas.width = this.width * scale 
    this.canvas.height = this.height * scale 

    this.context = this.canvas.getContext('2d')
    this.context.scale(scale, scale)

    this.parent.appendChild(this.canvas)

    this.oldTimeStamp = 0
    this.running = false
  }

  update() {
    throw(new Error('must implement `update` function'))
  }

  draw() {
    throw(new Error('must implement `draw` function'))
  }

  start() {
    window.requestAnimationFrame(this.gameLoop.bind(this))
    this.running = true
  }

  stop() {
    this.running = false
  }

  gameLoop(timeStamp) {
    // calculate deltaTime
    const deltaTime = (timeStamp - this.oldTimeStamp)
    this.oldTimeStamp = timeStamp

    this.update(deltaTime/1000)
    this.draw()

    if (this.running) {
      window.requestAnimationFrame(this.gameLoop.bind(this))
    }
  }
}

module.exports = {
  Game
}