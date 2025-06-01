
let s;
 
function setup() {
  createCanvas(400, 400);
  s=new Snake(40,10);
}

function draw() {
  fill(0);
 
  background(220);
  //s.render();
  s.update();
  s.draw();
}