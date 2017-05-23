var canvas;
var ctx;
var music;
var brwa;
var score;

var CANVAS_HEIGTH = 400;
var POSX = 25.0;
var VELX = 15.0;
var GRAVITY = 0.5;
var JUMP = 10.0;
var SPEED = 33;

var posY;
var velY;
var onGround;
var cubes;
var rCube;

var loopFunc;

function main() {
	canvas = document.getElementById('canvas');
	canvas.height = CANVAS_HEIGTH;
	ctx = canvas.getContext('2d');
	music = document.getElementById("music");
	brwa = document.getElementById("brwa");
	score = document.getElementById("score");
	start()
}

function start() {
	window.removeEventListener("keypress", start);
	window.addEventListener("keydown", startJump, false);
	window.addEventListener("keyup", endJump, false);
	score.textContent = "0";
	music.play();
	posY = 200.0;
	onGround = true;
	velY = 0.0;
	cubes = [[0.0, 200.0, 400.0]];
	for (var i = 0; i < 10; i++) newCube();
	loopFunc = setInterval(loop, SPEED);
}

function newCube() {
	var lastCubeHeight = CANVAS_HEIGTH - cubes[cubes.length - 1][1];
	var maxGapWidth = (-JUMP - Math.sqrt(Math.pow(JUMP, 2) + 2 * GRAVITY * lastCubeHeight)) / (-GRAVITY);
	var gapWidth = maxGapWidth / 10 + (maxGapWidth - maxGapWidth / 5) * Math.random();
	var maxHeight = lastCubeHeight + JUMP * gapWidth - GRAVITY * Math.pow(gapWidth, 2) / 2;
	var height = 1.0 + (maxHeight - 11.0) * Math.random();

	cubes.push([
		cubes[cubes.length - 1][0] + cubes[cubes.length - 1][2] + gapWidth * VELX,
		CANVAS_HEIGTH - height,
		100.0 + 400.0 * Math.random()
	]);

}

function startJump() {
	if (onGround) {
		velY = -JUMP;
		onGround = false;
	}
}

function endJump() {
	if (velY < -1.0) velY = -1.0;
}

function update() {
	posY += velY;
	for (var i = 0; i < cubes.length; i++) cubes[i][0] -= VELX;
	if (cubes[0][0] + cubes[0][2] + POSX - 10 < 0) {
		newCube();
		rCube = cubes.shift();
		score.textContent = +score.textContent + 1
	}
	if (rCube !== void 0 && rCube[0] + rCube[2] < 0) rCube = [];


	velY += GRAVITY;
	if (POSX + 10.0 > cubes[0][0] && POSX - 10 < cubes[0][0] + cubes[0][2] && posY <= cubes[0][1] && posY < CANVAS_HEIGTH) {
		if (posY + 2 * velY > cubes[0][1]) {
			onGround = true;
			posY = cubes[0][1];
			velY = 0.0;
		} else {
			posY += velY;
		}

	} else if ((POSX + 10.0 <= cubes[0][0] || POSX - 10 >= cubes[0][0] + cubes[0][2]) && posY + velY < CANVAS_HEIGTH ) {
		onGround = false;
		posY += velY;

	} else {
		clearInterval(loopFunc);
		music.pause();
		brwa.play();
		window.addEventListener("keypress", start, false);
	}
}

function render() {
	ctx.clearRect(0, 0, 1600, CANVAS_HEIGTH);
	ctx.beginPath()
	ctx.rect(POSX - 10, posY - 20, 20, 20);
	ctx.fill();
	for (var i = 0; i < cubes.length; i++) {
		ctx.rect(cubes[i][0], cubes[i][1], cubes[i][2], 1600 - cubes[i][1]);
		ctx.stroke();
	}
	if (rCube !== void 0) {
		ctx.rect(rCube[0], rCube[1], rCube[2], 1600 - rCube[1]);
		ctx.stroke();
	}

	ctx.closePath()
}

function loop() {
	update();
	render();
}
