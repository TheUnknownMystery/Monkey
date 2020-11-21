//variables

var blocks, monkey, monkey_img, rock, rock_img, fruit, fruit_img_2, survival = 0

var banan_group, rock_gp, gameState = "play";

//preloading images
function preload() {

  monkey_img = loadAnimation("sprite_0.png", "sprite_1.png ", "sprite_2.png", "sprite_3.png");

  rock_img = loadImage("obstacle.png");

  fruit_Img_2 = loadImage("banana.png");

}

//setup function

function setup() {

  createCanvas(400, 400);

  banana_group = new Group();
  rock_gp = new Group();

  //creating monkey sprite

  monkey = createSprite(29, 347, 10, 10);

  monkey.addAnimation("running", monkey_img);

  monkey.scale = 0.1

}



function draw() {
  camera.position.y= monkey.y
 // camera.position.x= monkey.x

  // monkey.debug=true
  //background    
  background("lightblue")

  // console.log(monkey.y);
  //survival time  
  fill("yellow")
  text("time:" + survival, 200, 200)


  monkey.velocityY = monkey.velocityY + 0.7
  //calling function(block)
  block();

  monkey.collide(blocks);


  //reset ground

  if (block.x < 0) {

    block.x = 200;

  }
  if (gameState === "play") {

    survival = Math.ceil(frameCount / frameRate())

    if (keyDown("space") && monkey.y >= 290) {

      monkey.velocityY = -20

    }

    rock_1();

  }
  else if (gameState === "end") {
    
    survival = 0;
    background(0)
    fill("red")
    text("you lost!",200,200);
    
    monkey.velocityY = 0
    rock_gp.setVelocityXEach(0)
    banana_group.setVelocityXEach(0)
    rock_gp.setLifetimeEach(-1)
    banana_group.setLifetimeEach(-1)

  }



  if (rock_gp.isTouching(monkey)) {
    gameState = "end"
  }

  drawSprites();

}

//functions

function block() {

  blocks = createSprite(10, 380, 800, 80);
  blocks.shapeColor= "green"
  blocks.velocityX = -6

}

function rock_1() {

  if (World.frameCount % 80 === 0) {

    rock = createSprite(400, 340, 10, 10)

    rock.addImage(rock_img);

    rock.scale = 0.2
    rock.velocityX = -5;

    rock.lifetime = 400 / 5;

    rock_gp.add(rock);
  }
}
