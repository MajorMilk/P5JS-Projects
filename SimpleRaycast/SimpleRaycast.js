let mousePoint, line1, rayOne, lineLeft, lineUp, lineRight, lineDown, lineArray;
function setup() {
  createCanvas(800, 800);
  line1 = new Line(-100,-100,100,100);
  lineLeft = new Line(-200,-200, -200, 200);
  lineUp = new Line(-200,200,200,200);
  lineRight = new Line(200,200,200,-200);
  lineDown = new Line(200,-200,-200,-200);
  lineArray = [];
  lineArray.push(lineLeft);
  lineArray.push(lineUp);
  lineArray.push(lineRight);
  //lineArray.push(lineDown);
  lineArray.push(line1);
}

function draw() {
  background(0);
  translate(width/2, height/2);
  
  //Mapping mouseX and Y to the translated canvas 
  let mouseVMAP = map(mouseX, 0, 800, -400, 400);
  let mouseHMAP = map(mouseY, 0 ,800, -400, 400)
  mousePoint = createVector(mouseVMAP, mouseHMAP);
  
  for (let i = 0; i < lineArray.length; i++){
    lineArray[i].show(); 
    
  }
  angleMode(DEGREES);
  stroke(255);
  strokeWeight(2);
  rayOne = new Ray(mouseVMAP, mouseHMAP, 0)
  rayOne.Cast(lineArray);
  //print(rayOne.collection.length.toString());
  rayOne.collection = [];
}

class Ray{
  constructor(StartX, StartY,a){
    
    //starting point for vector calculations
    this.StartX = StartX;
    this.StartY = StartY;

    //velocity scaling
    this.Scale = 1000;
    //angle for generating vectors
    this.angle = a;
    
    
    this.xVel = this.getXV();
    this.yVel = this.getYV();
    this.FinalPoint = createVector(this.StartX, this.StartY);
    
    //for casting all rays at once
    this.collection = [];
  }
  shootRay(){
    this.FinalPoint = createVector(this.StartX + this.getXV(), this.StartY + this.getYV());
  }
  getVec(){
    angleMode(DEGREES);
    return createVector(sin(this.angle) * this.Scale,this.Scale * cos(this.angle));
  }
  getXV(){
    return  (this.getVec().x);
    
  }
  getYV(){
    return (this.getVec().y);
  }
  
  //fill collection with rays of different angles
  //Loop through all of those rays
  //once collided with something, set the final point of that ray to wherever it is
  //reset the collection of rays so it doesnt get out of hand
  Cast(wall){
    angleMode(DEGREES);
    for(let i = 0; i < 360; i+=0.25){
      this.collection.push(new Ray(this.StartX, this.StartY, i));
      this.collection[i*4].shootRay();
      this.collection[i*4].Collision(wall);
      strokeWeight(1);
      line(this.StartX,this.StartY, this.collection[i*4].FinalPoint.x,this.collection[i*4].FinalPoint.y);
    }
  }
  Collision(wall){
    let P3 = createVector(this.StartX,this.StartY);
    let P4 = createVector(this.FinalPoint.x, this.FinalPoint.y);
    let tempFinalPoints = [];
    let closestPoint = P4;
    let tempPoint = P4;
    for(let i = 0; i < wall.length; i++){
      let P1 = createVector(wall[i].x1,wall[i].y1);
      let P2 = createVector(wall[i].x2, wall[i].y2);
      if(this.lineLineIntersection(P1,P2,P3,P4).x == Number.MAX_VALUE){
        continue;
      }else{
        this.FinalPoint = this.lineLineIntersection(P1,P2,P3,P4);
        tempFinalPoints.push(this.FinalPoint);
      }
      
    }
    
    //this loop ensures the closest collision is always the final point
    for(let i = 0;i < tempFinalPoints.length; i++){
      tempPoint = tempFinalPoints[i];
      if(dist(P3.x,P3.y,tempPoint.x,tempPoint.y) < dist(P3.x,P3.y,closestPoint.x,closestPoint.y)){
        closestPoint = tempPoint;
      }
    }
    this.FinalPoint = closestPoint;
    
  }
  //https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
  lineLineIntersection(A,B,C,D){
    let x1 = A.x;
    let y1 = A.y;
    let x2 = B.x;
    let y2 = B.y;

    let x3 = C.x;
    let y3 = C.y;
    let x4 = D.x;
    let y4 = D.y;

    let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (den == 0) {
      //print("den 0");
      return createVector(Number.MAX_VALUE,Number.MAX_VALUE);
      
    }

    let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
    let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;
    if (t > 0 && t < 1 && u > 0) {
      let pt = createVector();
      pt.x = x1 + t * (x2 - x1);
      pt.y = y1 + t * (y2 - y1);
      //print("Returning Vect");
      return pt;
    } else {
      //print("den 0");
      return createVector(Number.MAX_VALUE,Number.MAX_VALUE);
    }
  }
  
}
class Line{
  constructor(x1,y1,x2,y2){
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  show(){
    stroke(255);
    strokeWeight(3);
    line(this.x1,this.y1,this.x2,this.y2);
  }
}
