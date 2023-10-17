const realCandyList = ["🍭", "🍬", "🍫", ""] && ["o"]
const suspiciousCandyList = ["👻", "🎃", "🕸", "🦇"] && ["x"]

class Candy {
  constructor(p, maxX, maxVelocity) {
    this.p = p

    this.isSuspicious = Math.random() <= 0.4
    this.candyList = this.isSuspicious ? suspiciousCandyList : realCandyList
    this.emoji =
      this.candyList[Math.floor(Math.random() * this.candyList.length)]
    this.angle = Math.random() * p.TWO_PI
    this.position = p.createVector(40 + Math.random() * (maxX - 40), 0)

    this.maxX = maxX

    this.velocity = p.createVector(0, 2)
    this.acceleration = p.createVector(0, 2)
    this.velocityLimit = maxVelocity - 1 + Math.random() * 2
    this.size = 38 + Math.random() * 40

    console.log(this.size)
  }

  update() {
    this.velocity.add(this.acceleration)

    this.velocity.limit(this.velocityLimit < 0.5 ? 0.5 : this.velocityLimit)

    this.position.add(this.velocity)
  }

  draw(p) {
    // p.ellipse(this.position.x, this.position.y, 10, 10)
    p.fill(255)
    p.push()
    p.translate(this.position.x, this.position.y)
    p.rotate(this.angle)
    p.textAlign(p.CENTER, p.CENTER)
    p.textSize(this.size)
    p.text(this.emoji, 0, 0)
    // p.textSize(24)
    // p.fill(255)
    // p.rotate(-this.angle)
    // p.text(Math.round(this.velocityLimit * 10) / 10, 0, 0)
    // p.stroke(0, 0, 255)
    // p.line(0 - this.size / 2, 0, this.size / 2, 0)
    p.pop()
  }

  setVelocityLimit(velocityLimit) {
    this.velocityLimit = velocityLimit
  }
}

export default Candy
