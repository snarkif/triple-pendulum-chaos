
let DIM=30,grid=[];//DIM=dimensions of the grid(adjustable)

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  noStroke();
  createCanvas(800, 1200);
  for(let i=0;i<DIM;i++){
    grid[i]=[];
    for(let k=0;k<DIM;k++){
      grid[i][k]=null;
    }
  }
  
}
///

function minEntropy() {
  let bestEntropy = null;
  let bestPos = null;

  for (let i = 0; i < DIM; i++) {
    for (let k = 0; k < DIM; k++) {
      if (grid[i][k] === null) {
        let entropy = CalculateEntropy(i, k);
        if (!entropy || entropy.length === 0) continue;

        if (bestEntropy === null || entropy.length < bestEntropy.length) {
          bestEntropy = entropy;
          bestPos = [i, k];
        }
      }
    }
  }

  if (bestPos === null) return false;
  return [bestEntropy, bestPos];
}


function Choose(){
  let arr=minEntropy();
  if(arr==false){
    return;
  }
  let entropy=arr[0];
  let cords=arr[1];
  let r = int(random(0, entropy.length));
  grid[cords[0]][cords[1]]=entropy[r];
  return true;
  
}

/////
function isInBounds(x, y, cols, rows) {
  return x >= 0 && x < cols && y >= 0 && y < rows;
}

function CalculateEntropy(x, y) {
  if (grid[x][y] != null) return false;

  let neighbors = [
    [x, y + 1],   // down
    [x + 1, y],   // right
    [x, y - 1],   // up
    [x - 1, y]    // left
  ];

  let squares = neighbors
    .filter(([nx, ny]) => isInBounds(nx, ny, DIM, DIM))
    .map(([nx, ny]) => grid[nx][ny]);

  let pos = [1, 2, 3, 4, 5];

  if (squares[0] === 2 || squares[0] === 4 || squares[0] === 5) {
    pos = pos.filter(v => v !== 5);//filters the number 5
  }
  if (squares[1] === 3 || squares[1] === 5 || squares[1] === 4) {
    pos = pos.filter(v => v !== 4);
  }
  if (squares[2] === 2 || squares[2] === 4 || squares[2] === 3) {
    pos = pos.filter(v => v !== 3);
  }
  if (squares[3] === 2 || squares[3] === 3 || squares[3] === 5) {
    pos = pos.filter(v => v !== 2);
  }

  return pos;
}


////////////////////////////////////////////////////////////////////

function draw1(x,y){
  fill(22,35,21);
  rect(x*(width/DIM),y*(height/DIM),width/DIM,height/DIM,3);
  
}

function draw2(x,y){
  fill(160, 200, 120);//choose your own colors.
  rect(x*(width/DIM)+(width/DIM)/3,y*(height/DIM),(width/DIM)/3,height/DIM);
  rect(x*(width/DIM)+(width/DIM)/3,y*(height/DIM)+(height/DIM)/3,2*(width/DIM)/3,(height/DIM)/3);
}

function draw3(x,y){
  fill(22,32,21);
  rect(x*(width/DIM),y*(height/DIM)+(height/DIM)/3,(width/DIM),(height/DIM)/3);
  rect(x*(width/DIM)+(width/DIM)/3,y*(height/DIM),(width/DIM)/3,2*(height/DIM)/3);
}

function draw4(x,y){
  fill(138, 204, 213);
  rect(x*(width/DIM)+(width/DIM)/3,y*(height/DIM),(width/DIM)/3,height/DIM);
  rect(x*(width/DIM),y*(height/DIM)+(height/DIM)/3,2*(width/DIM)/3,(height/DIM)/3);
}

function draw5(x,y){
  fill(142, 22, 22);
  rect(x*(width/DIM),y*(height/DIM)+(height/DIM)/3,(width/DIM),(height/DIM)/3);
  rect(x*(width/DIM)+(width/DIM)/3,y*(height/DIM)+(height/DIM)/3,(width/DIM)/3,2*(height/DIM)/3);
}

//////////////////////////////////////////////////////////////////

function drawGrid(){
  for(let i=0;i<DIM;i++){
    for(let k=0;k<DIM;k++){
      if(grid[i][k]==1){
        draw1(i,k);
      }
      if(grid[i][k]==2){
        draw2(i,k);
      }
      if(grid[i][k]==3){
        draw3(i,k);
      }
      if(grid[i][k]==4){
        draw4(i,k);
      }
      if(grid[i][k]==5){
        draw5(i,k);
      }
    }
  }
}

function draw() {
  background(220);
  let j=Choose();
  drawGrid();
}