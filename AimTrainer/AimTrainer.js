let Score, Steam, ms, tSize, TARGETS;
function setup() {
  createCanvas(800, 400);
  noFill();
  stroke(255);
  strokeWeight(2);
  Score = 0;
  
  Steam = [];          //Steam and millis are parrelel arrays where steam[n] refers to
  ms = [];             //the same object as ms[n]
  
  tSize = 30;     //Radius of the targets                                       
  TARGETS = [new Target(), new Target(), new Target()];
  TARGETS.forEach(i => ms.push(millis()));
}

function draw() {
  background(0);
  translate(width/2,height/2);
  TARGETS.forEach(i => i.DO());                          //Shows and moves the targets
  text(Score.toString(), -width/2 +50, -height/2+50);
  
  for(let i = 0; i < TARGETS.length; i++)
  {
    let OffScreen = (millis() - ms[i] > 2000);  //if more than 2 seconds have passed since 
    if(OffScreen)            //the target has been instanciated, it is assumed to be offscreen.
    {
      TARGETS[i] = new Target();
      ms[i] = millis();
    }
        
  }
  Steam.forEach(i => i.DO());  //For the small explosion effect
}

function mousePressed()
{
  let mapX = map(mouseX, 0,width, -width/2,width/2);
  let mapY = map(mouseY, 0,height, -height/2, height/2);
  
  for(let i = 0; i < TARGETS.length; i++)
  {
    if((dist(mapX,mapY, TARGETS[i].x,TARGETS[i].y) <= tSize))
    {
      makeSteam(i);
      TARGETS[i] = new Target();
      ms[i] = millis();
      Score++;
      break;
    }
  }
  
}
function makeSteam(k)
{
  if (Steam.length >= 600)
  {
    Steam.splice(0,100);   
    
  }
    for(let i = 0; i < 100; i++)
    {
      Steam.push(new steam(TARGETS[k].x, TARGETS[k].y));      
    }
}


class steam
{
  constructor(x,y)
  {
    this.Center = createVector(x,y);
    this.ParticleLocation = this.FindLocation();
    this.V = this.getV();
  }
  //Finds a random point within a squared circle
  //if that point is inside the circle return that point
  //if its not, recursivley generate a new one
  FindLocation()
  {
    let randPoint = createVector();
    randPoint.x = random(this.Center.x-tSize, this.Center.x+tSize);
    randPoint.y = random(this.Center.y-tSize, this.Center.y+tSize);
    if(dist(this.Center.x,this.Center.y, randPoint.x,randPoint.y) > tSize)
    {
      return this.FindLocation();      
    }
    else
    {
      return randPoint;      
    }
  }
  
  getV()
  {
    let t = createVector();
    t.x = random(-2,2);
    t.y = random(-1,-3);
    return t;
  }
  
  show()
  {
    point(this.ParticleLocation.x, this.ParticleLocation.y);
  }
  move()
  {
    this.ParticleLocation.x += this.V.x;
    this.ParticleLocation.y += this.V.y;
  }
  
  DO()
  {
    this.show();
    this.move();
  }
}

class Target
{
  constructor()
  {
    this.x = (-width/2);
    this.y = random((height/2)-tSize+1, (-height/2)+tSize+1);
    this.V = this.setVelocity();
    this.g = 0.02;
  }
  setVelocity()
  {
    let xV = random(6,9);
    let yV;
    if(this.y > 0)
    {
      yV = random(-1,-3);      
    }
    else if (dist((-width/2),0, this.x, this.y) < 100)
    {
      yV = random(-2,2);      
    }
    else
    {
       yV = random(-1,-3); 
    }
    if(yV < 0)
    {
      this.g = -4;
    }
    return createVector(xV,yV);
  }
  show()
  {
    ellipse(this.x,this.y, tSize,tSize);
  }
  move()
  {
    this.checkCollision();
    this.x += this.V.x;
    this.y += this.V.y;
    this.applyGravity();
    this.applyGravity();
  }
  applyGravity()
  {
    this.V.y += this.g;
  }
  checkCollision()
  {
    if(this.y < -height/2 + tSize || this.y > height/2 - tSize)
    {
      this.V.y *= -1;
      if(this.y < 0) this.applyGravity();
    }
  }
  DO()
  {
    this.show();
    this.move();
  }
}
