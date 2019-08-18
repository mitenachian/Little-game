const getRandom = (max, min) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const gamePlay = {
    key: 'gamePlay',
    preload: function(){ // 載入資源
        this.load.image('bg1', '../images/bg/bg-1.png');
        this.load.image('bg2', '../images/bg/bg-2.png');
        this.load.image('bg3', '../images/bg/bg-3.png');
        this.load.image('bg4', '../images/bg/bg-4.png');
        this.load.image('bg5', '../images/bg/bg-5.png');
        this.load.image('stone1', '/images/Stone.png');
        this.load.image('stone2', '/images/Stone2.png');
        this.load.image('planet1', '/images/Planet.png');
        this.load.image('planet2', '/images/Planet2.png');
        // 還需要放入gameover, congratulations等狀態
        this.load.image('playAgainbtn', '../images/playAgain.png');
        this.load.spritesheet('user', 'images/player.png', {frameWidth: 309, frameHeight: 309});
        // 相關遊戲設定
        this.timeInt = 30; // 時間
        this.speedLv = 1; // 速度控制
        this.gameStop = false; // 遊戲停止控制
        this.monsterArr = [];    // 存放所有怪物實體
        this.monsterArr2 = [];   // 存放所有怪物實體2
        this.masIdx = 0;         // 怪物索引
        this.masIdx2 = 1;        // 怪物索引2
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
                clearInterval(timer);
                // 設訂gameover或是congratulations
            }
        }, 1000);

        // 動畫影格
        keyFrame(this);

        // 加入物理效果
        const addPhysics = GameObject =>{
            this.physics.add.existing(GameObject);
            GameObject.body.immovable = true;
            GameObject.body.moves = false;
        }

        // 怪物的座標資訊
        const masPos = [
            {name: 'stone1', x: w + 250, y: 470, w: 37, h: 32},
            {name: 'stone2', x: w + 200, y: 320 , w: 52, h: 45},
            {name: 'planet1', x: w + 200, y: 190, w: 209, h: 209},
            {name: 'planet2', x: w + 150, y: 500, w: 193, h: 193},
        ]

        //碰撞到後停止遊戲
        const hittest = (player, stone) => {
            this.gameStop = true;
            this.player.setSize(150, 150, 0);
            this.player.anims.play('died', true);
            clearInterval(timer);
            //let gameover = this.add.image(w / 2, h / 2 - 40, 'gameover');
            //gameover.setScale(0.8);
            let playAgainbtn = this.add.image(w / 2, h / 2 + 30, 'playAgainbtn');
            playAgainbtn.setScale(1);
            playAgainbtn.setInteractive();
            playAgainbtn.on('pointerdown', () => this.scene.start('gameStart'));
        }
        // 產生怪物
        for (let i = 0; i < 10; i++) {
            let BoolIdx = getRandom(3, 0);
            let BoolIdx2 = getRandom(3, 0);
            this['stone'+ i] = this.add.tileSprite(masPos[BoolIdx].x, masPos[BoolIdx].y, masPos[BoolIdx].w, masPos[BoolIdx].h, masPos[BoolIdx].name);
            this['stoneB'+ i] = this.add.tileSprite(masPos[BoolIdx2].x, masPos[BoolIdx2].y, masPos[BoolIdx2].w, masPos[BoolIdx2].h, masPos[BoolIdx2].name);
            this.monsterArr.push(this['stone'+ i]);
            this.monsterArr2.push(this['stoneB'+ i]);
            addPhysics(this['stone'+i]);
            addPhysics(this['stoneB'+i]);
            this.physics.add.collider(this.player, this['stone'+i], hittest);
            this.physics.add.collider(this.player, this['stoneB'+i], hittest);
        }
        //播放動畫
        this.player.anims.play('run', true);

    },
    update: function(){// 遊戲狀態更新,不斷更新60FPS
        if(this.gameStop) return;
        this.bg1.tilePositionX += 1 * this.speedLv;
        this.bg2.tilePositionX += 1.2 * this.speedLv;
        this.bg3.tilePositionX += 1.4 * this.speedLv;
        this.bg4.tilePositionX += 1 * this.speedLv;
        this.bg5.tilePositionX += 1.3 * this.speedLv;
        this.monsterArr[this.masIdx].x -= 3 * this.speedLv;

        if(this.timeInt < 10 && this.timeInt > 0 ){
            this.monsterArr2[this.masIdx2].x -= 3 * this.speedLv;
        }
        // 檢測怪物是否超出邊界然後返回
        for (let i = 0; i < this.monsterArr.length; i++) {
            if(this.monsterArr[i].x <= -100){
                this.monsterArr[i].x = w + 200;
                this.masIdx = getRandom(this.monsterArr.length - 1, 0);
            }
            if(this.monsterArr2[i].x <= -100){
                this.monsterArr2[i].x = w + getRandom(400, 200);
                this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
            }
        }


        // 操作控制
        const keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.right.isDown) {
            this.player.setVelocityX(100);
        } else if (keyboard.left.isDown) {
            this.player.setVelocityX(-100);
        } else if (keyboard.up.isDown) {
            this.player.setVelocityY(-100);
        } else if (keyboard.down.isDown) {
            this.player.setVelocityY(100);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        
    }
}
