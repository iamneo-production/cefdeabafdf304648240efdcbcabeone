document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    const resultContainer = document.querySelector('.result-container');
    const resultText = document.querySelector('.result');
    const resetButton = document.querySelector('#reset-button');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Function to handle a player's move
    function handleMove(index) {
        if (gameActive && board[index] === '') {
            board[index] = currentPlayer;
            buttons[index].value = currentPlayer;
            buttons[index].disabled = true;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            resultText.textContent = `Player ${currentPlayer}'s turn`;
        }
    }

    // Function to check for a winner or a draw
    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                gameActive = false;
                resultText.textContent = `Player ${board[a]} wins!`;
                resetButton.disabled = false;
                return;
            }
        }

        if (!board.includes('')) {
            gameActive = false;
            resultText.textContent = "It's a draw!";
            resetButton.disabled = false;
        }
    }

    // Event listener for button clicks
    buttons.forEach((button, index) => {
        button.addEventListener('click', () => {
            handleMove(index);
        });
    });

    // Event listener for reset button
    resetButton.addEventListener('click', () => {
        board = ['', '', '', '', '', '', '', '', ''];
        buttons.forEach((button) => {
            button.value = '';
            button.disabled = false;
        });
        currentPlayer = 'X';
        resultText.textContent = `Player ${currentPlayer}'s turn`;
        gameActive = true;
        resetButton.disabled = true;
    });
});
