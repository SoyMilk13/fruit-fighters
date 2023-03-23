const game = new Phaser.Game(600, 400, Phaser.CANVAS, null, {
    preload: preload,
    create: create,
    update: update
});

let playing = false;
let spawnInterval = 2000;
let doubleSpawn = false;
let tripleSpawn = false;
let sideSpawnOne = false;
let sideSpawnTwo = false;
let score = 0;
let scoreText;
let lives = 3;
let livesText;
let time = 0;
let timeMin = 0;
let timeSec = 0;
let timeText;
let highScore = localStorage.getItem('highScore') ?? 0;
let highScoreText;
let newHighScore = false;
let newHighScoreText;
let doubleTime;
let doubleTimeText;
let doubleTimeTime = 10;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('orange', 'images/fruit-orange.png');
    game.load.image('watermelon', 'images/fruit-watermelon.png');
    game.load.image('strawberry', 'images/fruit-strawberry.png');
    game.load.image('pepper', 'images/fruit-pepper.png');
    game.load.image('bomb', 'images/fruit-bomb.png');
    game.load.spritesheet('bomb-explosion', 'images/fruit-bomb-explosion.png', 64, 64, 3);
    game.load.spritesheet('start-button', 'images/start-button-transparent-hover.png', 120, 40);
    game.load.image('background', 'images/background.png');
};
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    background = game.add.tileSprite(0, 0, 600, 400, 'background');
    checkForDoubleSpawn = setInterval(checkForIncreasedFruitSpawn, 1000);
    let style = { font: '18px Arial', fill: 'blue' };
    scoreText = game.add.text(5, 25, 'Score: 0', style);
    livesText = game.add.text(game.world.width - 5, 5, 'Lives: 3', style);
    livesText.anchor.set(1, 0);
    timeText = game.add.text(game.world.width * 0.5, 5, `${timeMin}:${(timeSec < 10) ? 0 : null}${timeSec}`, style);
    timeText.anchor.set(0.5, 0);
    highScoreText = game.add.text(5, 5, `High Score: ${highScore}`, style);
    newHighScoreText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'New high score!', {
        font: '20px Arial',
        fill: 'orange'
    });
    newHighScoreText.anchor.set(0.5);
    newHighScoreText.visible = false;
    startButton = game.add.button(
        game.world.width * 0.5,
        game.world.height * 0.5,
        'start-button',
        startGame,
        this,
        1,
        0
    );
    startButton.anchor.set(0.5);
    doubleTimeText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, `Double time! ${doubleTimeTime}`, {
        font: '20px Arial',
        fill: 'orange'
    });
    doubleTimeText.anchor.set(0.5);
    doubleTimeText.visible = false;
};
function update() {}

function startGame() {
    startButton.destroy();
    spawnFruit = setInterval(initFruit, spawnInterval);
    clock = setInterval(timer, 1000);
    return playing = true;
};

function initFruit(value) {
    let pepper = genRandomNumber(1, 20) == 20;
    let bomb = (pepper) ? false : genRandomNumber(1, 3) == 3;
    let right = genRandomNumber(1, 2) == 2;
    let gravityX = genRandomNumber(5, 12);
    let fruitType = genFruitType();
    let rightSideSpawn = genRandomNumber(1, 2) == 1;
    let newFruit = game.add.sprite((value == 2) ? ((rightSideSpawn) ? (game.world.width - 600) : game.world.width + 0) : (game.world.width - (genRandomNumber(250, 350))), (value == 2) ? (game.world.height * 0.5) : (game.world.height), `${(pepper) ? 'pepper' : (bomb) ? 'bomb' : fruitType}`);
    newFruit.anchor.set(0.5);
    newFruit.scale.set(0.5);
    let explode = newFruit.animations.add('bomb-explosion', [0, 1, 2, 0, 1, 2, 0, 1, 2], 24);
    game.physics.enable(newFruit, Phaser.Physics.ARCADE);
    newFruit.body.velocity.set((value == 2) ? ((rightSideSpawn) ? 150 : -150) : 0, (value == 2) ? -20 : -175);
    newFruit.body.gravity.y = genRandomNumber(45, 90);
    newFruit.body.gravity.x = (right) ? gravityX : -gravityX;
    newFruit.inputEnabled = true;
    newFruit.events.onInputDown.addOnce(() => {
        if (pepper) {
            initDoubleTime();
        }
        if (!bomb) {
            score += (doubleTime) ? 20 : 10;
            if ((score > highScore) && !newHighScore && !doubleTime) {
                newHighScoreText.visible = true;
                newHighScore = true;
                setTimeout(() => {
                    newHighScoreText.visible = false;
                }, 5000);
            }
            scoreText.setText(`Score: ${score}`);
        }
        if (bomb) {
            explode.play();
            explode.onComplete.addOnce(() => {
                newFruit.kill();
            }, this);
            lives--;
            livesText.setText(`Lives: ${lives}`);
            if (!lives) {
                gameLost();
            }
        }
        if (!bomb) {
            newFruit.kill();
        }
    }, this);
    newFruit.checkWorldBounds = true;
    newFruit.events.onOutOfBounds.add(() => {
        if (!bomb) {
            lives--;
            livesText.setText(`Lives: ${lives}`);
            if (!lives) {
                gameLost();
            }
        }
    }, this);
    setInterval(() => {
        newFruit.angle += (right) ? (genRandomNumber(1, 2)) : -(genRandomNumber(1, 2));
    }, 200);
    if (value !== 1) {
        changeSpawnInterval();
    }
};

function initFruit2() {
    initFruit(1);
};
function initFruit3() {
    initFruit(1);
};
function initFruit4() {
    initFruit(2);
};
function initFruit5() {
    initFruit(2);
};

function changeSpawnInterval() {
    clearInterval(spawnFruit);
    if (spawnInterval > 1000) {
        spawnInterval -= 100;
        spawnFruit = setInterval(initFruit, spawnInterval);
    } else {
        spawnFruit = setInterval(initFruit, spawnInterval);
    }
};

function timer() {
    time++;
    timeSec++;
    if (timeSec == 60) {
        timeSec -= 60;
        timeMin ++;
    }
    if (doubleTime) {
        doubleTimeTime--;
        doubleTimeText.setText(`Double Time! ${doubleTimeTime}`);
        if (doubleTimeTime == 0) {
            doubleTime = false;
            doubleTimeText.visible = false;
        }
    }
    timeText.setText(`${timeMin}:${(timeSec < 10) ? 0 : ''}${timeSec}`);
};

function checkForIncreasedFruitSpawn() {
    if (time >= 30 && !doubleSpawn) {
        spawnFruitDouble = setInterval(initFruit2, 1000);
        doubleSpawn = true;
        clearInterval(checkForDoubleSpawn);
        checkForTripleSpawn = setInterval(checkForIncreasedFruitSpawn, 1000);
    } else if (time >= 60 && doubleSpawn && !tripleSpawn) {
        spawnFruitTriple = setInterval(initFruit3, 1000);
        tripleSpawn = true;
        clearInterval(checkForTripleSpawn);
        checkForFirstSideSpawn = setInterval(checkForIncreasedFruitSpawn, 1000);
    } else if (time >= 90 && tripleSpawn && !sideSpawnOne) {
        spawnFruitSidesOne = setInterval(initFruit4, 1000);
        sideSpawnOne = true;
        clearInterval(checkForFirstSideSpawn);
        checkForSecondSideSpawn = setInterval(checkForIncreasedFruitSpawn, 1000);
    } else if (time >= 120 && sideSpawnOne && !sideSpawnTwo) {
        spawnFruitSidesTwo = setInterval(initFruit5, 1000);
        sideSpawnTwo = true;
        clearInterval(checkForSecondSideSpawn);
    }
};

function genFruitType() {
    let types = ['orange', 'watermelon', 'strawberry'];
    return types[Math.floor(Math.random() * (types.length))];
};

function gameLost() {
    alert(`You lost! Your final score was ${score}.`);
    localStorage.setItem('highScore', score);
    location.reload();
};

function initDoubleTime() {
    if (!doubleTime) {
        doubleTime = true;
        doubleTimeTime = 10;
    } else {
        return;
    }
    if (!newHighScoreText.visible) {
        doubleTimeText.visible = true;
    } else {
        setTimeout(() => {
            doubleTimeText.visible = true;
        }, 5000);
    }
};

function genRandomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function toggleChangelog(value) {
    if (!playing) {
        document.getElementById('changelog').style.display = (value == 1) ? 'block' : 'none';
    }
};

function toggleHowToPlay(value) {
    if (!playing) {
        document.getElementById('howToPlay').style.display = (value == 1) ? 'block' : 'none';
    }
};
