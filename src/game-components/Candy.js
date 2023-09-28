class Candy {
  constructor(maxX, maxY) {
    this.pX = Math.random() * maxX
    this.pY = 0

    this.maxX = maxX
    this.maxY = maxY
  }

  update() {
    this.pY += 2

    if (this.pY > this.maxY) {
      this.pY = 0
      this.pX = Math.random() * this.maxX
    }
  }

  draw(p) {
    p.ellipse(this.pX, this.pY, 10, 10)
  }
}

export default Candy
