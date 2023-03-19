import Phaser from 'phaser';
import logoImg from './assets/logo.png';
import pre2atlasImg from './assets/pre2atlas.png';
import atlasJSON from './assets/pre2atlas.json';

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
        console.info('[PHASER][MyGame][ constructor ]');
    }

    preload ()
    {
        console.info('[PHASER][MyGame][ preload ]');
        this.load.atlas('man', pre2atlasImg, atlasJSON);
    }
      
    create ()
    {
        console.info('[PHASER][MyGame][ create ]');
        const animations = [
            { name: 'move', frames: [11,'03','05',14,20], fps: 10, loop: false }, 
            { name: 'hit', frames: [22,24,28,31,34,22,24,28,31,34], fps: 10, loop: true }, 
            { name: 'stop', frames: [42,45,49,52], fps: 10, loop: false }, 
            { name: 'jump', frames: [16,41,47,50,50,50,50,50,50,50,50,13,50,13,50,13], fps: 10, loop: false }, 
            { name: 'idle', frames: [25,25,25,25,25,25,25,25,27,27,27,27,25,25,25,25,25,25,25,25,30,25,25,25,25,25,25,25,25,27,30,27,30,35,36,25,25,25,25,25,25,25,25,'07','07','07','07','02','02'], fps: 5, loop: true }, 
            { name: 'hurt', frames: [19], fps: 10, loop: true },
            { name: 'stun', frames: [19], fps: 10, loop: true },
            { name: 'die', frames: [19], fps: 10, loop: false },
            { name: 'spawn', frames: [11,'03','05',14,20], fps: 10, loop: false }
        ];

        /*
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers(
                'man', { frames: [11,'03','05',14,20] }
            ),
            frameRate: 8,
            repeat: -1
        });
        */

        animations.forEach(({name, frames, fps }) => {
            this.anims.create({
                key: name,
                frames: this.anims.generateFrameNumbers(
                    'man', { frames }
                ),
                frameRate: fps,
                repeat: -1
            });
        });
        
        const sprite = this.add.sprite(40, 100);
        sprite.play('move');

        //var atlasTexture = this.textures.get('megaset');
        //var frames = atlasTexture.getFrameNames();
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: MyGame
};

fetch("api/levels/1.json")
    .then(res => res.json())
    .then(data => {
        return data;
    });

const game = new Phaser.Game(config);
