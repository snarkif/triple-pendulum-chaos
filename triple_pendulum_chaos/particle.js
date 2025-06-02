class Particle {
  constructor(x, y, vx, vy, ax, ay, r,rgb,collision,fade=false) {//collision==true boundaries added
    this.rgb=rgb;
    this.collision=collision;
    this.r = r;
    this.location = createVector(x, y);
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(ax, ay);
    this.fade=fade;
    this.alpha = 255; // <-- fade effect
  }
  
  applyforce(force){//f=ma m=1 so f=a,we will add f to the current acceleration vector
    this.acceleration.add(force);
  }

  update() {//updates location and velocity and resets acceleration
    if (this.fade) {
  this.alpha -= 7; // fade speed
  this.alpha = max(this.alpha, 0);
}

    this.checkboundaries();
    this.velocity.mult(1);//damping
    this.location.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);//after each frame a=0 and u have to apply all the forces again if u want to change the acceleration.for example every frame u have to do apllyforce(createvector(0,gravity)) etc... before hitting update()
  }

  display() {
    //fill(16, 46, 80);
    fill(this.rgb[0],this.rgb[1],this.rgb[2],this.alpha);
    
    ellipse(this.location.x, this.location.y, this.r, this.r);
  }
  displayfade(rgb , fade){
    fill(rgb[0],rgb[1],rgb[2],fade);
    ellipse(this.location.x, this.location.y, this.r, this.r);
  }

  checkboundaries() {
    if(this.collision){
    if (
      this.location.x + this.r / 2 >= width ||
      this.location.x - this.r / 2 <= 0
    ) {
      this.velocity.x = -this.velocity.x;
      this.location.x = constrain(this.location.x, this.r / 2, width - this.r / 2);
    }

    if (
      this.location.y + this.r / 2 >= height ||
      this.location.y - this.r / 2 <= 0
    ) {
      this.velocity.y = -this.velocity.y;
      this.location.y = constrain(this.location.y, this.r / 2, height - this.r / 2);
    }
  }
}
}
