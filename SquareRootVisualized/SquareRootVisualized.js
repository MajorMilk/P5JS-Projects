let RectX, RectY, SCALE, dx, FRAMECOUNT, PREDICTEDVALUE;
function setup() {
  createCanvas(400,400);
  rectMode(RADIUS);
  
  //This is the value you're taking the square root of
  INPUT = 2;
  
  //RectX and Y should be equal to Facotrs of your square root
  RectX = INPUT;
  RectY = 1;
  
  //Smaller means more accurate
  dx = 0.001;
  
  //Make smaller for Larger values of input
  SCALE = 30;
  
  //For slowing down the animation
  FRAMECOUNT = 0;
}

function draw() {
  background(255);
  
  //For the rectangle
  stroke(50);
  noFill();
  
  if(RectX > RectY && FRAMECOUNT === 5)
  {
    RectX -= dx;                                    //Takes a sliver off of the rectangle.
    RectY = (INPUT / RectX);                        //Add that area to the Y axis
    FRAMECOUNT = 0;
  }
  FRAMECOUNT++;
  
  
  SCALEDX = RectX * SCALE;
  SCALEDY = RectY * SCALE;
  rect(200,200, SCALEDX, SCALEDY);
  
  textSize(16);
  fill(0);
  text("X = " + RectX.toString(), 0, 370);
  text("Y = " + RectY.toString(), 0, 50);
  
  //If done
  if(RectX < RectY)
  {
    PREDICTEDVALUE = (RectX + RectY)/2;
    text("Square root = " + PREDICTEDVALUE.toString(), 75, 290);
  }
}
