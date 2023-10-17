// Candy constant parameters.
const CANDY_IS_BAD_PROBABILITY = 0.4
const CANDY_BASE_SIZE = 38
const CANDY_MAX_SIZE = 40 // Plus base size.
const CANDY_EDGE_OFFSET = 40
const CANDY_BASE_VELOCITY_Y = 2
const CANDY_BASE_ACCELERATION_Y = 2
const CANDY_BASE_VELOCITY_LIMIT = 1
const CANDY_MAX_VELOCITY_LIMIT = 2 // Plus base velocity limit.

/**
 * Candy class.
 */
class Candy {
  /**
   * Creates a Candy instance.
   *
   * @param {p5} p p5 object reference.
   * @param {number} maxX maximum x value.
   * @param {number} maxVelocity maximum velocity value.
   * @param {Array} goodCandiesImages good candies images array.
   * @param {Array} badCandiesImages bad candies images array.
   */
  constructor(p, maxX, maxVelocity, goodCandiesImages, badCandiesImages) {
    this.p = p

    // Tracks if candy is bad or not.
    this.isBad = Math.random() <= CANDY_IS_BAD_PROBABILITY

    // Determines which candy images array to use.
    this.candyImages = this.isBad ? badCandiesImages : goodCandiesImages

    // Selects a random image from the current image array.
    this.image =
      this.candyImages[Math.floor(Math.random() * this.candyImages.length)]

    // Rotates candy randomly.
    this.angle = Math.random() * p.TWO_PI

    // Random size.
    this.size = CANDY_BASE_SIZE + Math.random() * CANDY_MAX_SIZE

    // Randomly locates the candy skipping the edge offset.
    this.position = p.createVector(
      CANDY_EDGE_OFFSET + Math.random() * (maxX - CANDY_EDGE_OFFSET),
      0
    )

    // Base velocity and acceleration vectors.
    this.velocity = p.createVector(0, CANDY_BASE_VELOCITY_Y)
    this.acceleration = p.createVector(0, CANDY_BASE_ACCELERATION_Y)

    // Velocity limit based on parameters.
    this.velocityLimit =
      maxVelocity -
      CANDY_BASE_VELOCITY_LIMIT +
      Math.random() * CANDY_MAX_VELOCITY_LIMIT
  }

  /**
   * Candy's update method.
   */
  update() {
    // Vectors constantly updates.
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.velocityLimit < 0.5 ? 0.5 : this.velocityLimit)
    this.position.add(this.velocity)
  }

  /**
   * Candy's draw method.
   *
   * @param {p5} p p5 object reference.
   */
  draw(p) {
    p.push()
    p.translate(this.position.x, this.position.y)
    p.rotate(this.angle)
    p.image(
      this.image,
      0 - this.size / 2,
      0 - this.size / 2,
      this.size,
      this.size
    )
    p.pop()
  }

  /**
   * Updates the velocity limit of the candy.
   */
  setVelocityLimit(velocityLimit) {
    this.velocityLimit = velocityLimit
  }
}

export default Candy
