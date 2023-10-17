import p5 from "p5"

import Game, { GAME_STATE } from "./game-components/Game"

const WIDTH = 500
const HEIGHT = 500

let game

let backgroundImage
let goodCandiesImages = ["a", "b", "c", "d", "e", "f"]
let badCandiesImages = ["v", "w", "x", "y", "z"]

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  p.preload = () => {
    backgroundImage = p.loadImage("../assets/background.jpg")
    goodCandiesImages = goodCandiesImages.map((indexLetter) =>
      p.loadImage(`../assets/candy-${indexLetter}.png`)
    )
    badCandiesImages = badCandiesImages.map((indexLetter) =>
      p.loadImage(`../assets/candy-${indexLetter}.png`)
    )
  }

  // Sketch setup.
  p.setup = () => {
    console.log({ goodCandiesImages, badCandiesImages })

    let canvas = p.createCanvas(WIDTH, HEIGHT)
    game = new Game(
      p,
      WIDTH,
      HEIGHT,
      GAME_STATE.PAUSED,
      goodCandiesImages,
      badCandiesImages
    )
    canvas.parent("Canvas")
    p.background("black")

    game.levelUp()
  }

  // Draw loop.
  p.draw = () => {
    p.image(backgroundImage, 0, 0, WIDTH, HEIGHT)

    game.draw(p)
    game.update(p)
  }

  p.keyTyped = () => {
    if (p.keyCode === 32) {
      if (
        game.gameState === GAME_STATE.PAUSED ||
        game.gameState === GAME_STATE.PLAYING
      ) {
        let isGamePaused = game.gameState === GAME_STATE.PAUSED

        if (isGamePaused) {
          game.setGameState(GAME_STATE.PLAYING)
        } else {
          game.setGameState(GAME_STATE.PAUSED)
        }
      }

      if (game.gameState === GAME_STATE.END_GAME) {
        game.reset()
        game.setGameState(GAME_STATE.PLAYING)
      }
    }
  }
}

new p5(sketch)
