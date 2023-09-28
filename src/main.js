import p5 from "p5"

import Game from "./game-components/Game"

const WIDTH = 500
const HEIGHT = 500

let game = new Game(WIDTH, HEIGHT)

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  // Sketch setup.
  p.setup = () => {
    let canvas = p.createCanvas(WIDTH, HEIGHT)
    canvas.parent("Canvas")
    p.background("black")

    game.nextLevel()
    game.nextLevel()
  }

  // Draw loop.
  p.draw = () => {
    p.background("black")

    game.draw(p)
    game.update(p)
  }
}

new p5(sketch)
