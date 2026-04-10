import Phaser, { Physics } from "phaser";
import './style.css';
import dudeImg from "./assets/walking_dude.png"

let player;
let stars;
let cursors;
let score = 0;
let scoreText;

const config = {
  type: Phaser.AUTO,
  width: 800, height: 600,
  parent: 'game-container',
  physics: { 
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
        }
    },
   scene: { 
    preload: preload,
    create: create,
    update: update
  }
};


function preload () {
this.load.spritesheet('dude', dudeImg, { frameWidth: 32, frameHeight: 48 });}

function create() {
  player = this.physics.add.sprite(450, 500, 'dude');
  cursors = this.input.keyboard.createCursorKeys();

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 5 }),
    frameRate: 10,
    repeat: -1 
  }); 

  stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
  }); 

  stars.children.iterate((child) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  }); 

  let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
} 

function update () {
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330)
  }

  if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } 
}


function collect (player, star) {
  star.disableBody(true, true); 
  score += 10;
  scoreText.setText('Score: ' + score);
}

const game = new Phaser.Game(config);