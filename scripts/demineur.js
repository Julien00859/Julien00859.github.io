// Node shortcut
var configNode;
var tableNode;
var bestTimeNode;

// Values of config form on submit
var width;
var height;
var mineCount;
var freeCount;
var startTime;
var bestTimes = JSON.parse(localStorage.getItem("bestTimes")) || {};

function updateScore(newTime) {
	let width = +configNode.width.value;
	let height = +configNode.height.value;
	let difficulty = +configNode.difficulty.value;
	let id = width * height + "." + difficulty;

	if (newTime != void 0) {
		if (!(id in bestTimes) || newTime < bestTimes[id]) {
			bestTimes[id] = newTime;
			localStorage.setItem("bestTimes", JSON.stringify(bestTimes));
		}
	}

	bestTimeNode.textContent = (id) in bestTimes ? (bestTimes[id] / 1000).toFixed(3) : "NaN";
}

function main() {
	// Main function, called after page load

	// Shortcut to some nodes
	configNode = document.getElementById("config");
	tableNode = document.getElementById("table");
	bestTimeNode = document.getElementById("bestTime");

	updateScore();

	// Record events
	configNode.width.onchange = function() {
		updateScore();
		createField();
	}
	configNode.height.onchange = function() {
		updateScore();
		createField();
	}

	configNode.addEventListener("submit", event => {
		// Cancel the submit
		event.preventDefault();
		event.stopPropagation();

		// Save config values in global variable
		width = parseInt(configNode.width.value);
		height = parseInt(configNode.height.value);
		mineCount = parseInt(width * height * configNode.difficulty.value);
		freeCount = width * height - mineCount;

		// Initiate a new game
		createField();
		hideMines();
		addMouseEvents();

		configNode.setAttribute("hidden", true);
		startTime = new Date();
	});
	createField();
}

// Reveal a cell, maybe a bomb, maybe not !
function reveal(cell, x, y) {
	// If cell is a bomb, stop the game
	if (cell.hasAttribute("data-mine")) {

		// Show bombs
		for (let node of document.querySelectorAll("div[data-mine]"))
			if (!node.classList.contains("blackFlag"))
					node.classList.add("blackMine");

		// Show this cell as exploded bomb
		cell.classList.add("redMine");

		// Show invalids flags
		for (let node of document.querySelectorAll("div[data-flag]")) {
			if (!node.hasAttribute("data-mine")) {
				node.classList.remove("blackFlag");
				node.classList.add("redFlag");
			}
		}

		// Disable events and show the menu in 1.5 seconds
		removeMouseEvents();
		setTimeout(function(){configNode.removeAttribute("hidden")}, 1500);
		return;
	}

	freeCount--;

	// Flag the cell
	cell.classList.remove("unrevealed");
	let count = countAround(x, y);
	cell.setAttribute("data-number", count);

	// Adapt the events
	cell.onclick = null;
	cell.oncontextmenu = null;

	// Some mines around ?
	if (count > 0) {
		// If so, flag the cell with the number and add an event
		cell.ondblclick = function() { revealAround(cell, x, y); };
		cell.classList.add("num" + count);
	} else {
		// Otherwise discover cells around
		queue = [[x, y]];
		while (queue.length > 0) {

			// Get a cell in the queue
			let [x, y] = queue.shift();

			// For each cell around
			for (let xx = Math.max(0, x-1); xx < Math.min(width, x+2); xx++) {
				for (let yy = Math.max(0, y-1); yy < Math.min(height, y+2); yy++) {

					// Skip me
					if (xx == x && yy == x)
						continue;

					cell = getCellAt(xx, yy);

					// Skip flagged cells
					if (cell.hasAttribute("data-number"))
						continue;

					freeCount--;

					// Adapt the events
					cell.onclick = null;
					cell.oncontextmenu = null;

					// Count around, flag the cell
					count = countAround(xx, yy);
					cell.classList.remove("unrevealed");
					cell.setAttribute("data-number", count);

					// Show the number or add the cell position to the queue
					if (count > 0) {
						cell.ondblclick = function() { revealAround(cell, xx, yy); };
						cell.classList.add("num" + count);
					}
					else
						queue.push([xx, yy]);
				}
			}
		}
	}
	if (!freeCount) {
		// Game won ! Disable events and show menu in 1.5 sec
		updateScore(new Date() - startTime);
		removeMouseEvents();
		setTimeout(function(){configNode.removeAttribute("hidden")}, 1500);
	}
}

function revealAround(cell, x, y) {
	for (let xx = Math.max(0, x-1); xx < Math.min(width, x+2); xx++) {
		for (let yy = Math.max(0, y-1); yy < Math.min(height, y+2); yy++) {
			if (xx == x && yy == y)
				continue;

			let cell = getCellAt(xx, yy);
			if (!(cell.hasAttribute("data-flag") || cell.hasAttribute("data-number")))
				reveal(cell, xx, yy);
		}
	}
}

// Flag of unflag a cell
function flag(cell, x, y) {
	// If cell is flagged
	if (cell.hasAttribute("data-flag")) {
		// Unflag
		cell.removeAttribute("data-flag");
		cell.classList.remove("blackFlag");
		cell.onclick = function() { reveal(cell, x, y); };
	} else {
		// Flag
		cell.setAttribute("data-flag", 1);
		cell.classList.add("blackFlag");
		cell.onclick = null;
	}
}

function getCellAt(x, y) {
	return tableNode.childNodes[y].childNodes[x];
}

// Count mines around (x, y)
function countAround(x, y) {
	count = 0;
	for (let xx = Math.max(0, x-1); xx < Math.min(width, x+2); xx++) {
		for (let yy = Math.max(0, y-1); yy < Math.min(height, y+2); yy++) {
			// Skip me
			if (xx == x && yy == y)
				continue;
			if (getCellAt(xx, yy).hasAttribute("data-mine"))
				count++;
		}
	}
	return count;
}

// hide "mineCount" mines in the field
function hideMines() {
	for (let n = 0; n < mineCount; n++) {
		let rnd = parseInt(Math.random() * width * height);
		let node = getCellAt(rnd % width, parseInt(rnd / width));
		if (!node.hasAttribute("data-mine"))
			node.setAttribute("data-mine", 1);
		else
			n -= 1;
	}
}

// record events for left and right click on each cell
function addMouseEvents() {
	tableNode.childNodes.forEach((line, y) => {
		line.childNodes.forEach((cell, x) => {
			cell.onclick = event => {
				reveal(cell, x, y);
			}
			cell.oncontextmenu = event => {
				event.preventDefault();
				event.stopPropagation();
				flag(cell, x, y);
			}
		});
	});
}

// remove both left and right click event
function removeMouseEvents() {
	for (let line of tableNode.childNodes) {
		for (let cell of line.childNodes) {
			cell.onclick = null;
			cell.ondblclick = null;
			cell.oncontextmenu = null;
		}
	}
}

// Create a two dimension table with "width" and "height"
function createField() {
	// Empty the previous table
	while (tableNode.firstChild)
		tableNode.removeChild(tableNode.firstChild);

	// Generate the new one
	for (let y = 0; y < +configNode.height.value; y++) {
		let line = document.createElement("div");
		line.classList.add("line");
		for (let x = 0; x < +configNode.width.value; x++) {
			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.classList.add("unrevealed");
			line.appendChild(cell);
		}
		table.appendChild(line);
	}
}
