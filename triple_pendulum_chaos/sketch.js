
let p1,p2,p3,pend1,pend2;

function setup() {
  createCanvas(800, 800);
  background(220);
  p1=new Particle(400,0,0,0,0,0,0,[0,0,0],true);
  p2 = new Particle(110,170, 0, 0, 0, 0, 10, [0, 0, 0], true);
  p3 = new Particle(150,30, 0, 0, 0, 0, 10, [0, 0, 0], true);
  p4 = new Particle(22,30, 0, 0, 0, 0, 10, [ 200, 10 , 233 ], true);

  boolSlider = createSlider(0, 1, 1, 1); // min, max, default, step
  boolSlider.position(10, 10);
  
  pend1 = new Pendulum(p1,p2);
  pend2 = new Pendulum(p2,p3);
  pend3 = new Pendulum(p3,p4);
  
}

function draw() {
  if(boolSlider.value()==1){
    p2.r=10;
    p3.r=10;
    background(220);
  }
  else{
    p1.r=0;
    p2.r=0;
    p3.r=0;
  }
  
  pend1.render();
  pend2.render();
  pend3.render();
  
  
  
}