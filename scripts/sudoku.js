let grid;

function getCellAt(blockNo, cellNo) {
    return grid[blockNo * 9 + cellNo];
}

function setCellValue(cell, value) {
    cell.dataset.value = value;
    cell.firstChild.firstChild.nodeValue = value;
}

function main() {
    grid = document.getElementsByClassName("sudoku-cell");
    console.log(grid);
    generateGrid(document.getElementById("sudoku-grid"));
    visualize(generateSudoku());
    console.log(grid);
}

function visualize(sudoku) {
    for (row in sudoku)
        for (col in sudoku[row])
            setCellValue(getCellAt(Math.floor(row / 3) * 3 + Math.floor(col / 3), (row % 3) * 3 + (col % 3)), sudoku[row][col] || "");
}

function generateGrid(container) {
    while (container.firstChild)
        container.removeNode(container.firstChild);
    for (let row = 0; row < 9; row++) {
        const block = document.createElement("div");
        block.classList.add("sudoku-block");
        for (let cell = 0; cell < 9; cell++) {
            const value = document.createElement("p");
            value.appendChild(document.createTextNode(""))
            const cell = document.createElement("cell");
            cell.appendChild(value);
            cell.classList.add("sudoku-cell");
            block.appendChild(cell);
        }
        console.log(grid);
        container.appendChild(block);
    }
}

function generateSudoku() {
    const sudoku = new Array(9).fill(null).map(function() {return new Array(9).fill(null)});
    const permutations = new Array(8).fill(null).map(function() {return new Array(9).fill(null)});

    sudoku[0] = _.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    for (let row = 1; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (permutations[row-1][col] === null) {
                const line = sudoku[row].slice(0, col);
                const collumn = _.zip.apply(null, sudoku)[col].slice(0, row);
                const block = _.flatten(sudoku.slice(row - (row % 3), row).map(function(line) {return line.slice(col - (col % 3), col - (col % 3) + 3)}));
                permutations[row-1][col] = _.chain([1, 2, 3, 4, 5, 6, 7, 8, 9]).difference(_.union(line, collumn, block)).shuffle().value();
            }
            if (permutations[row-1][col].length) {
                sudoku[row][col] = permutations[row-1][col].pop();
            } else {
                sudoku[row][col] = null;
                permutations[row-1][col] = null;
                if (col == 0) {
                    row -= 2;
                    break;
                } else {
                    col -= 2;
                }
            }
        }
    }
    return sudoku;
}
