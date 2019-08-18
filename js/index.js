const config = {
    type: Phaser.AUTO,
    width: w,
    height: h,
    parent: 'app',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: true, // 碰撞範圍
        },
    },
    scene: [  gamePlay, gameStart ]
    // 場景切換遊戲顯示狀態, Ex: 遊戲開始,遊戲進行中, 遊戲結束
}

const game = new Phaser.Game(config);