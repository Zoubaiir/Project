document.addEventListener("DOMContentLoaded", () => {
    const ROWS = 6;
    const COLS = 7;
    const board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    const gameBoard = document.getElementById("game-board");
    const statusElement = document.getElementById("game-status");
    let currentPlayer = "red";
    let gameOver = false;

    // Create game board
    function createBoard() {
        gameBoard.innerHTML = "";
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLS; col++) {
                const cell = document.createElement("div");
                cell.className = "cell";
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.addEventListener("click", () => handleMove(col));
                gameBoard.appendChild(cell);
            }
        }
    }

    // Handle a player's move
    function handleMove(col) {
        if (gameOver) return;

        // Find the lowest available row in the column
        for (let row = ROWS - 1; row >= 0; row--) {
            if (!board[row][col]) {
                board[row][col] = currentPlayer;
                const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
                cell.classList.add("taken", currentPlayer);

                if (checkWin(row, col)) {
                    gameOver = true;
                    statusElement.textContent = `${currentPlayer.toUpperCase()} WINS!`;
                } else if (board.flat().every(cell => cell)) {
                    gameOver = true;
                    statusElement.textContent = "It's a TIE!";
                } else {
                    currentPlayer = currentPlayer === "red" ? "yellow" : "red";
                    statusElement.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
                }
                return;
            }
        }
    }

    // Check for a win condition
    function checkWin(row, col) {
        const directions = [
            { r: 0, c: 1 }, // Horizontal
            { r: 1, c: 0 }, // Vertical
            { r: 1, c: 1 }, // Diagonal (bottom-right)
            { r: 1, c: -1 } // Diagonal (bottom-left)
        ];

        for (const { r, c } of directions) {
            let count = 1;

            // Check in one direction
            count += countInDirection(row, col, r, c);

            // Check in the opposite direction
            count += countInDirection(row, col, -r, -c);

            if (count >= 4) return true;
        }

        return false;
    }

    // Count consecutive pieces in a given direction
    function countInDirection(row, col, rowDir, colDir) {
        let count = 0;
        let newRow = row + rowDir;
        let newCol = col + colDir;

        while (
            newRow >= 0 &&
            newRow < ROWS &&
            newCol >= 0 &&
            newCol < COLS &&
            board[newRow][newCol] === currentPlayer
        ) {
            count++;
            newRow += rowDir;
            newCol += colDir;
        }

        return count;
    }

    // Initialize the game board
    createBoard();
});
