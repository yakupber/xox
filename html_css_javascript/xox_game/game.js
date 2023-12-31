document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const playerTurn = document.getElementById('player-turn');
    const winnerDisplay = document.getElementById('winner');
    const restartBtn = document.getElementById('restart-btn');
    const scoreboard = document.getElementById('scoreboard');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;
    let scores = { 'Oyuncu X': 0, 'Oyuncu O': 0 };

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        if (!gameBoard.includes('')) {
            return 'tie';
        }

        return null;
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') {
            return;
        }

        gameBoard[index] = currentPlayer;
        renderBoard();

        const winner = checkWinner();
        if (winner) {
            endGame(winner);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            playerTurn.textContent = `Oyuncu ${currentPlayer === 'X' ? '1' : '2'}`;
        }
    };

    const endGame = (result) => {
        gameActive = false;
        if (result === 'tie') {
            winnerDisplay.textContent = 'Berabere!';
            winnerDisplay.style.color = 'orange';
        } else {
            winnerDisplay.textContent = `Oyuncu ${result} kazandı!`;
            winnerDisplay.style.color = 'green';
            scores[`Oyuncu ${result}`]++;
            updateScoreboard();
        }
    };

    const restartGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';
        winnerDisplay.textContent = '';
        playerTurn.textContent = 'Oyuncu X';
        winnerDisplay.style.color = '';
        renderBoard();
    };

    const updateScoreboard = () => {
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        const headerRow = document.createElement('tr');
        const header1 = document.createElement('th');
        header1.textContent = 'Oyuncu';
        const header2 = document.createElement('th');
        header2.textContent = 'Skor';
        headerRow.appendChild(header1);
        headerRow.appendChild(header2);
        thead.appendChild(headerRow);

        for (const player in scores) {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            cell1.textContent = player;
            const cell2 = document.createElement('td');
            cell2.textContent = scores[player];
            row.appendChild(cell1);
            row.appendChild(cell2);
            tbody.appendChild(row);
        }

        table.appendChild(thead);
        table.appendChild(tbody);

        scoreboard.innerHTML = '';
        scoreboard.appendChild(table);
    };

    restartBtn.addEventListener('click', restartGame);

    const renderBoard = () => {
        board.innerHTML = '';
        gameBoard.forEach((value, index) => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = value;
            cell.addEventListener('click', () => handleCellClick(index));
            board.appendChild(cell);
        });
    };

    renderBoard();
    updateScoreboard();
});
