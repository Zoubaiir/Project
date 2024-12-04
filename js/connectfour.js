const board = Array(6).fill(null).map(() => Array(7).fill(null));
let currentPlayer = 'player1';

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => {
        const column = index % 7;
        for (let row = 5; row >= 0; row--) {
            if (!board[row][column]) {
                board[row][column] = currentPlayer;
                cell.classList.add(currentPlayer);
                currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
                break;
            }
        }
    });
});
