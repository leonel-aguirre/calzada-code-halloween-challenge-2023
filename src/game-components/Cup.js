class Cup {
  constructor(screenWidth) {
    this.screenWidth = screenWidth
    this.positionX = 0
    this.positionY = 0
    this.size = 100
  }

  /**
   * Draws the object into the canvas.
   *
   * @param {p5} p A reference to the p5 object.
   */
  draw(p) {
    p.push()
    p.rect(this.positionX, this.positionY, this.size, 20)
    p.pop()
  }

  initializePosition(positionX, positionY) {
    this.positionX = positionX - this.size / 2
    this.positionY = positionY
  }

  moveRight() {
    let newPositionX = this.positionX + 10

    if (newPositionX >= this.screenWidth - this.size) {
      this.positionX = this.screenWidth - this.size
    } else {
      this.positionX = newPositionX
    }
  }

  moveLeft() {
    let newPositionX = this.positionX - 10

    if (newPositionX <= 0) {
      this.positionX = 0
    } else {
      this.positionX = newPositionX
    }
  }
}

export default Cup
