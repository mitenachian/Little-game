const gameStart = {
    key: 'gameStart',
    preload: function(){ // 載入資源
        this.load.image('bg1', 'images/bg/bg-1.png');
        this.load.image('bg2', 'images/bg/bg-2.png');
        this.load.image('bg3', 'images/bg/bg-3.png');
        this.load.image('bg4', 'images/bg/bg-4.png');
        this.load.image('bg5', 'images/bg/bg-5.png');
        this.load.spritesheet('user', 'images/player.png', {frameWidth: 309, frameHeight: 309});
        this.load.image('startbtn', 'images/go.png');
        this.load.image('startText', 'mages/start-text.png');
    },
    create: function(){ // 載入遊戲物件完成相關設定
       this.bg1 = this.add.tileSprite(w/2, h/2, w, h, 'bg1');
       this.bg2 = this.add.tileSprite(w/2, h/2, w, h, 'bg2');
       this.bg3 = this.add.tileSprite(w/2, h/2, w, h, 'bg3');
       this.bg4 = this.add.tileSprite(w/2, h/2, w, h, 'bg4');
       this.bg5 = this.add.tileSprite(w/2, h/2, w, h, 'bg5');

       this.startText = this.add.image(w/2, h/2-40, 'startText');
       this.startbtn = this.add.image(w/2, h/2 + 60, 'startbtn');

       // 設定人物位置
       // this.player = this.add.sprite(309, 309, 'user') 改成下面加入物理世界
       this.player = this.physics.add.sprite(300, 350, 'user')
       this.player.setSize(160,160); // 設定角色的邊界讓他不要飛出畫面
       this.player.setScale(1);
       this.startbtn.setInteractive();
       this.startbtn.on('pointerdown', () => {
            this.scene.start('gamePlay');
       })
    },
    update: function(){// 遊戲狀態更新,不斷更新60FPS
        this.bg1.tilePositionX += 1;
        this.bg2.tilePositionX += 1.2;
        this.bg3.tilePositionX += 1.4;
        this.bg4.tilePositionX += 1;
        this.bg5.tilePositionX += 1.3;

    }
}
