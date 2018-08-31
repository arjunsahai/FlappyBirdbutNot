function Bird() {
  this.y = 325;
  this.x = 50;

  this.show = function() {
    fill(255);
    ellipse(this.x, this.y, 40, 40);
  }
}
