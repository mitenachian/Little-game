const getRandom = (max, min) =>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
const gamePlay = {
    key: 'gamePlay',
    preload: function(){ // 載入資源
        this.load.image('bg1', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/bg/bg-1.png');
        this.load.image('bg2', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/bg/bg-2.png');
        this.load.image('bg3', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/bg/bg-3.png');
        this.load.image('bg4', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/bg/bg-4.png');
        this.load.image('bg5', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/bg/bg-5.png');
        this.load.image('stone1', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/Stone1.png');
        this.load.image('stone2', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/Stone2.png');
        this.load.image('stone3', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/Stone1.png');
        this.load.image('planet1', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/Planet1.png');
        this.load.image('planet2', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/Planet2.png');
        this.load.image('success', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/m_Success.png');
        this.load.image('gameOver', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/gameover-text.png');
        this.load.image('playAgainbtn', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/playAgain.png');
        this.load.spritesheet('user', 'https://github.com/mitenachian/Little-game/tree/gh-pages/images/player.png', {frameWidth: 309, frameHeight: 309});
        // 相關遊戲設定
        this.timeInt = 90; // 時間
        this.speedLv = 2; // 速度控制
        this.gameStop = false; // 遊戲停止控制
        this.monsterArr = [];    // 存放所有怪物實體
        this.monsterArr2 = [];   // 存放所有怪物實體2
        this.masIdx = 0;         // 怪物索引
        this.masIdx2 = 1;        // 怪物索引2
        this.planetArr = [];    // 存放所有怪物實體
        this.planetArr2 = [];   // 存放所有怪物實體2
        this.mas2Idx = 0;         // 怪物索引
        this.mas2Idx2 = 1;        // 怪物索引2
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
        this.TimeText = this.add.text(w-90, h-40, `Time:${this.timeInt}`, { fontFamily: 'Verdana, "Times New Roman", Tahoma, serif' , fontSize: '20px', color: '#fff'});
        
        // 計時器
        let timer = setInterval(()=> {
            this.timeInt --;
            if(this.timeInt < 60 && this.time > 30) {
                this.speedLv = 4
            }
            if(this.timeInt  < 30 && this.timeInt > 0){
                this.speedLv = 5
            }
            // 用setText改變文字內容
            this.TimeText.setText(`Time:${this.timeInt}`)
            if(this.timeInt <= 0) {
                this.gameStop = true;
                clearInterval(timer);
                let Succe = this.add.image(w / 2, h / 2 - 50, 'success');
                Succe.setScale(1);
                let playAgainbtn = this.add.image(w / 2, h / 2 + 40, 'playAgainbtn');
                playAgainbtn.setScale(1);
                playAgainbtn.setInteractive();
                playAgainbtn.on('pointerdown', () => this.scene.start('gameStart'));
                this.player.anims.play('super', true);

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
            {name: 'stone1', x: 1240 + 250, y: 470, w: 37, h: 32},
            {name: 'stone2', x: 1240 + 200, y: 320 , w: 52, h: 45},
            {name: 'stone3', x: 1240 + 200, y: 190 , w: 37, h: 32},
        ]
        const masPos2 = [
            {name: 'planet1', x: 1240 + 200, y: 190, w: 91, h: 91},
            {name: 'planet2', x: 1240 + 150, y: 480, w: 93, h: 93},
        ]

        //碰撞到後停止遊戲
        const hittest = (player, stone) => {
            this.gameStop = true;
            this.player.setSize(150, 150, 0);
            this.player.anims.play('died', true);
            clearInterval(timer);
            let gameOver = this.add.image(w / 2, h / 2 - 40, 'gameOver');
            gameOver.setScale(1);
            let playAgainbtn = this.add.image(w / 2, h / 2 + 30, 'playAgainbtn');
            playAgainbtn.setScale(1);
            playAgainbtn.setInteractive();
            playAgainbtn.on('pointerdown', () => this.scene.start('gameStart'));
        }
        // 產生怪物
        for (let i = 0; i < 10; i++) {
            let BoolIdx = getRandom(2, 0);
            let BoolIdx2 = getRandom(2, 0);
            this['stone'+ i] = this.add.tileSprite(masPos[BoolIdx].x, masPos[BoolIdx].y, masPos[BoolIdx].w, masPos[BoolIdx].h, masPos[BoolIdx].name);
            this['stoneB'+ i] = this.add.tileSprite(masPos[BoolIdx2].x, masPos[BoolIdx2].y, masPos[BoolIdx2].w, masPos[BoolIdx2].h, masPos[BoolIdx2].name);
            this.monsterArr.push(this['stone'+ i]);
            this.monsterArr2.push(this['stoneB'+ i]);
            addPhysics(this['stone'+i]);
            addPhysics(this['stoneB'+i]);
            this.physics.add.collider(this.player, this['stone'+i], hittest);
            this.physics.add.collider(this.player, this['stoneB'+i], hittest);
            
        }
        // 產生palnet
        for (let i = 1; i < 10; i++) {
            let BoolIdx = getRandom(1, 0);
            let BoolIdx2 = getRandom(1, 0);
            this['planet'+ i] = this.add.tileSprite(masPos2[BoolIdx].x, masPos2[BoolIdx].y, masPos2[BoolIdx].w, masPos2[BoolIdx].h, masPos2[BoolIdx].name);
            this['planetB'+ i] = this.add.tileSprite(masPos2[BoolIdx2].x, masPos2[BoolIdx2].y, masPos2[BoolIdx2].w, masPos2[BoolIdx2].h, masPos2[BoolIdx2].name);
            this.planetArr.push(this['planet'+ i]);
            this.planetArr2.push(this['planetB'+ i]);
            addPhysics(this['planet'+i]);
            addPhysics(this['planetB'+i]);
            this.physics.add.collider(this.player, this['planet'+i], hittest);
            this.physics.add.collider(this.player, this['planetB'+i], hittest);
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
        this.planetArr[this.mas2Idx].x -= 2 * this.speedLv;

        if(this.timeInt < 30 && this.timeInt > 0 ){
            this.monsterArr2[this.masIdx2].x -= 4 * this.speedLv;
            this.planetArr2[this.mas2Idx2].x -= 3 * this.speedLv;
        }
        // 檢測怪物是否超出邊界然後返回
        for (let i = 0; i < this.monsterArr.length; i++) {
            if(this.monsterArr[i].x <= -100){
                this.monsterArr[i].x = w + 200;
                this.planetArr[i].x = w + 200;
                this.masIdx = getRandom(this.monsterArr.length - 1, 0);
                this.masIdx = getRandom(this.planetArr.length - 1, 0);
            }
            if(this.monsterArr2[i].x <= -100){
                this.monsterArr2[i].x = w + getRandom(600, 100);
                this.planetArr2[i].x = w + getRandom(600, 100);
                this.masIdx2 = getRandom(this.monsterArr2.length - 1, 0);
                this.masIdx2 = getRandom(this.planetArr2.length - 1, 0);
                
            }

        }


        // 操作控制
        const keyboard = this.input.keyboard.createCursorKeys();
        if (keyboard.right.isDown) {
            this.player.setVelocityX(150);
        } else if (keyboard.left.isDown) {
            this.player.setVelocityX(-150);
        } else if (keyboard.up.isDown) {
            this.player.setVelocityY(-150);
        } else if (keyboard.down.isDown) {
            this.player.setVelocityY(150);
        } else {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        }
        
    }
}
