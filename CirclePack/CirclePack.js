let AllCircles, RightBound, UpBound, Growing, IT, SCALE, minCircleRadius, DONE, timeGrowing;
function setup() {
  createCanvas(400, 400);
  noFill();
  stroke(255, 255,0);
  AllCircles = [];
  RightBound = width/4;
  UpBound = height/4;
  Growing = false;
  AddCircles();
  IT = 0;
  DONE = false;
  
  //Scale is the amount of circles spawned each cycle
  SCALE = 5;
  minCircleRadius = 5;
}

function draw() {
  background(0);
  translate(width/2,height/2);
  
  if(checkIfDone()) Growing = false;
  if(Growing){
    
    for(let i = AllCircles.length - (IT * SCALE); i < AllCircles.length; i++){
      if(!checkCollision(AllCircles[i])) AllCircles[i].Radius++;
      else{
        let p1 = getRandomPoint();
        if( AllCircles[i].Radius < minCircleRadius){
          AllCircles[i] = new Circle(p1.x, p1.y, minCircleRadius/2);
          if(millis() - timeGrowing > 1000 * 10) {
            AllCircles.splice(AllCircles.length - (IT * SCALE), AllCircles.length - (IT * SCALE))
            DONE = true;
            Growing = false;
            break;
          }
        } 
      }
    }
  }else if(DONE){
    if(millis()%1000 < 20) {
      print('DONE');
      print(AllCircles.length);
    }
  } else {
    AddCircles();
  }
  
  for(let i = 0;i<AllCircles.length;i++){
    AllCircles[i].show();
  }
}

function checkIfDone(){
  let tempBoolA = [];
  for(let i =AllCircles.length - (IT * SCALE); i < AllCircles.length;i++){
    
    tempBoolA.push(checkCollision(AllCircles[i]));
  }
  return tempBoolA.every(a => a === true);
}

function checkCollision(c){
  let V1 = createVector(c.getXPos(),c.getYPos());
  for(let i =0; i < AllCircles.length; i++){
    let V2 = createVector(AllCircles[i].getXPos(), AllCircles[i].getYPos());
    let DISTANCE = dist(V1.x,V1.y,V2.x,V2.y);
    if(collideCircleCircle(V1.x,V1.y,c.Radius, V2.x,V2.y, AllCircles[i].Radius) && DISTANCE > 0) return true;
  }
  return false;
}

function AddCircles(){
  let tempArray = pickSixPoints();
  for(let i = 0; i < tempArray.length; i++){
    AllCircles.push(new Circle(tempArray[i].x,tempArray[i].y,1));
  }
  IT++;
  Growing = true;
  timeGrowing = millis();
}

function pickSixPoints(){
  let tempArray = [];
  let startTime = millis();
  
  for (let i = 0; i < SCALE; i++){
    let randPoint = getRandomPoint();
    tempArray.push(randPoint);
  }
  return tempArray;
}


//Picks a random point
//if that point is colliding with a circle
//recursivley generate a new one
function getRandomPoint(){
  let randomPoint = createVector();
  randomPoint.x = random(-RightBound, RightBound);
  randomPoint.y = random(-UpBound, UpBound);
  if(checkCollision(new Circle(randomPoint.x, randomPoint.y, 1))) return getRandomPoint();
  return randomPoint;
}


//Thanks https://github.com/bmoren/p5.collide2D
function collidePointCircle(x, y, cx, cy, d) {
  if(this.dist(x,y,cx,cy) <= d/2 ){
    return true;
  }
  return false;
}
function collideCircleCircle(x, y,d, x2, y2, d2) {
  if(this.dist(x,y,x2,y2) <= (d/2)+(d2/2) ){
    return true;
  }
  return false;
}

class Circle{
  constructor(x,y,r){
    this.Pos = createVector(x,y);
    this.Radius = r;
  }
  show(){
    ellipse(this.Pos.x, this.Pos.y, this.Radius, this.Radius);
  }
  getXPos(){
    return this.Pos.x;
  }
  getYPos(){
    return this.Pos.y;
  }
}
