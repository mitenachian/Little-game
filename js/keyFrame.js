const keyFrame = (self) => {
    self.anims.create({
        key: 'run',
        frames: self.anims.generateFrameNumbers('user', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'super',
        frames: self.anims.generateFrameNumbers('user', { start: 1, end: 1 }),
        frameRate: 1,
        repeat: -1
    })
    self.anims.create({
        key: 'died',
        frames: self.anims.generateFrameNumbers('user', { start: 2, end: 2 }),
        frameRate: 1,
        repeat: -1
    })
}