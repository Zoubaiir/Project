// tictactoe.js
document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("tic-tac-toe-board");
    const statusElement = document.getElementById("game-status");
    const resetButton = document.getElementById("reset-button");

    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameOver = false;

    // Create the board
    function createBoard() {
        boardElement.innerHTML = ""; // Clear the board
        board.forEach((_, index) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");
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
        cell.classList.add("taken");

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
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === currentPlayer)
        );
    }

    // Reset the game
    function resetGame() {
        board = Array(9).fill(null);
        currentPlayer = "X";
        gameOver = false;
        statusElement.textContent = "Player X's Turn";
        createBoard();
    }

    // Initialize the game
    createBoard();

    // Attach event to reset button
    resetButton.addEventListener("click", resetGame);
});
