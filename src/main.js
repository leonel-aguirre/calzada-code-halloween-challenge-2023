import p5 from "p5"

import Game, { GAME_STATE } from "./game-components/Game"

const WIDTH = 600
const HEIGHT = 600

const assetURLPrefix = "../assets"

let game

let backgroundImage
let mainScreenImage
let goodCandiesImages = ["a", "b", "c", "d", "e", "f"]
let badCandiesImages = ["v", "w", "x", "y", "z"]
let cupImage

/**
 * Displays a p5 sketch.
 *
 * @param {p5} p p5 object reference.
 */
const sketch = (p) => {
  p.preload = () => {
    backgroundImage = p.loadImage(`${assetURLPrefix}/background.jpg`)
    mainScreenImage = p.loadImage(`${assetURLPrefix}/main-screen.png`)
    goodCandiesImages = goodCandiesImages.map((indexLetter) =>
      p.loadImage(`${assetURLPrefix}/candy-${indexLetter}.png`)
    )
    badCandiesImages = badCandiesImages.map((indexLetter) =>
      p.loadImage(`${assetURLPrefix}/candy-${indexLetter}.png`)
    )
    cupImage = p.loadImage(`${assetURLPrefix}/cup.png`)
  }

  // Sketch setup.
  p.setup = () => {
    let canvas = p.createCanvas(WIDTH, HEIGHT)
    game = new Game(p, WIDTH, HEIGHT, {
      backgroundImage,
      mainScreenImage,
      goodCandiesImages,
      badCandiesImages,
      cupImage,
    })
    canvas.parent("Canvas")
    p.background("black")

    game.levelUp()
  }

  // Draw loop.
  p.draw = () => {
    game.draw(p)
    game.update(p)
  }

  p.keyPressed = () => {
    switch (game.gameState) {
      case GAME_STATE.MAIN_SCREEN:
        // SPACE.
        if (p.keyCode === 32) {
          game.reset()
          game.setGameState(GAME_STATE.PLAYING)
        }
        break
      case GAME_STATE.PLAYING:
        // SPACE or ESC.
        if (p.keyCode === 27 || p.keyCode === 32) {
          game.setGameState(GAME_STATE.PAUSED)
        }
        break
      case GAME_STATE.PAUSED:
        // SPACE or ESC.
        if (p.keyCode === 27 || p.keyCode === 32) {
          game.setGameState(GAME_STATE.PLAYING)
        }
        break
      case GAME_STATE.GAME_OVER:
        // SPACE.
        if (p.keyCode === 32) {
          game.reset()
          game.setGameState(GAME_STATE.PLAYING)
        }
        break
    }
  }
}

new p5(sketch)
