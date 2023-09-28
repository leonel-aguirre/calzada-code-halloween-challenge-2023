import Candy from "./Candy"
import Cup from "./cup"

class Game {
  constructor(width, height) {
    this.width = width
    this.height = height

    this.points = 0
    this.level = 0
    // this.maxCandies = 0
    this.candySpeed = 0
    this.candies = []

    this.cup = new Cup(this.width, this.height)
  }

  nextLevel() {
    this.level += 1
    // this.maxCandies += 1
    this.candySpeed += 2

    // for (let i = 0; i < this.maxCandies; i++) {
    this.candies.push(new Candy(this.width, this.height))
    // }
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
    this.candies.forEach((candy) => candy.update())

    this.candies.forEach((candy) => {
      if (
        candy.pX > this.cup.pX &&
        candy.pX < this.cup.pX + this.cup.size &&
        candy.pY > this.cup.pY
      ) {
        candy.pX = Math.random() * this.height
        candy.pY = 0

        this.points += 1
      }
    })

    this.keyEvents(p)
  }

  draw(p) {
    this.candies.forEach((candy) => candy.draw(p))
    this.cup.draw(p)
  }
}

export default Game
