const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope, rope1, rope2, fruit, ground;
var fruit_con;
var fruit_con_1;
var fruit_con_2;
var can_y;
var can_x;

var bg_img;
var food;
var rabbit;
//var osso1;
//var none;
var rope_cut, sade, sound1, eating_sound, air
var blower

var button;
var button1;
var button2;
var bunny;
var blink, eat, sad;
var osso
function preload() {
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');;
  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png");
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png");
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png");
  //osso1 = loadAnimation('osso.png', 'ossoCopy.png');
  //none = loadAnimation('png.png', 'png2.png');
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping = false;
  eat.looping = false;
  rope_cut = loadSound("eh.mp3");
  sade = loadSound("sad.wav");
  sound1 = loadSound("sound1.mp3");
  eating_sound = loadSound("eating_sound.mp3")
  air = loadSound("air.wav")
}

function setup() {
  createCanvas(500, 700);
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    can_x = displayWidth;
    can_y = displayHeight
    createCanvas(displayWidth + 80, displayHeight);
  }
  else{
    can_x = windowWidth
    can_y = windowHeight
    createCanvas(windowWidth, windowHeight)
  }
  frameRate(80);

  sound1.play()
  sound1.setVolume(0.9)

  engine = Engine.create();
  world = engine.world;

  button1 = createImg('cut_btn.png');
  button1.position(220, 30);
  button1.size(50, 50);
  button1.mouseClicked(drop1);

  button = createImg('cut_btn.png');
  button.position(90, 40);
  button.size(50, 50);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(230, 470);
  button2.size(50, 50);
  button2.mouseClicked(drop2);

  buttonM = createImg('cut_button.png');
  buttonM.position(450, 10);
  buttonM.size(50, 50);
  buttonM.mouseClicked(muteaudio);

  blower = createImg("blower.png")
  blower.position(10, 250)
  blower.size(150, 100)
  blower.mouseClicked(airblow);

  //osso1.frameDelay = 10;
  //none.frameDelay = 1;
  blink.frameDelay = 7;
  eat.frameDelay = 50;
  sad.frameDelay = 40;
  bunny = createSprite(290, can_y - 80, 100, 100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking', blink);
  bunny.addAnimation('eating', eat);
  bunny.addAnimation('crying', sad);
  //osso.addAnimation('osso1',osso1);
  //osso.addAnimation('none', none);
  //osso.changeAnimation(none);
  bunny.changeAnimation('blinking');




  rope1 = new Rope(8, { x: 245, y: 30 });
  rope = new Rope(7, { x: 115, y: 30 });
  rope2 = new Rope(8, { x: 255, y: 470 });
  ground = new Ground(200, can_y, 600, 20);

  fruit = Bodies.circle(300, 300, 20);
  Matter.Composite.add(rope.body, fruit);

  fruit_con = new Link(rope, fruit);
  fruit_con_1 = new Link(rope1, fruit);
  fruit_con_2 = new Link(rope2, fruit);
  rectMode(CENTER);
  ellipseMode(RADIUS);

}

function draw() {
  background(51);
  image(bg_img, 0, 0, displayWidth + 80, displayHeight);
  push();
  imageMode(CENTER);
  if (fruit != null) {
    image(food, fruit.position.x, fruit.position.y, 60, 60)
  }
  pop();
  rope.show();
  rope1.show();
  rope2.show();
  Engine.update(engine);
  ground.show();
  if (collide(fruit, bunny) == true) {
    bunny.changeAnimation("eating")
    eating_sound.play()
    osso = createImg('osso.png');
    osso.position(210, windowHeight - 50);
    osso.size(100, 50)
    //osso.changeAnimation(osso1)
  }
  if (collide(fruit, ground.body) == true) {
    bunny.changeAnimation("crying")
    sade.play()
  }
  drawSprites();
}

function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}

function drop1() {
  rope1.break();
  fruit_con_1.detach();
  fruit_con_1 = null;
}

function drop2() {
  rope2.break();
  fruit_con_2.detach();
  fruit_con_2 = null;
}

function collide(body, sprite) {
  if (body != null) {
    var d = dist(
      body.position.x,
      body.position.y,
      sprite.position.x,
      sprite.position.y,
    )
    if (d <= 80) {
      World.remove(engine.world, fruit);
      fruit = null;
      return true
    }
    else {
      return false
    }
  }
}

function muteaudio() {
  if (sound1.isPlaying()) {
    sound1.stop()
  }
  else {
    sound1.play()
  }
}

function airblow() {
  Matter.Body.applyForce(fruit, { x: 0, y: 0 }, { x: 0.01, y: 0 })
  air.play()
}