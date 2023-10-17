// Cup's constant parameters.
const CUP_SIZE = 100
const CUP_BOTTOM_OFFSET = 40

/**
 * Cup class.
 */
class Cup {
  /**
   * Creates a Cup instance.
   *
   * @param {p5} p p5 object reference.
   * @param {number} screenWidth the screen's width.
   * @param {number} screenHeight the screen's height.
   * @param {object} image cup image.
   */
  constructor(p, screenWidth, screenHeight, image) {
    this.p = p
    this.screenWidth = screenWidth
    this.screenHeight = screenHeight
    this.image = image

    // Cup's size.
    this.size = CUP_SIZE

    // Cup position vector. Initially set to the center of the screen's bottom.
    this.position = p.createVector(
      screenWidth / 2 - this.size / 2,
      screenHeight - CUP_BOTTOM_OFFSET
    )
  }

  /**
   * Cup's draw method.
   *
   * @param {p5} p p5 object reference.
   */
  draw(p) {
    p.push()
    p.image(this.image, this.position.x, this.position.y, this.size, this.size)
    p.pop()
  }

  /**
   * Moves cup to the right.
   */
  moveRight() {
    let newPX = this.position.x + 10

    // Limits to the right edge.
    if (newPX >= this.screenWidth - this.size) {
      this.position.x = this.screenWidth - this.size
    } else {
      this.position.x = newPX
    }
  }

  /**
   * Moves cup to the left.
   */
  moveLeft() {
    let newPX = this.position.x - 10

    // Limits to the left edge.
    if (newPX <= 0) {
      this.position.x = 0
    } else {
      this.position.x = newPX
    }
  }
}

export default Cup
