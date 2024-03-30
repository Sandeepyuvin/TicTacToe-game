document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const restartBtn = document.getElementById('restartBtn');
  const resultDiv = document.getElementById('result');
  const cells = [];

  let currentPlayer = 'X';
  let gameWon = false;

  // Create board cells
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', () => handleCellClick(cell));
    cells.push(cell);
    board.appendChild(cell);
  }

  // Handle cell click event
  function handleCellClick(cell) {
    if (!cell.textContent && !gameWon) {
      cell.textContent = currentPlayer;
      if (checkWin()) {
        displayResult(`Player ${currentPlayer} wins!`);
        gameWon = true;
      } else if (checkDraw()) {
        displayResult('It\'s a draw!');
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  // Check if a player has won
  function checkWin() {
    const winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];
    return winningCombos.some(combo => {
      const [a, b, c] = combo;
      return cells[a].textContent && cells[a].textContent === cells[b].textContent &&
        cells[a].textContent === cells[c].textContent;
    });
  }

  // Check if the game is a draw
  function checkDraw() {
    return cells.every(cell => cell.textContent);
  }

  // Display game result
  function displayResult(message) {
    resultDiv.textContent = message;
    resultDiv.style.display = 'block';
  }

  // Reset the game
  restartBtn.addEventListener('click', () => {
    cells.forEach(cell => {
      cell.textContent = '';
    });
    currentPlayer = 'X';
    gameWon = false;
    resultDiv.style.display = 'none';
  });
});

