import p5 from "p5"

import Cup from "./game-components/cup"

const WIDTH = 500
const HEIGHT = 500

let cup = new Cup(WIDTH)

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  const keyEvents = () => {
    if (p.keyIsDown(65) || p.keyIsDown(p.LEFT_ARROW)) {
      cup.moveLeft()
    }

    if (p.keyIsDown(68) || p.keyIsDown(p.RIGHT_ARROW)) {
      cup.moveRight()
    }
  }

  // Sketch setup.
  p.setup = () => {
    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
    p.background("black")

    cup.initializePosition(WIDTH / 2, HEIGHT - 40)
  }

  // Draw loop.
  p.draw = () => {
    p.background("black")

    cup.draw(p)

    keyEvents()
  }
}

new p5(sketch)
