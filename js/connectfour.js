/* DEVELOPER Zoubair Belfki, IS117-001, Fall 2024 */
// JavaScript for Connect Four
document.addEventListener("DOMContentLoaded", () => {
    const ROWS = 6;
    const COLS = 7;
    let board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const boardElement = document.getElementById("connect-four-board");
    const statusElement = document.getElementById("connect-four-status");
    const resetButton = document.getElementById("reset-button");
    let currentPlayer = "red";
    let gameOver = false;

    // Create the game board
    function createBoard() {
        boardElement.innerHTML = ""; // Clear the board visually
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement("div");
                cell.className = "connectCell";
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => handleMove(col));
                boardElement.appendChild(cell);
            }
        }
    }

    // Handle player move
    function handleMove(col) {
        if (gameOver) return;

        // Find the lowest available row in the selected column
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`div[data-row='${row}'][data-col='${col}']`);
                cell.classList.add(currentPlayer);

                // Check for a winner or tie
                if (checkWinner(row, col)) {
                    gameOver = true;
                    statusElement.textContent = `Player ${currentPlayer.toUpperCase()} Wins!`;
                } else if (board.flat().every(cell => cell)) {
                    gameOver = true;
                    statusElement.textContent = "It's a Tie!";
                } else {
                    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                    statusElement.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
                }
                return;
            }
        }
    }

    // Check for winner
    function checkWinner(row, col) {
        const directions = [
            { r: 0, c: 1 }, // Horizontal
            { r: 1, c: 0 }, // Vertical
            { r: 1, c: 1 }, // Diagonal (down-right)
            { r: 1, c: -1 } // Diagonal (down-left)
        ];

        for (const { r, c } of directions) {
            let count = 1;
            count += countInDirection(row, col, r, c);
            count += countInDirection(row, col, -r, -c);
            if (count >= 4) return true;
        }
        return false;
    }

    // Count in a given direction
    function countInDirection(row, col, r, c) {
        let count = 0;
        let newRow = row + r;
        let newCol = col + c;

        while (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            board[newRow][newCol] === currentPlayer
        ) {
            count++;
            newRow += r;
            newCol += c;
        }
        return count;
    }

    // Reset the game
    function resetGame() {
        board = Array.from({ length: ROWS }, () => Array(COLS).fill(null)); // Clear the board state
        gameOver = false;
        currentPlayer = "red";
        statusElement.textContent = "Current Player: Red";
        createBoard();
    }

    // Initialize the game
    createBoard();

    // Attach reset button functionality
    resetButton.addEventListener("click", resetGame);
});
