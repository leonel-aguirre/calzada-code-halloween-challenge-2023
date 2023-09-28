class Cup {
  constructor(screenWidth, screenHeight) {
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight

    this.size = 100

    this.pX = screenWidth / 2 - this.size / 2
    this.pY = screenHeight - 40
  }

  /**
   * Draws the object into the canvas.
   *
   * @param {p5} p A reference to the p5 object.
   */
  draw(p) {
    p.push()
    p.rect(this.pX, this.pY, this.size, 20)
    p.pop()
  }

  moveRight() {
    let newPX = this.pX + 10

    if (newPX >= this.screenWidth - this.size) {
      this.pX = this.screenWidth - this.size
    } else {
      this.pX = newPX
    }
  }

  moveLeft() {
    let newPX = this.pX - 10

    if (newPX <= 0) {
      this.pX = 0
    } else {
      this.pX = newPX
    }
  }
}

export default Cup
