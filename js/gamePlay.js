const gamePlay = {
    key: 'gamePlay',
    preload: function(){ // 載入資源
        this.load.image('bg1', '../images/bg/bg-1.png');
        this.load.image('bg2', '../images/bg/bg-2.png');
        this.load.image('bg3', '../images/bg/bg-3.png');
        this.load.image('bg4', '../images/bg/bg-4.png');
        this.load.image('bg5', '../images/bg/bg-5.png');
        this.load.spritesheet('user', 'images/player.png', {frameWidth: 309, frameHeight: 309});
        // 時間設定
        this.timeInt = 30;
        this.speedLv = 1;
        this.gameStop = false;
    },
    create: function(){ // 載入遊戲物件完成相關設定
        
       this.bg1 = this.add.tileSprite(w/2, h/2, w, h, 'bg1');
       this.bg2 = this.add.tileSprite(w/2, h/2, w, h, 'bg2');
       this.bg3 = this.add.tileSprite(w/2, h/2, w, h, 'bg3');
       this.bg4 = this.add.tileSprite(w/2, h/2, w, h, 'bg4');
       this.bg5 = this.add.tileSprite(w/2, h/2, w, h, 'bg5');
       // 設定人物位置
       // this.player = this.add.sprite(309, 309, 'user') 改成下面加入物理世界
       this.player = this.physics.add.sprite(309, 309, 'user')
       this.player.setSize(160,160); // 設定角色的邊界讓他不要飛出畫面
       this.player.setScale(0.7); // 設定動畫撥放
       this.player.setCollideWorldBounds(true);
       this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('user', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
        })
        this.TimeText = this.add.text(w-90, h-40, `Time:${this.timeInt}`, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' , fontSize: '16px', color: '#fff'});
        
        // 計時器
        let timer = setInterval(()=> {
            this.timeInt --;
            if(this.timeInt < 20 && this.time > 10) {
                this.speedLv = 3
            }
            if(this.timeInt  < 10 && this.timeInt > 0){
                this.speedLv = 4
            }
            // 用setText改變文字內容
            this.TimeText.setText(`Time:${this.timeInt}`)
            if(this.timeInt <= 0) {
                this.gameStop = true;
                clearInterval(timer)
            }
        }, 1000)
    },
    update: function(){// 遊戲狀態更新,不斷更新60FPS
        if(this.gameStop) return;
        this.bg1.tilePositionX += 1 * this.speedLv;
        this.bg2.tilePositionX += 1.2 * this.speedLv;
        this.bg3.tilePositionX += 1.4 * this.speedLv;
        this.bg4.tilePositionX += 1 * this.speedLv;
        this.bg5.tilePositionX += 1.3 * this.speedLv;

        // 操作控制
        const keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.right.isDown) {
            this.player.anims.play('speed', true);
            this.player.setVelocityX(100);

        } else if (keyboard.left.isDown) {
            this.player.anims.play('speed', true);
            this.player.setVelocityX(-100);
        } else if (keyboard.up.isDown) {
            this.player.anims.play('speed', true);
            this.player.setVelocityY(-100);
        } else if (keyboard.down.isDown) {
            this.player.anims.play('speed', true);
            this.player.setVelocityY(100);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        
    }
}
