class Snake{
//right now spine is just a number between 3 to 6
  constructor(spine,r){
    //spine is supposed to be an array containing all the radiuses ,initial x and y values like so: [r,x,y]
    this.spine=spine;
    this.r=r;
    this.bones=[];
    for(let i=0;i<spine;i++){
      let p=new Particle(50+r*i,200,0,0,0,0,r,[30,30,30],false);
      this.bones.push(p);
    }
    
  }
  
  scaler(num,v){
    v=v.normalize();//changes the magnitude of a given vector
    v=v.mult(num);
    return v;
  }
  
  getvel(){
    let p=this.bones[0].location;
    let p2=createVector(mouseX,mouseY);
    let v=p2.copy().sub(p);//always steer towards the mouse 
    v=this.scaler(2,v);//i set the size of the velocity to 20
    return v;
  }
  
  update() {
  let velocity = this.getvel();
  this.bones[0].velocity = velocity;
  this.bones[0].update();

  // Now reposition the rest of the bones to follow
  for (let i = 1; i < this.bones.length; i++) {
    let prev = this.bones[i - 1].location.copy();
    let curr = this.bones[i].location.copy();

    let v = curr.sub(prev).normalize().mult(this.r );
    this.bones[i].location = prev.add(v);
  }
}
  
  drawshape(x1,y1,x2,y2,x3,y3,x4,y4){
     fill(150);
  stroke(0);
  
  beginShape();
  vertex(x1, y1);
  vertex(x2, y2);
  vertex(x3, y3);
  vertex(x4, y4);
  endShape(CLOSE);
  }

  draw(){
    let heading1 =this.bones[0].velocity.heading(),heading2=heading1;
    let v1,v2,p1,p2,pa1,pa2;
    for(let i=1;i<this.bones.length;i++){
      v1=createVector(this.r*cos(heading1 - PI/2),this.r*sin(heading1-PI/2));
      p1=this.bones[i-1].location.copy().add(v1);
      heading2=this.bones[i-1].location.copy().sub(this.bones[i]).heading();
      v2=createVector(this.r*cos(heading1 - PI/2),this.r*sin(heading1-PI/2));
      p2=this.bones[i].location.copy().add(v2);
      line(p1.x,p1.y,p2.x,p2.y);
      pa1=this.bones[i-1].location.copy().sub(v1);
      pa2=this.bones[i].location.copy().sub(v2);
      line(pa1.x,pa1.y,pa2.x,pa2.y);
      this.drawshape(p1.x,p1.y,p2.x,p2.y,pa1.x,pa1.y,pa2.x,pa2.y);
      //push();
      //otate(heading2);
      //fill(0);
      //rect(p2.x,p2.y,this.r,this.r);

      
    }
    
  }
//   draw() {
//   let v1, v2, p1, p2, pa1, pa2;
//   for (let i = 1; i < this.bones.length; i++) {
//     // Get heading of current segment
//     let heading = this.bones[i].location.copy().sub(this.bones[i - 1].location).heading();

//     // Get perpendicular vector to heading
//     let offset = createVector(this.r * cos(heading - HALF_PI), this.r * sin(heading - HALF_PI));

//     // Offset both sides of the bone
//     p1 = this.bones[i - 1].location.copy().add(offset);
//     p2 = this.bones[i].location.copy().add(offset);
//     pa1 = this.bones[i - 1].location.copy().sub(offset);
//     pa2 = this.bones[i].location.copy().sub(offset);

//     // Draw quad and lines
//     this.drawshape(p1.x, p1.y, p2.x, p2.y, pa2.x, pa2.y, pa1.x, pa1.y);
//     line(p1.x, p1.y, p2.x, p2.y);
//     line(pa1.x, pa1.y, pa2.x, pa2.y);
//   }
// }

  
  
  render(){
    this.update();
    for(let i=0;i<this.spine;i++){
      this.bones[i].display();
    }
  }
  
}