import Candy from "./Candy"
import Cup from "./cup"

export const GAME_STATE = {
  MAIN_SCREEN: 0,
  PLAYING: 1,
  PAUSED: 2,
}

class Game {
  constructor(p, width, height, gameState) {
    this.p = p

    this.width = width
    this.height = height

    this.points = 0
    this.level = 0
    // this.maxCandies = 0
    this.candies = []
    this.velocityLimit = 2

    this.cup = new Cup(this.p, this.width, this.height)

    this.gameState = gameState
  }

  nextLevel() {
    this.level += 1
    // this.maxCandies += 1

    this.velocityLimit += 1

    // for (let i = 0; i < this.maxCandies; i++) {
    this.candies.push(
      new Candy(this.p, this.width, this.height, this.candySpeed)
    )
    // }

    this.candies.forEach((candy) => candy.setVelocityLimit(this.velocityLimit))
  }

  keyEvents(p) {
    if (p.keyIsDown(65) || p.keyIsDown(p.LEFT_ARROW)) {
      this.cup.moveLeft()
    }

    if (p.keyIsDown(68) || p.keyIsDown(p.RIGHT_ARROW)) {
      this.cup.moveRight()
    }
  }

  update(p) {
    if (this.gameState === GAME_STATE.PLAYING) {
      this.candies.forEach((candy) => candy.update())

      this.candies.forEach((candy) => {
        if (
          candy.position.x > this.cup.position.x &&
          candy.position.x < this.cup.position.x + this.cup.size &&
          candy.position.y > this.cup.position.y
        ) {
          candy.position.x = Math.random() * this.height
          candy.position.y = 0

          this.points += 1

          if (this.points % 5 === 0) {
            this.nextLevel()
          }
        }
      })

      this.keyEvents(p)
    }
  }

  draw(p) {
    this.candies.forEach((candy) => candy.draw(p))
    this.cup.draw(p)

    p.push()
    p.fill("#ffffff")
    p.text(`Points: ${this.points}`, 10, 20)
    p.text(`Level: ${this.level}`, 10, 40)
    p.pop()

    if (this.gameState === GAME_STATE.PAUSED) {
      p.push()
      p.noStroke()
      p.fill("#ffffff88")
      p.rect(0, 0, this.width, this.height)
      p.fill("#000000")
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(48)
      p.textStyle(p.BOLD)
      p.text("PAUSED", this.width / 2, this.height / 2)
      p.pop()
    }
  }

  setGameState(gameState) {
    this.gameState = gameState
  }
}

export default Game
