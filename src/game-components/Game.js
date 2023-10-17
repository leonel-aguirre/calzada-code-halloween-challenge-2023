import Candy from "./Candy"
import Cup from "./cup"

/**
 * Game state constatns.
 */
export const GAME_STATE = {
  MAIN_SCREEN: 0,
  PLAYING: 1,
  PAUSED: 2,
  GAME_OVER: 3,
}

/**
 * Game class.
 */
class Game {
  /**
   * Creates a Game instance.
   *
   * @param {p5} p p5 object reference.
   * @param {number} width canvas width.
   * @param {number} height canvas height.
   * @param {object} images game images object.
   */
  constructor(p, width, height, images) {
    this.p = p

    // Game width and height.
    this.width = width
    this.height = height

    // Images object.
    this.images = images

    // Helps control candy appearance rate.
    this.timer = 0

    // Initial candy appearance rate in milliseconds.
    this.candyAppearanceRate = 2000

    // Base parameters.
    this.points = 0
    this.level = 0
    this.streak = 0
    this.maxStreak = 0
    this.strikes = 0

    // Stores on-screen candies.
    this.candies = []

    // Candy velocity.
    this.maxCandyVelocity = 2

    // Unique instance of the Cup object.
    this.cup = new Cup(this.p, this.width, this.height, images.cupImage)

    // Default game state.
    this.gameState = GAME_STATE.MAIN_SCREEN
  }

  /**
   * Resets game values.
   */
  reset() {
    this.points = 0
    this.streak = 0
    this.strikes = 0
    this.level = 1
    this.candies = []
  }

  /**
   * Updates parameters after leveling up.
   */
  levelUp() {
    this.level += 1

    this.maxCandyVelocity += 0.5

    this.candyAppearanceRate =
      this.candyAppearanceRate > 500
        ? this.candyAppearanceRate - 100
        : this.candyAppearanceRate
  }

  /**
   * Game's keyEvents method.
   *
   * @param {p5} p p5 object reference.
   */
  keyEvents(p) {
    // A and Left Arrow.
    if (p.keyIsDown(65) || p.keyIsDown(p.LEFT_ARROW)) {
      this.cup.moveLeft()
    }

    // D and Right Arrow.
    if (p.keyIsDown(68) || p.keyIsDown(p.RIGHT_ARROW)) {
      this.cup.moveRight()
    }
  }

  /**
   * Game's update method.
   *
   * @param {p5} p p5 object reference.
   */
  update(p) {
    if (this.gameState === GAME_STATE.PLAYING) {
      if (p.millis() >= this.candyAppearanceRate + this.timer) {
        this.candies.push(
          new Candy(
            this.p,
            this.width,
            this.maxCandyVelocity,
            this.images.goodCandiesImages,
            this.images.badCandiesImages
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

  /**
   * Game's draw method.
   *
   * @param {p5} p p5 object reference.
   */
  draw(p) {
    const { backgroundImage, mainScreenImage } = this.images

    // Background always renders.
    p.image(backgroundImage, 0, 0, this.width, this.height)

    // While in main screen.
    if (this.gameState === GAME_STATE.MAIN_SCREEN) {
      p.push()

      p.image(
        mainScreenImage,
        (this.width - 1014 / 2) / 2,
        this.height / 4,
        1014 / 2,
        368 / 2
      )

      p.fill("#c9c9c9")
      p.textAlign(p.CENTER, p.CENTER)
      p.textStyle(p.BOLD)
      p.textSize(16)
      p.text('PRESS "SPACE" TO PLAY', this.width / 2, this.height / 2 + 60)
      p.pop()
    }

    // While playing.
    if (this.gameState === GAME_STATE.PLAYING) {
      this.candies.forEach((candy) => candy.draw(p))
      this.cup.draw(p)
    }

    // While paused.
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

    // While game over.
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

    // While not in Main Screen.
    if (this.gameState !== GAME_STATE.MAIN_SCREEN) {
      p.push()
      p.stroke("#fddafe")
      p.fill("#240345")
      p.strokeWeight(3)
      p.textSize(20)
      p.text(`Points: ${this.points}`, 10, 30)
      p.text(`Streak: ${this.streak}`, 10, 60)
      p.text(`Level: ${this.level}`, 10, 90)
      p.text(
        `Strikes: ${Array.from(Array(this.strikes))
          .map(() => "❌")
          .join(" ")}`,
        10,
        120
      )
      p.pop()
    }
  }

  /**
   * Updates the state of the game.
   */
  setGameState(gameState) {
    this.gameState = gameState
  }
}

export default Game
