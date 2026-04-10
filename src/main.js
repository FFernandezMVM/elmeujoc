import Phaser, { Physics } from "phaser";
import './style.css';
// import dudeImg from "assets/Sprite.jpeg"

class EscenaProva extends Phaser.Scene {
  constructor() { super({ key: 'EscenaProva' }); }

  create() {
    this.add.text(400, 300, 'PHASER ESTA VIU!!!', {
      fontSize: '40px', color: '#00ff00', fontStyle: 'bold'
    }).setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800, height: 600,
  parent: 'game-container',
  Physics: {
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

const game = new Phaser.Game(config);

// A create()
  let cursors = this.input.keyboard
                .createCursorKeys();
  
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    players.anims.play('left', true);
  }

  if (cursors.up.isDown
    && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  
this.load.spritesheet('dude', 'assets/yurei/Walk.png', { frameWidth: 32, frameHeight: 48 });

this.anims.create({
  key: 'left',
  frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
  frameRate: 10, repeat: -1
});


this.physics
  .add.collider(player, platforms);

this.physics.add
  .overlap(player,
           stars,
           collect, 
           null,
           this);

stars = this.physics.add.group({
  key: 'star',
  repeat: 11,
  setXY: { x: 12, y: 0, stepX: 70}
});

stars.children.iterate((child) => {
  child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));  
});

let scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

function collect (player, star) {
  star.disableBody(true, true); 
  score += 10;scoreText.setText('Score: ' + score);
}