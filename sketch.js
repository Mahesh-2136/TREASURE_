var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var gameState,over

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
  
  gameState="Play"
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.debug=true
boy.setCollider("circle",0,0,350)
  
over=createSprite(200,200);
over.addAnimation("ko",endImg);
over.scale=0.8
over.visible=false
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  background(0);
  boy.x = World.mouseX;
  
  if (gameState === "Play"){
    if(path.y > 400 ){
    path.y = height/2;
  }
    
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
  
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+2
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+3
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+4
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState="over"
    }
  }

  }
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if (gameState === "over"){
    path.velocityY=0;
    
    boy.destroy();
    diamondsG.destroyEach();
    cashG.destroyEach();
    jwelleryG.destroyEach();
    
    over.visible=true
    
  cashG.setVelocityYEach(0)
diamondsG.setVelocityYEach(0)
jwelleryG.setVelocityYEach(0)
swordGroup.setVelocityYEach(0)
    
cashG.setLifetimeEach(-1)
diamondsG.setLifetimeEach(-1)
jwelleryG.setLifetimeEach(-1)
swordGroup.setLifetimeEach(-1)
  }
  
  
    

  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,150,30);

}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}