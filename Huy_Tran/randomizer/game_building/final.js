//**************************NEW DAYS WITH BUILING GAME**************************//
//--------------------------- Build 05/05/2021----------------------------//
'use strict';

let state = 'title';
let cnv;
let score = 0;
let w = 1024;
let h = 670;
// let w = 660;
// let h = 550;

let lives = 3;

let player = 1;
let covs = [];

let enemies = [];

let playerImg;
let covImg4;

let enemyImg;

let highScore = 0;


//************************** FUNCTION **************************//
function preload() {

  playerImg = loadImage('assets/SC.gif')

  covImg4 = loadImage('assets/200x200/c4.gif')

  enemyImg = loadImage('assets/200x200/c3.gif')

} //load img lib

function setup() {
  cnv = createCanvas(w, h);
  frameRate(100);

  imageMode(CENTER);
  rectMode(CENTER);

  textFont('Raleway, Oswald');

  player = new Player();

  // covs[0] = new Cov();
  covs.push(new Cov());
  enemies.push(new Enemy());
}

function draw() {

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

    case 'game over':
      gameOver();
      cnv.mouseClicked(gameOverMouseClicked);
      break;

    default:
      break;
  }
}

function title() {
  background('#69E854');
  textSize(80); //Should be setup size on top of text.
  text('COVID SMASHIN', w / 4, h / 3);
  // textFont(fontRegular);

  textSize(40); //Should be setup size on top of text.
  text('Click to start', w / 2.6, h / 2.3);

}

function titleMouseClicked() {
  state = 'level 1'
}

function level1() {
  background('#FF5F7C');
  // textSize(18);
  // textAlign(CENTER);

  if (random(1) <= .04) {
    covs.push(new Cov());
  }

  if (random(1) <= .06) {
    enemies.push(new Enemy());
  }

  player.display();
  player.move();


  //iterating thru covs array to display and mov them

  //using for loop
  for (let i = 0; i < covs.length; i++) {
    covs[i].display();
    covs[i].move();
  }

  //iterating thru enemies array to display and mov them
  //using for loop
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].display();
    enemies[i].move();
  }

  //Check collision with covs, if there is a collision increase pts by 1 & splice that covs out of the array
  //need to iterate backward through array

  for (let i = covs.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, covs[i].x, covs[i].y) <= (player.r + covs[i].r) / 2) {
      score++;
      // console.log(score);
      covs.splice(i, 1);
    } else if (covs[i].y > h) {
      covs.splice(i, 1);
    }
  }

  //Check collision enemies, if there is a collision increase pts by 1 & splice that enemies out of the array
  //need to iterate backward through array

  for (let i = enemies.length - 1; i >= 0; i--) {
    if (dist(player.x, player.y, enemies[i].x, enemies[i].y) <= (player.r + enemies[i].r) / 2) {
      score--;
      // console.log(score);
      enemies.splice(i, 1);
    } else if (enemies[i].y > h) {
      enemies.splice(i, 1);
    }
  }
  text(`Score: ${score}`, w / 10, h - 30);

  //---check value +/- to pop the msg
  if (score >= 5) {
    state = 'you win';
  } else if (score <= -1) {
    state = 'game over';
  }
}

function youWin() {
  background(230, 130, 50);
  textSize(40); //Should be setup size on top of text.
  text('YOU WIN', w / 2.5, h / 2);


  textSize(20); //Should be setup size on top of text.
  text('click to restart', w / 2.42, h / 1.8);
}

function gameOver() {
  background('#5CFFD3');
  textSize(50); //Should be setup size on top of text.

  // check no. lives
  if (lives >= 0) {
    text(`Lives left: ${lives}`, w / 2.7, h / 3.4);


    textSize(20); //Should be setup size on top of text.
    text('Click to try again', w / 2.48, h / 2.9);
  } else {
    //game over
    text('GAME OVER', w / 2.60, h / 2.9);


    textSize(20); //Should be setup size on top of text.
    text('Click to restart', w / 2.32, h / 2.5);
  }

}
//************************** BEHAVIORS **************************//

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
    player.direction = 'still';
  }
}

function keyReleased() {
  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(UP_ARROW)) {
    numberKeysPressed++;
  }

  if (keyIsDown(DOWN_ARROW)) {
    numberKeysPressed++;
  }
  if (numberKeysPressed == 0) {
    player.direction = 'still';
  }
}

function level1MouseClicked() {
  score++;
  console.log('score = ' + score);

  //counting clicks to win
  if (score >= 5) {
    state = 'You Win';
  }
}

function youWinMouseClicked() {
  state = 'title';
  score = 0;
}

function gameOverMouseClicked() {

  if (lives >= -1) { //0 lives going into it, bc lives taken away in gameover function
    lives--; //if you have a life, you lose one
    state = 'level 1';
  } else {
    state = 'title';
  }
  score = 1;
}
//******************************** END} *************************************//
