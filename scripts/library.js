var version = '1.6';
var size = 2;

class Init {
    constructor() {
        this.Draw();
    };
    Draw() {
        const content = document.createElement('div');
        content.id = 'content';
        const background = document.createElement('div');
        background.id = 'background';
        document.body.appendChild(content);
        document.body.appendChild(background);
        document.body.style.fontSize = size + 'vh';
        document.body.style.fontFamily = 'Mukta Vaani';
        document.body.style.whiteSpace = 'pre-line';
    };
};

class Text {
    constructor(innerHTML) {
        this.Draw(innerHTML);
        this.Space();
    };
    Draw(innerHTML) {
        const text = document.createElement('plaintext');
        text.style.fontWeight = 'normal';
        text.style.fontFamily = 'Mukta Vaani';
        text.innerHTML = innerHTML;
        text.style.color = 'orange';
        text.style.textAlign = 'justify';
        text.style.textOverflow = 'ellipsis';
        text.style.pointerEvents = 'none';
        text.style.zIndex = '10';

        const content = document.getElementById('content');
        document.body.appendChild(text);
    };
    Space() {
        const text = document.createElement('plaintext');
        text.innerHTML = '';
        text.style.color = 'white';
        text.style.width = '70vw';
        text.style.textAlign = 'justify';
        text.style.textOverflow = 'ellipsis';
        text.style.pointerEvents = 'none';
        text.style.left = '15vw';
        text.style.zIndex = '10';
        document.body.appendChild(text);
    }
};

class Space {
    constructor(height) {
        this.Draw(height);
    };
    Draw(height) {
        const text = document.createElement('plaintext');
        text.innerHTML = '';
        text.style.color = 'white';
        text.style.width = '70vw';
        text.style.fontSize = height + 'vh';
        text.style.textAlign = 'justify';
        text.style.textOverflow = 'ellipsis';
        text.style.pointerEvents = 'none';
        text.style.left = '15vw';
        text.style.zIndex = '10';
        document.body.appendChild(text);
    };
};

class Title {
    constructor(innerHTML) {
        this.Draw(innerHTML);
    };
    Draw(innerHTML) {
        const text = document.createElement('plaintext');
        text.style.fontSize = '5vh';
		text.style.fontWeight = 'normal';
        text.style.fontFamily = 'Mukta Vaani';
		text.innerHTML = innerHTML;
		text.style.color = 'orange';
		text.style.textAlign = 'center';
		text.style.textOverflow = 'ellipsis';
		text.style.pointerEvents = 'none';
		text.style.zIndex = '10';
        text.style.position = 'absolute';
        text.style.left = '50%';
        text.style.transform = 'translate(-50%)';
        text.style.top = '15%';

        const content = document.getElementById('content');
        document.body.appendChild(text);
    };
};

class PlayButton {
    constructor(innerHTML) {
        this.Draw(innerHTML);
    };
    Draw(innerHTML) {
        const button = document.createElement('button');
        button.style.fontFamily = 'Mukta Vaani';
        button.innerHTML = innerHTML;
        button.style.fontSize = '2vh';
        button.style.color = 'white';
        button.style.backgroundColor = 'red';
        button.style.border = '2px solid darkred';
        button.style.borderRadius = '5px';
        button.style.padding = '20px 40px';
        button.style.position = 'absolute';
        button.style.top = '50%';
        button.style.left = '50%';
        button.style.transform = 'translate(-50%, -50%)';

        button.onclick = () => { location.replace('file:///C:/Users/Redux/Desktop/fruit-fighters/game.html'); };

        document.body.appendChild(button);
    };
};

class Version {
    constructor() {
        this.Draw();
    };
    Draw() {
        const text = document.createElement('plaintext');
        text.style.fontWeight = 'normal';
        text.style.fontFamily = 'Mukta Vaani';
		text.innerHTML = 'Fruit Fighters Version ' + version;
		text.style.color = '#dcdcdc'
		text.style.width = '15vw'
		text.style.height = '2.2vh'
		text.style.textAlign = 'center'
		text.style.fontStyle = 'none'
		text.style.position = 'absolute'
		text.style.left = '42.5vw'
		text.style.top = '93vh'
		text.style.zIndex = '21'
        document.body.appendChild(text);
    };
};

class preInit {
    constructor() {
        this.Draw();
    };
    Draw() {
        new Init;
        new Space('2.4');
        new Version;
    };
};
