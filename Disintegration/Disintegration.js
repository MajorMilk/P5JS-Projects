let startingSquare, squareArray, g;
function setup() {
  createCanvas(800,800);
  startingSquare = new Square(200,200, 15,-2, 500);
  squareArray = [];
  squareArray.push(startingSquare);
  g = 0.000;
}


function draw() {
  background(0);
  
  //Loop through every value of of the square arrary
  //show, then move that square
  //then checking for a collision with Square.split
  //then set that to false
  //set the velocities of the new square random
  //add that new square to the array for future use
  for(let i = 0; i < squareArray.length; i ++){
    squareArray[i].show();
    squareArray[i].move();
    if(squareArray[i].sideLength > 2 && squareArray[i].split && millis() % 2 === 0){
      squareArray[i].split = false;
      let sl = squareArray[i].sideLength /= 2;
      let rXV = map(random(0,1), 0,1, 3,7);
      let rYV = map(random(0,1), 0,1, 0,5);
      squareArray[i].sideLength = sl;
      squareArray.push(new Square(squareArray[i].x, squareArray[i].y, rXV, rYV, sl));
      
       
    }
  }
  
}

class Square{
  constructor(x,y ,hV,vV, sideLength){
    this.x = x;
    this.y = y;
    this.xV = hV;
    this.yV = vV;
    this.sideLength = sideLength;
    this.split = false;
  }
  
  show(){
    noFill();
    stroke(0,255,0);
    strokeWeight(3);
    rect(this.x, this.y, this.sideLength, this.sideLength);
  }
  
  move(){
    this.wallCollision();
    this.applyGravity();
    this.x += this.xV;
    this.y += this.yV;
  }
  
  wallCollision(){
    let xC1 = this.x > width- (this.sideLength);
    let xC2 = (this.x < 0)
    let yC1 = this.y > height-(this.sideLength);
    let yC2 = (this.y < 0)
    if(xC1 || xC2){
      this.xV *= -0.7;
      this.split = true;
      if(xC1){
        this.x = width- (this.sideLength)
      }else{
        this.x = 1;
      }
    } else if (yC1 || yC2) {
      this.yV *= -0.7;
      this.split =true;
      if(yC1){
        this.y = height- (this.sideLength)
      }else{
        this.y = 1;
      }
    }
  }
  applyGravity(){
    this.yV += g;
  }
}
