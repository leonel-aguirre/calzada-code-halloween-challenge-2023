import Candy from "./Candy"
import Cup from "./cup"

export const GAME_STATE = {
  MAIN_SCREEN: 0,
  PLAYING: 1,
  PAUSED: 2,
  GAME_OVER: 3,
}

class Game {
  constructor(p, width, height, goodCandiesImages, badCandiesImages, cupImage) {
    this.p = p

    this.width = width
    this.height = height

    this.timer = 0

    this.points = 0
    this.level = 0
    // this.maxCandies = 0
    this.candies = []
    // this.velocityLimit = 2
    // this.minCandyVelocity = 1
    this.maxCandyVelocity = 2

    this.cup = new Cup(this.p, this.width, this.height, cupImage)

    this.gameState = GAME_STATE.MAIN_SCREEN

    this.candyAppearanceRate = 2000
    // this.candyAppearanceProbability

    this.streak = 0
    this.maxStreak = 0

    this.strikes = 0

    this.goodCandiesImages = goodCandiesImages
    this.badCandiesImages = badCandiesImages
  }

  reset() {
    this.points = 0
    this.streak = 0
    this.strikes = 0
    this.level = 1
    this.candies = []
  }

  levelUp() {
    this.level += 1
    // this.maxCandies += 1

    // this.velocityLimit += 1

    // this.minCandyVelocity += 1
    this.maxCandyVelocity += 0.5

    this.candyAppearanceRate =
      this.candyAppearanceRate > 500
        ? this.candyAppearanceRate - 100
        : this.candyAppearanceRate

    // for (let i = 0; i < this.maxCandies; i++) {
    // this.candies.push(
    //   new Candy(this.p, this.width, this.height, this.candySpeed)
    // )
    // }

    // this.candies.forEach((candy) => candy.setVelocityLimit(this.velocityLimit))
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
      if (p.millis() >= this.candyAppearanceRate + this.timer) {
        this.candies.push(
          new Candy(
            this.p,
            this.width,
            this.maxCandyVelocity,
            this.goodCandiesImages,
            this.badCandiesImages
          )
        )
        this.timer = p.millis()
      }

      this.candies.forEach((candy) => candy.update())

      this.candies.forEach((candy, index) => {
        // Candy is under cup Y position.
        if (candy.position.y > this.cup.position.y) {
          // Candy is between cup bounds.
          if (
            candy.position.x > this.cup.position.x - candy.size / 2 &&
            candy.position.x <
              this.cup.position.x + candy.size / 2 + this.cup.size
          ) {
            const [caughtCandy] = this.candies.splice(index, 1)

            if (caughtCandy.isBad) {
              this.strikes += 1

              if (this.strikes === 3) {
                this.gameState = GAME_STATE.GAME_OVER
              }
            } else {
              this.points += 1
              this.streak += 1

              if (this.points % 5 === 0) {
                this.levelUp()
              }
            }

            // Candy is not between cup bounds.
          } else {
            const [fallenCandy] = this.candies.splice(index, 1)

            if (!fallenCandy.isBad) {
              this.streak = 0
            }
          }
        }
      })

      this.keyEvents(p)
    }
  }

  draw(p) {
    // const lines = 20
    // const lineHeight = this.height / lines

    // p.push()
    // p.noStroke()

    // for (let i = 0; i < lines; i++) {
    //   p.fill(i % 2 === 0 ? "#ff5722" : "#673ab7")
    //   p.rect(0, lineHeight * i, this.width, lineHeight * (i + 1))
    // }
    // p.pop()

    if (this.gameState === GAME_STATE.MAIN_SCREEN) {
      p.push()
      p.noStroke()
      p.fill("#ffffff88")
      p.rect(0, 0, this.width, this.height)
      p.fill("#240345")
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(48)
      p.textStyle(p.BOLD)
      p.text("TITLE", this.width / 2, this.height / 2)
      p.textSize(16)
      p.text('PRESS "SPACE" TO PLAY', this.width / 2, this.height / 2 + 48)
      p.pop()
    }

    if (this.gameState === GAME_STATE.PLAYING) {
      this.candies.forEach((candy) => candy.draw(p))
      this.cup.draw(p)
    }

    if (this.gameState === GAME_STATE.PAUSED) {
      p.push()
      p.noStroke()
      p.fill("#ffffff88")
      p.rect(0, 0, this.width, this.height)
      p.fill("#240345")
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(48)
      p.textStyle(p.BOLD)
      p.text("PAUSED", this.width / 2, this.height / 2)
      p.textSize(16)
      p.text(
        'PRESS "ESC" OR "SPACE" TO RESUME',
        this.width / 2,
        this.height / 2 + 48
      )
      p.pop()
    }

    if (this.gameState === GAME_STATE.GAME_OVER) {
      p.push()
      p.noStroke()
      p.fill("#ffffff88")
      p.rect(0, 0, this.width, this.height)
      p.fill("#240345")
      p.textAlign(p.CENTER, p.CENTER)
      p.textSize(48)
      p.textStyle(p.BOLD)
      p.text("GAME OVER", this.width / 2, this.height / 2)
      p.textSize(16)
      p.text(
        'PRESS "SPACE" TO PLAY AGAIN',
        this.width / 2,
        this.height / 2 + 48
      )
      p.pop()
    }

    if (this.gameState !== GAME_STATE.MAIN_SCREEN) {
      p.push()
      p.stroke("#fddafe")
      p.fill("#240345")
      p.strokeWeight(3)
      p.textSize(14)
      p.text(`Points: ${this.points}`, 10, 25)
      p.text(`Streak: ${this.streak}`, 10, 50)
      p.text(`Level: ${this.level}`, 10, 75)
      p.text(
        `Strikes: ${Array.from(Array(this.strikes))
          .map(() => "❌")
          .join(" ")}`,
        10,
        100
      )
      p.pop()
    }
  }

  setGameState(gameState) {
    this.gameState = gameState
  }
}

export default Game
