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
let lifeLostText;
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
let pausedText;
let pausedInfoText;
let frozenTime;
let frozenTimeTime = 5;
let frozenText;

function preload() {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.stage.backgroundColor = '#eee';
    game.load.image('orange', 'images/fruit-orange.png');
    game.load.image('watermelon', 'images/fruit-watermelon.png');
    game.load.image('strawberry', 'images/fruit-strawberry.png');
    game.load.image('pepper', 'images/fruit-pepper.png');
    game.load.image('frozen-melon', 'images/fruit-frozen-watermelon.png');
    game.load.spritesheet('bomb', 'images/fruit-bomb.png', 64, 64, 4);
    game.load.spritesheet('start-button', 'images/start-button-transparent-hover.png', 120, 40);
    game.load.image('background', 'images/background.png');
};
function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    background = game.add.tileSprite(0, 0, 600, 400, 'background');
    let style = { font: '18px Arial', fill: 'blue' };
    scoreText = game.add.text(5, 25, 'Score: 0', style);
    livesText = game.add.text(game.world.width - 5, 5, 'Lives: 3', style);
    livesText.anchor.set(1, 0);
    lifeLostText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Life Lost!', {
        font: '20px Arial',
        fill: 'red'
    });
    lifeLostText.anchor.set(0.5);
    lifeLostText.visible = false;
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
    pausedText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, 'Paused', {
        font: '30px Arial',
        fill: 'blue'
    });
    pausedText.anchor.set(0.5);
    pausedText.visible = false;
    pausedInfoText = game.add.text(game.world.width * 0.5, (game.world.height * 0.5) + 20, 'Press "p" to resume.', {
        font: '20px Arial',
        fill: 'blue'
    });
    pausedInfoText.anchor.set(0.5);
    pausedInfoText.visible = false;
    frozenText = game.add.text(game.world.width * 0.5, game.world.height * 0.5, `Freeze! ${frozenTimeTime}`, {
        font: '20px Arial',
        fill: 'blue'
    });
    frozenText.anchor.set(0.5);
    frozenText.visible = false;
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
    let frozenMelon = (fruitType == 'watermelon') ? genRandomNumber(1, 50) == 50 : false;
    let rightSideSpawn = genRandomNumber(1, 2) == 1;
    let newFruit = game.add.sprite((value == 2) ? ((rightSideSpawn) ? (game.world.width - 600) : game.world.width + 0) : (game.world.width - (genRandomNumber(250, 350))), (value == 2) ? (game.world.height * 0.5) : (game.world.height), `${(pepper) ? 'pepper' : (bomb) ? 'bomb' : (frozenMelon) ? 'frozen-melon' : fruitType}`, (bomb) ? 0 : null);
    newFruit.anchor.set(0.5);
    newFruit.scale.set(0.6);
    let explode = newFruit.animations.add('explode', [1, 2, 3, 1, 2, 3, 1, 2, 3, 1, 2, 3], 10);
    game.physics.enable(newFruit, Phaser.Physics.ARCADE);
    newFruit.body.velocity.set((value == 2) ? ((rightSideSpawn) ? 150 : -150) : 0, (value == 2) ? -20 : -175);
    newFruit.body.gravity.y = genRandomNumber(45, 90);
    newFruit.body.gravity.x = (right) ? gravityX : -gravityX;
    newFruit.inputEnabled = true;
    newFruit.events.onInputDown.add(() => {
        if (frozenMelon) {
            frozenTimeTime = 5;
            freeze();
        };
        if (pepper) {
            initDoubleTime();
        }
        if (!bomb && !paused) {
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
        if (bomb && !paused) {
            newFruit.animations.play('explode', 10, false);
            explode.onComplete.add(() => {
                newFruit.kill();
            }, this);
            lives--;
            if (doubleTime) {
                doubleTimeText.visible = false;
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                    if (doubleTime) {
                        doubleTimeText.visible = true;
                    }
                }, 3000)
            }
            if (!doubleTime) {
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                }, 3000)
            }
            livesText.setText(`Lives: ${lives}`);
            if (!lives) {
                gameLost();
            }
        }
        if (!bomb && !paused) {
            newFruit.kill();
        }
    }, this);
    newFruit.checkWorldBounds = true;
    newFruit.events.onOutOfBounds.add(() => {
        if (!bomb) {
            lives--;
            if (doubleTime) {
                doubleTimeText.visible = false;
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                    if (doubleTime) {
                        doubleTimeText.visible = true;
                    }
                }, 3000)
            }
            if (!doubleTime) {
                lifeLostText.visible = true;
                setTimeout(() => {
                    lifeLostText.visible = false;
                }, 3000)
            }
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

function extraSpawns() {
    if (!paused && !frozenTime) {
        if (time >= 30) {
            initFruit(1);
        }
        if (time >= 60) {
            initFruit(1);
        }
        if (time >= 90) {
            initFruit(2);
        }
        if (time >= 120) {
            initFruit(2);
        }
    }
};
setInterval(extraSpawns, 1000);

function changeSpawnInterval() {
    clearInterval(spawnFruit);
    if (spawnInterval > 1000) {
        spawnInterval -= 100;
        spawnFruit = setInterval(initFruit, spawnInterval);
    } else {
        spawnFruit = setInterval(initFruit, spawnInterval);
    }
};

function freeze() {
    game.paused = true;
    clearInterval(spawnFruit);
    doubleTimeText.visible = false;
    lifeLostText.visible = false;
    newHighScoreText.visible = false;
    frozenText.visible = true;
    frozenTime = true;
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
        if (doubleTimeTime == 0) {
            doubleTime = false;
            doubleTimeText.visible = false;
        }
        doubleTimeText.setText(`Double Time! ${doubleTimeTime}`);
    }
    if (frozenTime) {
        frozenTimeTime--;
        if (frozenTimeTime == 0) {
            frozenTime = false;
            game.paused = false;
            spawnFruit = setInterval(initFruit, spawnInterval);
            frozenText.visible = false;
            (doubleTime) ? doubleTimeText.visible = true : null;
        }
        frozenText.setText(`Freeze! ${frozenTimeTime}`);
    }
    timeText.setText(`${timeMin}:${(timeSec < 10) ? 0 : ''}${timeSec}`);
};

function genFruitType() {
    let types = ['orange', 'watermelon', 'strawberry'];
    return types[Math.floor(Math.random() * (types.length))];
};

function gameLost() {
    alert(`You lost! Your final score was ${score}.`);
    if (score > highScore) {
        localStorage.setItem('highScore', score);
    }
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

let totalHeight;
let titleHeight;
let remainingHeight;
function setContentHeight() {
    totalHeight = document.getElementById('changelog').clientHeight;
    let margin = document.getElementById('changelogTitle').currentStyle || window.getComputedStyle(document.getElementById('changelogTitle'));
    titleHeight = (document.getElementById('changelogTitleBox').clientHeight) + (parseFloat(margin.marginTop)) * 2;
    remainingHeight = (totalHeight - titleHeight) - 2;
    document.getElementById('changelogContent').style.height = remainingHeight + 'px';
    window.addEventListener('resize', setContentHeight);
};

function toggleChangelog(value) {
    if (!playing) {
        document.getElementById('changelog').style.display = (value == 1) ? 'block' : 'none';
        if (value == 1) {
            setContentHeight();
        }
    }
};

function toggleHowToPlay(value) {
    if (!playing) {
        document.getElementById('howToPlay').style.display = (value == 1) ? 'block' : 'none';
    }
};

function toggleAlmanac(value) {
    if (!playing) {
        document.getElementById('almanac').style.display = (value == 1) ? 'block' : 'none';
    }
};

function changeAlmanacTab(value) {
    let tabs = ['orangeTab', 'watermelonTab', 'strawberryTab', 'pepperTab', 'bombTab', 'moreTab'];
    tabs.forEach(element => document.getElementById(`${element}`).classList.remove('activeAlmanacTab'));
    document.getElementById(`${(value == 0) ? 'orangeTab' : (value == 1) ? 'watermelonTab' : (value == 2) ? 'strawberryTab' : (value == 3) ? 'pepperTab' : (value == 4) ? 'bombTab' : 'moreTab'}`).classList.add('activeAlmanacTab');
    let pages = ['almanacContentOrange', 'almanacContentWatermelon', 'almanacContentStrawberry', 'almanacContentPepper', 'almanacContentBomb', 'almanacContentFrozenWatermelon'];
    pages.forEach(element => document.getElementById(`${element}`).style.display = 'none');
    document.getElementById(`${(value == 0) ? 'almanacContentOrange' : (value == 1) ? 'almanacContentWatermelon' : (value == 2) ? 'almanacContentStrawberry' : (value == 3) ? 'almanacContentPepper' : (value == 4) ? 'almanacContentBomb' : 'almanacContentFrozenWatermelon'}`).style.display = 'block';
};

let totalHeightA;
let titleHeightA;
let remainingHeightA;
function setAlmanacContentHeight() {
    totalHeightA = document.getElementById('almanac').clientHeight;
    titleHeightA = document.getElementById('almanacTop').clientHeight;
    remainingHeightA = (totalHeightA - titleHeightA) - 2;
    let tabsContent = ['almanacContentOrange', 'almanacContentWatermelon', 'almanacContentStrawberry', 'almanacContentPepper', 'almanacContentBomb', 'almanacContentFrozenWatermelon'];
    tabsContent.forEach(element => document.getElementById(`${element}`).style.height = remainingHeightA + 'px');
    window.addEventListener('resize', setAlmanacContentHeight);
};

let paused = false;
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 80) {
        if (!paused) {
            game.paused = true;
            clearInterval(clock);
            clearInterval(spawnFruit);
            doubleTimeText.visible = false;
            lifeLostText.visible = false;
            newHighScoreText.visible = false;
            pausedText.visible = true;
            pausedInfoText.visible = true;
            paused = true;
        } else {
            if (!frozenTime) {
                game.paused = false;
            }
            clock = setInterval(timer, 1000);
            spawnFruit = setInterval(initFruit, spawnInterval);
            pausedText.visible = false;
            pausedInfoText.visible = false;
            (doubleTime) ? doubleTimeText.visible = true : null;
            paused = false;
        }
    }
});

window.addEventListener('blur', () => {
    game.paused = true;
    clearInterval(clock);
    clearInterval(spawnFruit);
    doubleTimeText.visible = false;
    lifeLostText.visible = false;
    newHighScoreText.visible = false;
    pausedText.visible = true;
    pausedInfoText.visible = true;
    paused = true;
});
