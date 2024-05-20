const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s Turn`;
    statusText.classList.add('x-player');
    running = true;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");
    if (options[cellIndex] != "" || !running) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? 'x-player' : 'o-player');
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s Turn`;
    statusText.classList.toggle('x-player');
    statusText.classList.toggle('o-player');
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            markWinningCells(condition);
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        markWinningCells(winningCondition);
        running = false;
    } else if (!options.includes("")) {
        statusText.textContent = "It's A Draw stand down!";
        running = false;
    } else {
        changePlayer();
    }
}
function markWinningCells(condition) {
    condition.forEach(index => {
        cells[index].classList.add('strikeout');
    });
}

function removeStrikeoutLines() {
    document.querySelectorAll('.strikeout').forEach(element => {
        element.classList.remove('strikeout');
    });
}


function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s Turn`;
    statusText.classList.remove('o-player');
    statusText.classList.add('x-player');
    removeStrikeoutLines();
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('x-player', 'o-player');
    });
    running = true;
}
