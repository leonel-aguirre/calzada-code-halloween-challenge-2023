const realCandyList = ["🍭", "🍬", "🍫"]
const suspiciousCandyList = ["👻", "🎃", "🕸", "🦇"]

class Candy {
  constructor(p, maxX, velocityLimit) {
    this.p = p

    this.isSuspicious = Math.random() <= 0.4
    this.candyList = this.isSuspicious ? suspiciousCandyList : realCandyList
    this.emoji =
      this.candyList[Math.floor(Math.random() * this.candyList.length)]
    this.angle = Math.random() * p.TWO_PI
    this.position = p.createVector(Math.random() * maxX, 0)

    this.maxX = maxX

    this.velocity = p.createVector(0, 2)
    this.acceleration = p.createVector(0, 2)
    this.velocityLimit = velocityLimit
  }

  update() {
    this.velocity.add(this.acceleration)

    this.velocity.limit(this.velocityLimit)

    this.position.add(this.velocity)
  }

  draw(p) {
    // p.ellipse(this.position.x, this.position.y, 10, 10)
    p.push()
    p.translate(this.position.x, this.position.y)
    p.rotate(this.angle)
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(48)
    p.text(this.emoji, 0, 0)
    p.pop()
  }

  setVelocityLimit(velocityLimit) {
    this.velocityLimit = velocityLimit
  }
}

export default Candy
