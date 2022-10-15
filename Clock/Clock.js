let Sec, Minute, Hour, Day, Month, Year, Millis, FRAMECOUNT;
let DayA, MonthA, YearA, MilliToSecA, DAYSINMONTH, MONTHLENGTHA, HourA;
let HourHandA, MinuteHandA, SecondHandA;
function setup() {
  createCanvas(400,400);
  FRAMECOUNT = 0;
  MONTHLENGTHA = [31,29,31,30,31,30,31,31,30,31,30,31];
  
  Sec = second();
}
//At 0 then top of circle
//200,350
//At 90 then right
//350,250



function draw() {
  background(0);
  if(FRAMECOUNT % 2 === 0) {
    SecondHandA = map(Sec, 0 , 60, 0, TWO_PI);
    if(FRAMECOUNT % 10 === 0) {
      Sec = second();
      Minute = minute();
      
      MinuteHandA = map(Minute, 0 , 60, 0, TWO_PI);
      if(FRAMECOUNT % 100 === 0) {
        FRAMECOUNT = 0;
        Year = year();
        Month = month();
        Day = day();
        Hour = hour();
        
        DAYSINMONTH = MONTHLENGTHA[Month-1];
        YearA = map(Month, 0,12, 0, TWO_PI);
        MonthA = map(Day, 0, DAYSINMONTH, 0, TWO_PI);
        DayA = map(Hour, 0 ,24, 0, TWO_PI);
        HourA = map(Minute%60, 0 , 60, 0, TWO_PI);
        HourHandA = map(Hour % 12, 0, 12, 0, TWO_PI);
      }
    }
    
    //arc(x,y,w,h, start stop, [mode], [detail])
    //circle(x,y,d)
    //x = r * sinA, y = r * cosA
  }
  FRAMECOUNT++;
  fill(255,255,255);
  ellipse(200,200,10);
  stroke(255);

  //Year w = 350
  //Month w = 325
  //Day w = 300
  angleMode(RADIANS)
  noFill();
  strokeWeight(3);
  stroke(3,255,194);
  arc(200, 200, 350, 350, 0, YearA);
  stroke(255,3,68);
  arc(200, 200, 325, 325, 0, MonthA);
  stroke(77,3,255);
  arc(200, 200, 300, 300, 0, DayA);
  
  translate(200,200);
  
  
  //angleMode(DEGREES);
  
  rotate(PI);
  //rectMode(CENTER);
  //rotate(HourHandA);
  //line(0, 0, 0, 50);
  triangle(-50,0 ,50,0, (150 * sin(-HourHandA)), (75 * cos(-HourHandA)));
  //rotate(360-HourHandA);
  
  stroke(3,206,255);
  //rotate(MinuteHandA);
  //line(0, 0, 0, 75);
  triangle(-50,0 ,50,0, (150 * sin(-MinuteHandA)), (100 * cos(-MinuteHandA)));
  //rotate(360-MinuteHandA);
  
  stroke(255);
  //rotate(SecondHandA);
  //line(0, 0, 0, 75);
  triangle(-50,0 ,50,0, (150 * sin(-SecondHandA)), (100 * cos(-SecondHandA)));
  rotate(360-SecondHandA);
  rotate(180);
  translate(-200,-200);
  
  
}
