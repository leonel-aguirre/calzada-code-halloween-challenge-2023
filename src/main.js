import p5 from "p5"

import Game, { GAME_STATE } from "./game-components/Game"

const WIDTH = 500
const HEIGHT = 500

let game

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  // Sketch setup.
  p.setup = () => {
    let canvas = p.createCanvas(WIDTH, HEIGHT)
    game = new Game(p, WIDTH, HEIGHT, GAME_STATE.PAUSED)
    canvas.parent("Canvas")
    p.background("black")

    game.nextLevel()
  }

  // Draw loop.
  p.draw = () => {
    p.background("black")

    game.draw(p)
    game.update(p)
  }

  p.keyTyped = () => {
    console.log(p.keyCode)

    if (
      p.keyCode === 32 &&
      (game.gameState === GAME_STATE.PAUSED ||
        game.gameState === GAME_STATE.PLAYING)
    ) {
      let isGamePaused = game.gameState === GAME_STATE.PAUSED

      if (isGamePaused) {
        game.setGameState(GAME_STATE.PLAYING)
      } else {
        game.setGameState(GAME_STATE.PAUSED)
      }
    }
  }
}

new p5(sketch)
