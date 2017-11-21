let sudokuGrid;

function getCellAt(block, cell) {
    return sudokuGrid[block * 9 + cell];
}

function setValue(cell, value) {
    cell.dataset.value = value;
    if (cell.firstChild)
        cell.replaceChild(firstChild, SVGNumbers[value-1]);
    else
        cell.appendChild(SVGNumbers[value-1]);
}

function main() {
    sudokuGrid = document.getElementsByClassName("sudoku-cell");
    console.log(sudokuGrid)
    generateGrid()
}

function shuffle(array) {
    for (let idx in array) {
        let rnd = Math.floor(Math.random() * array.length);
        [array[idx], array[rnd]] = [array[rnd], array[idx]];
    }
    return array;
}

function generateGrid() {
    const seed = shuffle(new Array(9).fill(0).map((_, idx) => idx + 1));
    for (let i = 0; i < 9; i++) {
        setValue(getCellAt(0, i), seed[i]);
    }
        
}