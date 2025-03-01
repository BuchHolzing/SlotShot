const gridSize = 3;
const cellSize = 100;
const symbols = [
    '7', 'BAR', 'cherry', 'plum', 'orange', 'apple'
];
let grid = [];
let score = 0;

document.getElementById('spin').addEventListener('click', spin);

document.getElementById('auto').addEventListener('click', () => {
    setInterval(spin, 1000);
});

function generateGrid() {
    grid = Array.from({ length: gridSize }, () => 
        Array.from({ length: gridSize }, () => symbols[Math.floor(Math.random() * symbols.length)]));
}

function drawGrid() {
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            ctx.strokeRect(col * cellSize, row * cellSize, cellSize, cellSize);
            ctx.fillText(grid[row][col], col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
        }
    }
}

function checkMatches() {
    let matchedLines = [];
    let points = 0;
    
    // Check rows
    for (let row = 0; row < gridSize; row++) {
        if (grid[row][0] === grid[row][1] && grid[row][1] === grid[row][2]) {
            matchedLines.push([[row, 0], [row, 1], [row, 2]]);
            points += 10;
        }
    }

    // Check columns
    for (let col = 0; col < gridSize; col++) {
        if (grid[0][col] === grid[1][col] && grid[1][col] === grid[2][col]) {
            matchedLines.push([[0, col], [1, col], [2, col]]);
            points += 10;
        }
    }

    // Check diagonals
    if (grid[0][0] === grid[1][1] && grid[1][1] === grid[2][2]) {
        matchedLines.push([[0, 0], [1, 1], [2, 2]]);
        points += 15;
    }
    if (grid[0][2] === grid[1][1] && grid[1][1] === grid[2][0]) {
        matchedLines.push([[0, 2], [1, 1], [2, 0]]);
        points += 15;
    }

    score += points;
    drawWinningLines(matchedLines);
    updateScore();
}

function drawWinningLines(lines) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    
    lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line[0][1] * cellSize + cellSize / 2, line[0][0] * cellSize + cellSize / 2);
        ctx.lineTo(line[2][1] * cellSize + cellSize / 2, line[2][0] * cellSize + cellSize / 2);
        ctx.stroke();
    });
}

function updateScore() {
    document.getElementById('score').innerText = `Score: ${score}`;
}

function spin() {
    generateGrid();
    drawGrid();
    checkMatches();
}
