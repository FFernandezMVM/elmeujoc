import Phaser from "phaser";
import './style.css';
import dudeImg from "./assets/Yurei/Walk.png";
import groundImg from "./assets/ground.png"; 
import coinImg from "./assets/coin.png";
import platformImg from "./assets/platform.png";

let player;
let platforms;
let stars;
let cursors;
let score = 0;
let scoreText;

const config = {
  type: Phaser.AUTO,
  width: 800, 
  height: 600,
  parent: 'game-container',
  physics: { 
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false
    }
  },
  scene: { 
    preload: preload,
    create: create,
    update: update
  }
};

function preload() {
    this.load.spritesheet('dude', dudeImg, { frameWidth: 128, frameHeight: 128 });
    this.load.image('ground', groundImg);
    this.load.image('star', coinImg);
    this.load.image('platform', platformImg); 
}

function create() {

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 600, 'ground').setScale(2, 0.2).refreshBody();
        


    player = this.physics.add.sprite(100, 400, 'dude');
    player.setCollideWorldBounds(true); 
    const hitboxAncho = 20;
    const hitboxLargo = 80;
    player.body.setSize(hitboxAncho, hitboxLargo);
    const offsetX = 20; 
    const offsetY = 20; 
    player.body.setOffset(offsetX, offsetY);
    

    stars = this.physics.add.group({
        key: 'star',
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 70 },
        setScale: { x: 0.2, y: 0.2}
    }); 

    stars.children.iterate((child) => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));;
    }); 


    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    

    this.physics.add.overlap(player, stars, collect, null, this);


    cursors = this.input.keyboard.createCursorKeys();
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: 'white' });


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
        frameRate: 10,
        repeat: -1 
    });


} 

function update() {
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } 
    else if (cursors.right.isDown) {
        player.setVelocityX(160);

    } 
    else {
          player.setVelocityX(0);
        player.anims.stop(); 
        player.setFrame(0);  
    }


    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collect(player, star) {
    star.disableBody(true, true); 
    score += 1;
    scoreText.setText('Score: ' + score);
}

const game = new Phaser.Game(config);
