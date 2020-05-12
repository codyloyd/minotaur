class SpriteSheet {
  constructor({ path, context, colSize, rowSize, margin = 0 }) {
    this.context = context;
    this.colSize = colSize;
    this.rowSize = rowSize;
    this.margin = margin;
    this.image = new Image();
    this.image.src = path;
    this.image.onload = () => {};
  }

  // grabs the image at a specific x/y/w/h in the sheet
  createSprite(x, y, w, h) {
    return new Sprite(this.context, this.image, x, y, w, h);
  }

  // gets a sprite in a specific column/row based on colSize/rowSize
  getSprite(col, row) {
    // TODO: make colSize/rowSize optional, throw error here.
    return new Sprite(
      this.context,
      this.image,
      this.colSize * col + this.margin * col,
      this.rowSize * row + this.margin * row,
      this.colSize,
      this.rowSize
    );
  }

  getAnimatedSprite({frames, duration, loop, onComplete}) {
    const spriteFrames = frames.map(([x,y])=>{
      return this.getSprite(x,y)
    })
    return new AnimatedSprite({onComplete, loop, context: this.context, image: this.image, frames: spriteFrames, duration})
  }
}

class Sprite {
  constructor(context, img, x, y, w, h) {
    this.context = context;
    this.img = img;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw(x, y, w, h) {
    this.context.drawImage(
      this.img,
      this.x,
      this.y,
      this.h,
      this.w,
      x,
      y,
      w,
      h
    );
  }
}

class AnimatedSprite {
  constructor({frames, duration, loop=true, onComplete=()=>{}}) {
    this.frames = frames
    this.currentFrame = 0
    this.time = 0
    this.duration = duration
    this.loop = loop
    this.onComplete = onComplete
    this.running = true
  }

  advanceFrame() {
    this.currentFrame++

    if (this.loop) {
      this.currentFrame = this.currentFrame % this.frames.length
    } else if (this.currentFrame == this.frames.length-1) {
      this.running = false
      this.onComplete()
    }
  }

  update(dt) {
    this.time += dt
    if (this.time > this.duration && this.running) {
      this.time = 0
      this.advanceFrame()
    }
  }

  draw(x,y,w,h) {
    this.frames[this.currentFrame].draw(x,y,w,h)
  }
}

module.exports = { SpriteSheet };