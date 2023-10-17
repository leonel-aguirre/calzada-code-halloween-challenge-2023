class Cup {
  constructor(p, screenWidth, screenHeight, image) {
    this.p = p

    this.screenWidth = screenWidth
    this.screenHeight = screenHeight

    this.size = 100

    this.position = p.createVector(
      screenWidth / 2 - this.size / 2,
      screenHeight - 40
    )

    this.image = image
  }

  /**
   * Draws the object into the canvas.
   *
   * @param {p5} p A reference to the p5 object.
   */
  draw(p) {
    p.push()
    p.image(this.image, this.position.x, this.position.y, this.size, this.size)
    p.pop()
  }

  moveRight() {
    let newPX = this.position.x + 10

    if (newPX >= this.screenWidth - this.size) {
      this.position.x = this.screenWidth - this.size
    } else {
      this.position.x = newPX
    }
  }

  moveLeft() {
    let newPX = this.position.x - 10

    if (newPX <= 0) {
      this.position.x = 0
    } else {
      this.position.x = newPX
    }
  }
}

export default Cup
