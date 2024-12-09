// tictactoe.js
document.addEventListener("DOMContentLoaded", () => {
    const board = Array(9).fill(null);
    const boardElement = document.getElementById("tic-tac-toe-board");
    const statusElement = document.getElementById("game-status");
    let currentPlayer = "X";
    let gameOver = false;

    // Create the board
    function createBoard() {
        boardElement.innerHTML = "";
        board.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.className = "border border-dark d-flex align-items-center justify-content-center";
            cell.style.width = "100px";
            cell.style.height = "100px";
            cell.style.fontSize = "2rem";
            cell.dataset.index = index;
            cell.addEventListener("click", () => handleCellClick(index));
            boardElement.appendChild(cell);
        });
    }

    // Handle cell click
    function handleCellClick(index) {
        if (gameOver || board[index]) return;
        board[index] = currentPlayer;
        const cell = boardElement.children[index];
        cell.textContent = currentPlayer;

        if (checkWinner()) {
            gameOver = true;
            statusElement.textContent = `Player ${currentPlayer} Wins!`;
        } else if (board.every(cell => cell)) {
            gameOver = true;
            statusElement.textContent = "It's a Tie!";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusElement.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }

    // Check for winner
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }

    // Reset the game
    function resetGame() {
        board.fill(null);
        currentPlayer = "X";
        gameOver = false;
        statusElement.textContent = "Player X's Turn";
        createBoard();
    }

    // Initialize the game
    createBoard();
});
