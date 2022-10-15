let circle1, circle2, guideCircle, rotaionRate, guideRotationRate, offset,  g;
function setup() {
  createCanvas(400,400);
  g = 1.5;
  circle1 = new Circle(0,0, 160, 0,0, new Point(-100,0, 0));
  circle2 = new Circle(0,0, 350, 0,0, new Point(0,0, 0));
  guideCircle = new Circle(0,0, (circle2.radius-circle1.radius)*2 , 0,0, new Point(200,0,0));
  rotaionRate = (circle2.radius*2)/(circle1.radius*2);
  rotaionRate *= -0.05;
  offset = 1.6;
  guideRotaionRate = rotaionRate * -1.44;
}


function draw() {
  //Set background to 255 to see it function
  background(0);
  translate(width/2, height/2);
  circle1.show(false);
  guideCircle.show(false);
  circle1.updateAngle(rotaionRate);
  guideCircle.updateAngle(guideRotaionRate);
  circle1.moveCircle(guideCircle);
  circle2.show(true);
}

class Circle{
  constructor(x, y, d, xV, yV, p){
    this.xPos = x;
    this.yPos = y;
    this.radius = d/2;
    this.hV = xV;
    this.vV = yV;
    this.point = p;
    this.history = [];
  }
  show(c){
   noFill();
   stroke(0);
   strokeWeight(1);
   ellipse(this.xPos,this.yPos, this.radius*2, this.radius *2);
   strokeWeight(5);
   this.point.show(c);
   if(!c){
     this.point.findPoint(this.radius);
     point(this.point.xPos, this.point.yPos);
   }
    else{
      this.point.show();
    }
  }
  updateAngle( a){
    this.point.A +=  a;
  }
  moveCircle(circlex){
    this.xPos = circlex.point.xPos;
    this.yPos = circlex.point.yPos;
    let tempVec = circlex.point.findPoint(this.radius - offset);
    this.point.xPos += this.xPos ;
    this.point.yPos += this.yPos ;
    this.history.push(createVector(this.point.xPos,this.point.yPos));
    this.drawLines();
    
  }
  
  drawLines(){
    if(this.history.length > 4)
      {
       for(let i = 0; i <this.history.length-3; i+=2)
       {
          let pos1 = this.history[i];
          let pos2 = this.history[i+1];
          let pos3 = this.history[i+2];
          stroke(0,138,216);
         strokeWeight(2);
          line(pos1.x, pos1.y,pos2.x,pos2.y); 
          line(pos2.x,pos2.y, pos3.x,pos3.y);
         
          //Removes Trail after a set amount of time
          if(this.history.length > 5000)
          {
             this.history.splice(0,1);
          }
          
        }
      }
  }
}

class Point{
 constructor(x, y, Angle){
   this.xPos = x;
   this.yPos = y;
   this.A = Angle;
 }
  show(){
    stroke(0);
    strokeWeight(7);
    point(this.xPos, this.yPos);
  }
  getVec(){
    return createVector(this.xPos, this.yPos);
  }
  setVec(v){
    this.xPos = v.x;
    this.yPos = v.y;
  }
  findPoint(r){
    this.setVec(createVector((r * sin(this.A)), (r * cos(this.A))));
    return this.getVec();
  }
  
}
