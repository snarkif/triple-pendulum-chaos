class Pendulum {
  constructor(p1, p2) {
    this.r = dist(p1.location.x, p1.location.y, p2.location.x, p2.location.y);
    this.p1 = p1;
    this.p2 = p2;
    this.angle = p1.location.copy().sub(p2.location).heading();
    this.angle=this.angle-PI/2;
    this.angularVelocity=0;
    
  }
  
  applyforces() {
  let g = -0.1;
  let angularAcceleration = (-g * sin(this.angle)) / this.r;
  this.angularVelocity += angularAcceleration;
  this.angle += this.angularVelocity;

  // CORRECTED vector based on downward gravity
  let v = createVector(this.r * sin(this.angle), this.r * -cos(this.angle));
  this.p2.location = this.p1.location.copy().add(v);

  // optional damping
  //this.angularVelocity *= 0.99;
}

  update() {
    this.applyforces();
    
    
  }
  
  render() {
    this.update();
    this.p1.display();
    this.p2.display();
  
    line(this.p1.location.x, this.p1.location.y, this.p2.location.x, this.p2.location.y);
  }
}
