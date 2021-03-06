// 'use strict';

let state = 'title';
let cnv;
let points = 0;
let w = window.innerWidth;
let h = window.innerHeight;
let player;
let coins = [];
let playerImg;
let coinImg;

// let spritesheet;
// let spritedata;

let animation = [];
// let sprite;
// let turtles = [];

//spritesheet and animations
let playerSS;
let coinSS;
let playerJSON;
let coinJSON;
let playerAnimation = [];
let coinAnimation = [];


function preload() {
  //spritesheets
  // spritedata = loadJSON('turtle.json');
  // spritesheet = loadImage('assets/turtle_sprite_sheet.png');

  //still images
  playerImg = loadImage('assets/turtle_sprite_sheet.png');
  coinImg = loadImage('assets/seaweed.png');

  //spritesheets attempt #2
  playerSS = loadImage('assets/turtle_sprite_sheet.png');
  playerJSON = loadJSON('turtle.json');
  // coinSS = loadImage('assets/seaweed.png');
  // coinJSON = loadJSON('assets/seaweed.json');
}



function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');

  for (let i = 0; i < 5; i++) {
  player = new Player(animation, 100, i * 200, random(0.1, 0.2));
}
  // coins[0] = new Coin();
  coins.push(new Coin());

  playerAnimation.frameDelay = 5;

//playerFrames attempt
  let playerFrames = playerJSON.frames;
  for (let i = 0; i < playerFrames.length; i++) {
    let pos = playerFrames[i].position;
    let img = playerSS.get(pos.x, pos.y, pos.w, pos.h);
    playerAnimation.push(img);
  console.log(playerAnimation);

  }
// player.display();

  // let frames = spritedata.frames;
  // for (let i = 0; i < frames.length; i++) {
  //   let pos = frames[i].position;
  //   let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
  //   animation.push(img);
  // console.log('it');
  // if (frames.length == 1){
  //   frames.length = 0;
  // }
}


// for (let i = 0; i < 5; i++) {
// turtles[i] = new Sprite(animation, 100, i * 100, random(0.1, 0.2));
// turtles[i] = new Sprite(animation, 100, i * 100, random(0.1, 0.2));
// console.log(animation);

// }




function draw() {
  background(40, 140, 150);


  // let frames = spritedata.frames;
  // for (let i = 0; i < frames.length; i++) {
  //   let pos = frames[i].position;
  //   let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
  //   animation.push(img);
  //   console.log('it');
    // if (frames.length == 1){
    //   frames.length = 0;
    // }
  // }
  // for (let i = 0; i < 5; i++) {
  //   turtles[i] = new Sprite(animation, 100, i * 100, random(0.1, 0.2));
    // console.log('animation');
  // }
  //
  // for (let turtle of turtles) {
  //   turtle.show();
  //   turtle.animate();
  // }

  // image(animation[frameCount % animation.length], 0, 0);

  // sprite.show();
  // sprite.animate();

  // levels
  switch (state) {
    case 'title':
      title();
      cnv.mouseClicked(titleMouseClicked);
      break;

    case 'level 1':
      level1();
      cnv.mouseClicked(level1MouseClicked);
      break;

    case 'you win':
      youWin();
      cnv.mouseClicked(youWinMouseClicked);

      break;
    default:
      break;
  }

  if (state === 'title') {
    title();
    cnv.mouseClicked(titleMouseClicked);
  } else if (state === 'level 1') {
    level1();
    cnv.mouseClicked(level1MouseClicked);
  }

}

function keyPressed() {

  if (keyCode == LEFT_ARROW) {
    player.direction = 'left'

  } else if (keyCode == RIGHT_ARROW) {
    player.direction = 'right'

  } else if (keyCode == UP_ARROW) {
    player.direction = 'up'

  } else if (keyCode == DOWN_ARROW) {
    player.direction = 'down'

  } else if (key = ' ') {
    player.direction = 'still'
  }
}

function title() {
  background(50, 150, 200);
  textSize(80);
  fill(255);
  noStroke();
  // stroke(255);
  textAlign(CENTER);
  text('My Game', w / 2, h / 2);
  fill(255);
  textSize(30);
  text('click anywhere to start', w / 2, h - 200);
}

function titleMouseClicked() {
  console.log('canvas is clicked on title page');
  state = 'level 1'
}

function level1() {
  background(50, 150, 200);
  fill(255);

  if (random(1) <= 0.01) {
    coins.push(new Coin());
  }

  player.show();
  player.move();


  //iterating through coins array to display and move them

  //using for loop
  //   for (let i = 0; i < coins.length; i ++){
  //     coins[i].display();
  //     coins[i].move();
  // }

  //using forEach loop
  // coins.forEach(function(coin){
  //   coin.display();
  //   coin.move();
  // })

  //using for of loop
  for (let coin of coins) {
    coin.display();
    coin.move();
  }


  //check for collision, if collide, increase points by 1 and splice out coin
  //of array
  //need to iterate backwards through array
  for (let i = coins.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, coins[i].x, coins[i].y) <= (player.r + coins[i].r) / 2) {
      points++;
      console.log(points);
      coins.splice(i, 1);
    } else if (coins[i].y > h) {
      coins.splice(i, 1);
      console.log('coin is out of town')
    }
  }

  text(`points: ${points}`, w / 8, h - 20);

}

function level1MouseClicked() {
  points++;
  console.log('points =' + points);

  if (points >= 10) {
    state = 'you win'
  }

}

function youWin() {
  background(255, 50, 80);
  textSize(80);
  stroke(255);
  textAlign(CENTER);
  text('You Win', w / 2, h / 2);

  textSize(30);
  fill(255);
  text('click anywhere to restart', w / 2, h - 200);
}

function youWinMouseClicked() {
  state = 'level 1';
  points = 0;
}
