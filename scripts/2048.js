function start() {
	document.getElementById("up").addEventListener("click", up)
	document.getElementById("left").addEventListener("click", left)
	document.getElementById("down").addEventListener("click", down)
	document.getElementById("right").addEventListener("click", right)
	shortcut.add("Up", up)
	shortcut.add("Left", left)
	shortcut.add("Down", down)
	shortcut.add("Right", right)

	gameset = getGameset();
	newNumber(gameset);
	document.getElementById("score").textContent = "Score: " + score(gameset);
	setGameset(gameset);
}

function getGameset() {
	var gameset = [];
	for (var n=0; n<16; n++) {
		if (gameset[Math.floor(n/4)] === undefined) {
			gameset[Math.floor(n/4)] = [];
		}
		var cell = document.getElementById("gameset").getElementsByTagName("tr")[Math.floor(n/4)].getElementsByTagName("td")[n%4];
		if (cell.textContent != "") {
			gameset[Math.floor(n/4)][n%4] = parseInt(cell.textContent);
		} else {
			gameset[Math.floor(n/4)][n%4] = 0
		}
	}
	return gameset;
}

function setGameset(gameset) {
	color = {0: "#ffffff", 2: "#ffe1e1", 4: "#ffc8c8", 8: "#ffafaf", 16: "#ff9696", 32: "#ff7d7d", 64: "#ff6464", 128: "#ff4b4b", 256: "#ff3232", 512: "#ff1919", 1024: "#ff0000", 2048: "#e10000", 4096: "#c80000",8192: "#af0000",16384: "#960000",32768: "#7d0000",65536: "#640000"	}
	for (var n=0; n<16; n++) {
		cell = document.getElementById("gameset").getElementsByTagName("tr")[Math.floor(n/4)].getElementsByTagName("td")[n%4]
		if (gameset[parseInt(n/4)][n%4] > 0) {
			cell.textContent = gameset[Math.floor(n/4)][n%4];
			cell.style.backgroundColor = color[gameset[Math.floor(n/4)][n%4]];
		} else {
			cell.textContent = "";
			cell.style.backgroundColor = "white";
		}
	}
}

function newNumber(gameset) {
	var emptyCase = [];
	for (var r=0; r<4; r++) {
		for (var c=0; c<4; c++) {
			if (gameset[r][c] == 0) {
				emptyCase.push([r, c]);
			}
		}
	}
	if (emptyCase.length > 0) {
		var rand = Math.floor(Math.random() * emptyCase.length);
		gameset[emptyCase[rand][0]][emptyCase[rand][1]] = 2;
		return true;
	} else {
		return false;
	}
}

function score(gameset) {
	var score = 0
	for (var r=0; r<4; r++) {
		for (var c=0; c<4; c++) {
			if (typeof(gameset[r][c]) == "number") {
				score += gameset[r][c];
			}
		}
	}
	return score;
}

function gameOver(gameset) {
	document.getElementById("left").removeEventListener("click", left)
	document.getElementById("up").removeEventListener("click", up)
	document.getElementById("down").removeEventListener("click", down)
	document.getElementById("right").removeEventListener("click", right)
	shortcut.remove("Left");
	shortcut.remove("Up");
	shortcut.remove("Right");
	shortcut.remove("Down");

	alert("Game over !\nFinal score: " + score(gameset));
}

function up() {
	button = ["up", "down", "left", "right"]
	for (var x=0; x<4; x++) {
		document.getElementById(button[x]).style.fontSize = "x-large"
	}
	document.getElementById("up").style.fontSize = "xx-large"


	var gameset = getGameset();
	plsLetMeUndo = getGameset();
	var b=true;
	while(b) {
		b=false;
		for (var r=0; r<4; r++) {
			for (var c=0; c<4; c++) {
				if (r != 3 && gameset[r][c] != 0 && gameset[r][c] == gameset[r+1][c]) {
					gameset[r][c]*=2;
					gameset[r+1][c]=0;
					b=true;
				}
				else if (r != 0  && gameset[r][c] != 0 && gameset[r-1][c] == 0) {
					gameset[r-1][c] = gameset[r][c];
					gameset[r][c] = 0;
					b=true;
				}
			}
		}
	}
	if (newNumber(gameset)) {
		document.getElementById("score").textContent = "Score: " + score(gameset);
		setGameset(gameset);
	} else {
		gameOver(gameset);
	}
}

function left() {
	button = ["up", "down", "left", "right"]
	for (var x=0; x<4; x++) {
		document.getElementById(button[x]).style.fontSize = "x-large"
	}
	document.getElementById("left").style.fontSize = "xx-large"

	var gameset = getGameset();
	plsLetMeUndo = getGameset();
	var b=true;
	while(b) {
		b=false;
		for (var r=0; r<4; r++) {
			for (var c=0; c<4; c++) {
				if (c != 3 && gameset[r][c] != 0 && gameset[r][c] == gameset[r][c+1]) {
					gameset[r][c]*=2;
					gameset[r][c+1]=0;
					b=true;
				}
				else if (c != 0  && gameset[r][c] != 0 && gameset[r][c-1] == 0) {
					gameset[r][c-1] = gameset[r][c];
					gameset[r][c] = 0;
					b=true;
				}
			}
		}
	}
	if (newNumber(gameset)) {
		document.getElementById("score").textContent = "Score: " + score(gameset);
		setGameset(gameset);
	} else {
		gameOver(gameset);
	}
}

function down() {
	button = ["up", "down", "left", "right"]
	for (var x=0; x<4; x++) {
		document.getElementById(button[x]).style.fontSize = "x-large"
	}
	document.getElementById("down").style.fontSize = "xx-large"

	var gameset = getGameset();
	plsLetMeUndo = getGameset();
	var b=true;
	while(b) {
		b=false;
		for (var r=3; r>=0; r--) {
			for (var c=3; c>=0; c--) {
				if (r != 0 && gameset[r][c] != 0 && gameset[r][c] == gameset[r-1][c]) {
					gameset[r][c]*=2;
					gameset[r-1][c]=0;
					b=true;
				}
				else if (r != 3  && gameset[r][c] != 0 && gameset[r+1][c] == 0) {
					gameset[r+1][c] = gameset[r][c];
					gameset[r][c] = 0;
					b=true;
				}
			}
		}
	}
	if (newNumber(gameset)) {
		document.getElementById("score").textContent = "Score: " + score(gameset);
		setGameset(gameset);
	} else {
		gameOver(gameset);
	}
}

function right() {
	button = ["up", "down", "left", "right"]
	for (var x=0; x<4; x++) {
		document.getElementById(button[x]).style.fontSize = "x-large"
	}
	document.getElementById("right").style.fontSize = "xx-large"

	var gameset = getGameset();
	plsLetMeUndo = getGameset();
	var b=true;
	while(b) {
		b=false;
		for (var r=3; r>=0; r--) {
			for (var c=3; c>=0; c--) {
				if (c != 0 && gameset[r][c] != 0 && gameset[r][c] == gameset[r][c-1]) {
					gameset[r][c]*=2;
					gameset[r][c-1]=0;
					b=true;
				}
				else if (c != 3  && gameset[r][c] != 0 && gameset[r][c+1] == 0) {
					gameset[r][c+1] = gameset[r][c];
					gameset[r][c] = 0;
					b=true;
				}
			}
		}
	}
	if (newNumber(gameset)) {
		document.getElementById("score").textContent = "Score: " + score(gameset);
		setGameset(gameset);
	} else {
		gameOver(gameset);
	}
}

document.getElementById("undo").addEventListener("click", function() {
	setGameset(plsLetMeUndo);
	document.getElementById("score").textContent = "Lol u nub :p";

})

document.getElementById("restart").addEventListener("click", function() {
	if (score(getGameset()) == 2 || confirm("Please confirm that you want to restart your game ?")) {
		setGameset([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
		start();
	}
})

var plsLetMeUndo = getGameset();
start();
