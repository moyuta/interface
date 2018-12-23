float x, y;
float speed;
int w;
void setup() {

  size(1000, 1000);
  x = 0.0;
  y = height/2.0;
  speed = 10.0;
  w = 100;
  draw();shot();exit();
}

void draw(){
  background(255,0,0);
  x += speed;
  if (x > width) {
    x = -w;
    y = random(width - w);
  }
  translate(x, y);
  rect(0, 0, w, w);
}
