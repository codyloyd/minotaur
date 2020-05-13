# SpriteSheet

*under construction*

constructor({path, context, colSize, rowSize, margin})

createSprite(x,y,w,h)
creates sprite from the given coords on the spritesheet

getSprite(col, row)
uses colSize and rowSize to grab an image from a specific column/row

getAnimatedSprite({frames, duration, loop, onComplete})

# Sprite

Sprite.draw(x,y,w,h)
draws the sprite to the canvas at the given coords

# AnimatedSprite

AnimatedSprite.update(dt)
must be called to advance the sprite frames

AnimatedSprite.draw(x,y,w,h)
draws the current frame to the canvas at the given coordinates
