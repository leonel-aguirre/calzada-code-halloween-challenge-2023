class Candy {
  constructor(p, maxX, maxY) {
    this.p = p

    this.position = p.createVector(Math.random() * maxX, 0)

    this.maxX = maxX
    this.maxY = maxY

    this.velocity = p.createVector(0, 2)
    this.acceleration = p.createVector(0, 2)
    this.velocityLimit = 2
  }

  update() {
    this.velocity.add(this.acceleration)

    this.velocity.limit(this.velocityLimit)

    this.position.add(this.velocity)

    if (this.position.y > this.maxY) {
      this.position.y = 0
      this.position.x = Math.random() * this.maxX
    }
  }

  draw(p) {
    p.ellipse(this.position.x, this.position.y, 10, 10)
  }

  setVelocityLimit(velocityLimit) {
    this.velocityLimit = velocityLimit
  }
}

export default Candy
