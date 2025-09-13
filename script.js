/*let currentPlayer_html = document.querySelector("#CurrentPlayer"); 
console.log(currentPlayer_html.textContent);
let currentPlayer_js = "x";
let cells = document.querySelectorAll(".cell");

const player_x = []; 
const player_o = [];
cells.forEach(cell => {
    cell.addEventListener("click", () => {
        console.log(cell.getAttribute("data-index"));
        cell.textContent = currentPlayer_js.toUpperCase();
        if(currentPlayer_js == "x"){ 
            player_x.push(cell.getAttribute("data-index")); 
            currentPlayer_js = "o"; 
            currentPlayer_html.textContent = "Player O's Turn"
        }
        else{ 
            player_o.push(cell.getAttribute("data-index"));
            currentPlayer_js = "x"; 
            currentPlayer_html.textContent = "Player X's Turn"
        }
    });
});
// gameBoard.addEventListener("click" , )

// for(let i = 1; i <= 6; i++){ 

// }*/
let board = Array(9).fill('');
let currentPlayer = 'X';
let gameActive = true;
let scores = {
    X: 0,
    O: 0,
    tie: 0
};

const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const currentPlayerDisplay = document.getElementById('CurrentPlayer');
const gameStatus = document.getElementById('GameStatus');
const resetBtn = document.getElementById('resetBtn');
const resetScoreBtn = document.getElementById('resetScoreBtn');
const scoreX = document.getElementById('ScoreX')
const scoreO = document.getElementById('ScoreO')
const scoreTie = document.getElementById('ScoreTie');

// Event handler
function handleCellClick(index) {
    if (!gameActive || board[index] !== '') return;

    board[index] = currentPlayer;
    updateCell(index);

    if (checkWin()) {
        endGame(`Player ${currentPlayer} won the game`)
        scores[currentPlayer]++;
        highlightWinningCells();
    } else if (checkTie()) {
        endGame("It's a tie!");
        scores.tie++;
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        updateDisplay();
    }

    updateScoreDisplay();
}

function updateCell(index) {
    const cell = cells[index];
    cell.textContent = currentPlayer
    cell.classList.add('taken', currentPlayer.toLowerCase());
}

function checkWin() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function checkTie() {
    return board.every(cell => cell !== '');
}

function endGame(message) {
    gameStatus.textContent = message;
    gameActive = false;
}

function updateDisplay() {
    currentPlayerDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function updateScoreDisplay() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreTie.textContent = scores.tie;
}

function resetGame() {
    board = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.className = 'cell'; // Remove any styling
    });
    gameStatus.textContent = '';
    currentPlayer = 'X';
    gameActive = true;
    updateDisplay();
}

function resetScores() {
    scores = { X: 0, O: 0, tie: 0 };
    updateScoreDisplay();
}

// Optional: highlight winning pattern
function highlightWinningCells() {
    winPatterns.forEach(pattern => {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            cells[a].classList.add('win');
            cells[b].classList.add('win');
            cells[c].classList.add('win');
        }
    });
}

// Event listeners
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleCellClick(index));
});

resetBtn.addEventListener('click', resetGame);
resetScoreBtn.addEventListener('click', resetScores);

// Initialize UI
updateDisplay();
updateScoreDisplay();
