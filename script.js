document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = Array(9).fill(null);
    let currentPlayer = 'X';
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true });
    });

    function handleClick(e) {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (!board[index]) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            if (checkWin(currentPlayer)) {
                setTimeout(() => alert(`${currentPlayer} wins!`), 100);
                setTimeout(resetGame, 3000);
            } else if (board.every(cell => cell)) {
                setTimeout(() => alert('Draw!'), 100);
                setTimeout(resetGame, 3000);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function checkWin(player) {
        return winPatterns.some(pattern => {
            return pattern.every(index => {
                return board[index] === player;
            });
        });
    }
    function resetGame() {
        board.fill(null);
        currentPlayer = 'X';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.removeEventListener('click', handleClick);
            cell.addEventListener('click', handleClick, { once: true });
        });
    }
});
