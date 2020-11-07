var monkey, monkey_running;
var ground, groundImage;
var banana,bananaImage,bananaGroup;
var obstacle,obstacleImage,obstaclesGroup;
var jungle,jungleImage;
var score=0;


function preload(){
  monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png",
                                 "Monkey_03.png","Monkey_04.png",
                                 "Monkey_05.png","Monkey_06.png",
                                 "Monkey_07.png","Monkey_08.png",
                                 "Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png");
  jungleImage=loadImage("jungle.jpg")
  obstacleImage=loadImage("stone-1.png");
}

function setup() {
  createCanvas(600,400);
  
  monkey = createSprite(50,370,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;
   score=0;
  ground = createSprite(300,395,600,20);
  
  
  ground.visible = false;
  
  jungle=createSprite(2,200,200,200);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=1.2;
  bananaGroup=new Group();
  obstaclesGroup=new Group();
  
 
  

}

function draw() {
  background(180);
  
  score = score + Math.round(getFrameRate()/60);
  if (jungle.x < 0){
    jungle.x = jungle.width/2;
  }
   jungle.velocityX=-10;
  
  if(keyDown("space")&&monkey.y>270){
    monkey.velocityY=-8 ;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.scale=0.1;
  }
  
  if(bananaGroup.isTouching(monkey)){
    score=score+5;
    bananaGroup.destroyEach();
  }

  
  
   //score.depth=jungle.depth+1;
  //jungle.depth=monkey.depth+1; 
  monkey.depth=jungle.depth+1;
  monkey.collide(ground);
  
 switch(score){
   case 10:monkey.scale=0.12;
    break;
    case 20:monkey.scale=0.14;
     break;
     case 30:monkey.scale=0.16;
     break;
     case 40:monkey.scale=0.18;
     break
     default :  break;
 
 
 }
  
  spawnBanana();
  spawnObstacles();
  drawSprites();
  stroke("white");
  fill("white");
  textSize(18);
  text("Score: "+ score, 500, 50);
}
function spawnBanana() {
  //write code here to spawn the clouds
  if (frameCount % 180 === 0) {
    banana = createSprite(600,450,40,10);
    banana.y = Math.round(random(260,270));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = jungle.depth+1;
    bananaGroup.add(banana);
  }
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,370,10,40);
    obstacle.velocityX = -6;
    
    
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1    ;
    obstacle.lifetime = 200;
    obstacle.depth = jungle.depth+1;
   obstaclesGroup.add(obstacle);
     obstacle.addImage(obstacleImage)   ;

  }
}